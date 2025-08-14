import { Client } from 'ssh2';
import multer from 'multer';
const upload = multer(); // for multipart/form-data uploads

// -------------------------
// Helper: Connect over SSH
// -------------------------
function connectSSH(credentials) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on('ready', () => resolve(conn))
      .on('error', reject)
      .connect({
        host: credentials.ip,
        port: credentials.port || 22,
        username: credentials.username,
        password: credentials.method === 'password' ? credentials.password : undefined,
        privateKey: credentials.method === 'key' ? credentials.privateKey : undefined,
        passphrase: credentials.passphrase || undefined,
      });
  });
}

// -------------------------
// Helper: Get updated file list
// -------------------------
function getFileList(conn, path) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) return reject(err);
      sftp.readdir(path, (err, list) => {
        if (err) return reject(err);

        // Regular file entries:
        const files = list.map(item => ({
          name: item.filename,
          type: item.longname.startsWith('d') ? 'folder' : 'file',
          size: item.attrs.size,
          modifyTime: item.attrs.mtime,
          isHidden: item.filename.startsWith('.'),
        }));

        // Manually add "." and ".." at the start if desired
        if (path !== "/") {
          files.unshift(
            { name: '..', type: 'folder', size: 0, modifyTime: 0, isHidden: false },
            { name: '.', type: 'folder', size: 0, modifyTime: 0, isHidden: false }
          );
        }

        resolve(files);
      });
    });
  });
}


// 📂 List files
export const listFiles = async (req, res) => {
  const { credentials, path = '/' } = req.body;
  try {
    const conn = await connectSSH(credentials);
    const files = await getFileList(conn, path);
    conn.end();
    res.json({ files, currentPath: path });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
};

// 📄 Read file
export const readFile = async (req, res) => {
  const { credentials, path } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.sftp((err, sftp) => {
      if (err) throw err;
      sftp.readFile(path, 'utf8', (err, data) => {
        conn.end();
        if (err) return res.status(500).json({ message: 'Failed to read file', error: err.message });
        res.json({ content: data });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to read file', error: err.message });
  }
};

// 💾 Save file
export const saveFile = async (req, res) => {
  const { credentials, path, content } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.sftp((err, sftp) => {
      if (err) throw err;
      const writeStream = sftp.createWriteStream(path, { flags: 'w' });
      writeStream.on('close', () => {
        conn.end();
        res.json({ message: 'File saved successfully' });
      });
      writeStream.on('error', (err) => {
        conn.end();
        res.status(500).json({ message: 'Failed to save file', error: err.message });
      });
      writeStream.end(content);
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save file', error: err.message });
  }
};

// ✏️ Rename path
export const renamePath = async (req, res) => {
  const { credentials, oldPath, newPath } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.sftp(async (err, sftp) => {
      if (err) throw err;
      sftp.rename(oldPath, newPath, async (err) => {
        if (err) {
          conn.end();
          return res.status(500).json({ message: 'Rename failed', error: err.message });
        }
        const parentDir = oldPath.substring(0, oldPath.lastIndexOf('/')) || '/';
        const files = await getFileList(conn, parentDir);
        conn.end();
        res.json({ message: 'Renamed successfully', files });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Rename failed', error: err.message });
  }
};

// ➕ Create
export const createFileOrFolder = async (req, res) => {
  const { credentials, path, name, type } = req.body;
  try {
    const conn = await connectSSH(credentials);
    const command = type === 'folder'
      ? `mkdir -p "${path}/${name}"`
      : `touch "${path}/${name}"`;
    conn.exec(command, async (err, stream) => {
      if (err) {
        conn.end();
        return res.status(500).json({ error: 'Creation failed' });
      }
      stream.on('close', async () => {
        const files = await getFileList(conn, path);
        conn.end();
        res.json({ message: `${type} created successfully`, files });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};

// ❌ Delete
export const deletePath = async (req, res) => {
  const { credentials, path } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.exec(`rm -rf "${path}"`, async (err, stream) => {
      if (err) {
        conn.end();
        return res.status(500).json({ error: 'Deletion failed' });
      }
      stream.on('close', async () => {
        const parentDir = path.substring(0, path.lastIndexOf('/')) || '/';
        const files = await getFileList(conn, parentDir);
        conn.end();
        res.json({ message: 'Deleted successfully', files });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};

// 📤 Upload file
export const uploadFile = [
  upload.single('file'),
  async (req, res) => {
    const { path, credentials } = req.body;
    const fileBuffer = req.file?.buffer;
    const fileName = req.file?.originalname;
    if (!fileBuffer || !fileName) {
      return res.status(400).json({ error: 'No file provided' });
    }
    try {
      const creds = JSON.parse(credentials);
      const conn = await connectSSH(creds);
      conn.sftp(async (err, sftp) => {
        if (err) throw err;
        const remotePath = `${path}/${fileName}`;
        const writeStream = sftp.createWriteStream(remotePath);
        writeStream.write(fileBuffer);
        writeStream.end();
        writeStream.on('close', async () => {
          const files = await getFileList(conn, path);
          conn.end();
          res.json({ message: 'Upload successful', files });
        });
        writeStream.on('error', (err) => {
          conn.end();
          res.status(500).json({ error: 'Failed to upload', detail: err.message });
        });
      });
    } catch (err) {
      res.status(500).json({ error: 'SSH connection failed', detail: err.message });
    }
  }
];


export const downloadFile = async (req, res) => {
  const { credentials, path } = req.body;

  try {
    const conn = new Client();
    conn
      .on('ready', () => {
        conn.sftp((err, sftp) => {
          if (err) {
            conn.end();
            return res.status(500).json({ error: 'SFTP error', detail: err.message });
          }
          sftp.stat(path, (err, stats) => {
            if (err) {
              conn.end();
              return res.status(404).json({ error: 'File not found' });
            }
            res.setHeader('Content-Length', stats.size);
            res.setHeader('Content-Type', 'application/octet-stream');
            const fileName = path.split('/').pop();
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

            const readStream = sftp.createReadStream(path);
            readStream.pipe(res);

            readStream.on('close', () => {
              conn.end();
            });

            readStream.on('error', (err) => {
              conn.end();
              res.end();
            });
          });
        });
      })
      .on('error', (err) => {
        res.status(500).json({ error: 'SSH connection error', detail: err.message });
      })
      .connect({
        host: credentials.ip,
        port: credentials.port || 22,
        username: credentials.username,
        password: credentials.method === 'password' ? credentials.password : undefined,
        privateKey: credentials.method === 'key' ? credentials.privateKey : undefined,
        passphrase: credentials.passphrase || undefined,
      });
  } catch (err) {
    res.status(500).json({ error: 'Failed to download file', detail: err.message });
  }
};


export const compressFiles = async (req, res) => {
  const { credentials, currentPath, items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided for compression' });
  }

  const archiveName = `archive_${Date.now()}.zip`;
  const archivePath = `${currentPath}/${archiveName}`;
  const itemsToCompress = items.map(name => `"${name}"`).join(' ');

  try {
    const conn = new Client();

    conn.on('ready', () => {
      // Run compression command on remote server
      const cmd = `cd "${currentPath}" && zip -r ${archiveName} ${itemsToCompress}`;

      conn.exec(cmd, (err, stream) => {
        if (err) {
          conn.end();
          return res.status(500).json({ error: 'Failed to start compression', detail: err.message });
        }

        stream.on('close', async (code, signal) => {
          if (code !== 0) {
            conn.end();
            return res.status(500).json({ error: `Compression process failed with code ${code}` });
          }

          // After compression, fetch updated file listing
          conn.sftp((err, sftp) => {
            if (err) {
              conn.end();
              return res.status(500).json({ error: 'SFTP error', detail: err.message });
            }
            sftp.readdir(currentPath, (err, list) => {
              conn.end();
              if (err) {
                return res.status(500).json({ error: 'Failed to list directory', detail: err.message });
              }

              const files = list.map(item => ({
                name: item.filename,
                type: item.longname.startsWith('d') ? 'folder' : 'file',
                size: item.attrs.size,
                modifyTime: item.attrs.mtime,
              }));

              res.json({
                message: 'Compression completed successfully',
                archive: {
                  name: archiveName,
                  path: archivePath,
                },
                files,
              });
            });
          });
        });

        stream.stderr.on('data', (data) => {
          // Can log compression errors from stderr if needed
        });
      });
    });

    conn.on('error', (err) => {
      res.status(500).json({ error: 'SSH connection error', detail: err.message });
    });

    conn.connect({
      host: credentials.ip,
      port: credentials.port || 22,
      username: credentials.username,
      password: credentials.method === 'password' ? credentials.password : undefined,
      privateKey: credentials.method === 'key' ? credentials.privateKey : undefined,
      passphrase: credentials.passphrase || undefined,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err.message });
  }
};

/**
 * Move files/folders to a destination
 */
export const moveFiles = async (req, res) => {
  const { credentials, items, destination } = req.body;
  if (!items?.length || !destination) {
    return res.status(400).json({ error: 'Missing items or destination' });
  }

  const conn = new Client();
  conn.on('ready', () => {
    const paths = items.map(p => `"${p}"`).join(' ');
    const cmd = `mkdir -p "${destination}" && mv ${paths} "${destination}"`;
    conn.exec(cmd, (err, stream) => {
      if (err) {
        conn.end();
        return res.status(500).json({ error: 'Move failed', detail: err.message });
      }
      stream.stderr.on('data', data => {
        console.error('SSH mv error:', data.toString());
      });
      stream.on('close', (code) => {
        conn.end();
        if (code !== 0) {
          return res.status(500).json({ error: 'Move command failed', exitCode: code });
        }
        res.json({ message: 'Move successful' });
      });
    });
  }).connect({
    host: credentials.ip,
    port: credentials.port || 22,
    username: credentials.username,
    password: credentials.method === 'password' ? credentials.password : undefined,
    privateKey: credentials.method === 'key' ? credentials.privateKey : undefined,
    passphrase: credentials.passphrase || undefined,
  });
};
/**
 * copy files/folders to a destination
 */
export const copyFiles = async (req, res) => {
  const { credentials, items, destination } = req.body;
  if (!items?.length || !destination) {
    return res.status(400).json({ error: 'Missing items or destination' });
  }

  const conn = new Client();
  conn.on('ready', () => {
    const paths = items.map(p => `"${p}"`).join(' ');
    const cmd = `mkdir -p "${destination}" && cp -r ${paths} "${destination}"`;
    conn.exec(cmd, (err, stream) => {
      if (err) {
        conn.end();
        return res.status(500).json({ error: 'Copy failed', detail: err.message });
      }
      stream.stderr.on('data', data => {
        console.error('SSH cp error:', data.toString());
      });
      stream.on('close', (code) => {
        conn.end();
        if (code !== 0) {
          return res.status(500).json({ error: 'Copy command failed', exitCode: code });
        }
        res.json({ message: 'Copy successful' });
      });
    });
  }).connect({
    host: credentials.ip,
    port: credentials.port || 22,
    username: credentials.username,
    password: credentials.method === 'password' ? credentials.password : undefined,
    privateKey: credentials.method === 'key' ? credentials.privateKey : undefined,
    passphrase: credentials.passphrase || undefined,
  });
};


