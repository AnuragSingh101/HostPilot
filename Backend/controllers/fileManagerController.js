// controllers/fileManagerController.js
import { Client } from 'ssh2';

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

// 📂 List files in a given directory
// export const listFiles = async (req, res) => {
//   const { credentials, path = '/' } = req.body;

//   try {
//     const conn = await connectSSH(credentials);

//     conn.exec(`ls -la "${path}"`, (err, stream) => {
//       if (err) throw err;

//       let output = '';
//       stream.on('data', (data) => {
//         output += data.toString();
//       }).on('close', () => {
//         conn.end();

//         const files = output
//           .split('\n')
//           .slice(1)
//           .filter(line => line.trim())
//           .map(line => {
//             const parts = line.split(/\s+/);
//             const name = parts.slice(8).join(' ');
//             const type = line.startsWith('d') ? 'folder' : 'file';
//             return { name, type };
//           });

//         res.json({ files, currentPath: path });
//       });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to list files', error: err.message });
//   }
// };

export const listFiles = async (req, res) => {
  const { credentials, path = '/' } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.sftp((err, sftp) => {
      if (err) throw err;

      sftp.readdir(path, (err, list) => {
        conn.end();
        if (err) return res.status(500).json({ message: 'Failed to list files', error: err.message });

        const files = list.map(item => ({
          name: item.filename,
          type: item.longname.startsWith('d') ? 'folder' : 'file',
          size: item.attrs.size,
          modifyTime: item.attrs.mtime,
        }));

        res.json({ files, currentPath: path });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
};


// Read file contents for editing
// export const readFile = async (req, res) => {
//   const { credentials, path } = req.body;
//   try {
//     const conn = await connectSSH(credentials);
//     conn.sftp((err, sftp) => {
//       if (err) throw err;

//       sftp.readFile(path, 'utf8', (err, data) => {
//         conn.end();
//         if (err) return res.status(500).json({ message: 'Failed to read file', error: err.message });

//         res.json({ content: data });
//       });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to read file', error: err.message });
//   }
// };
export const readFile = async (req, res) => {
  const { credentials, path } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.sftp((err, sftp) => {
      if (err) throw err;
      sftp.readFile(path, 'utf8', (err, data) => {
        conn.end();
        if (err) return res.status(500).json({ message: 'Failed to read file', error: err.message });
        res.json({ content: data });  // This content should have the full current file data
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to read file', error: err.message });
  }
};
// 📄 Read file contents

// Save (write) edited file content back to remote server
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
// ✏️ Rename file or folder


export const renamePath = async (req, res) => {
  const { credentials, oldPath, newPath } = req.body;
  try {
    const conn = await connectSSH(credentials);
    conn.sftp((err, sftp) => {
      if (err) throw err;

      sftp.rename(oldPath, newPath, (err) => {
        conn.end();
        if (err) return res.status(500).json({ message: 'Rename failed', error: err.message });

        res.json({ message: 'Renamed successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Rename failed', error: err.message });
  }
};




// 📄 Create file or folder
export const createFileOrFolder = async (req, res) => {
  const { credentials, path, name, type } = req.body;

  try {
    const conn = await connectSSH(credentials);
    const command = type === 'folder'
      ? `mkdir -p "${path}/${name}"`
      : `touch "${path}/${name}"`;

    conn.exec(command, (err, stream) => {
      if (err) return res.status(500).json({ error: 'Creation failed' });

      stream.on('close', () => {
        conn.end();
        res.json({ message: `${type} created successfully` });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};

// ❌ Delete file/folder
export const deletePath = async (req, res) => {
  const { credentials, path } = req.body;

  try {
    const conn = await connectSSH(credentials);
    conn.exec(`rm -rf "${path}"`, (err, stream) => {
      if (err) return res.status(500).json({ error: 'Deletion failed' });

      stream.on('close', () => {
        conn.end();
        res.json({ message: 'Deleted successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};

