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
        const files = list.map(item => ({
          name: item.filename,
          type: item.longname.startsWith('d') ? 'folder' : 'file',
          size: item.attrs.size,
          modifyTime: item.attrs.mtime,
        }));
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
