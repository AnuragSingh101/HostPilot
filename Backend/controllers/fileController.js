import { connectSSH } from './sshController.js';

/**
 * List files in a given path on remote server via SSH
 */
export const listFiles = async (req, res) => {
  const { credentials, path } = req.body;

  if (!credentials || !path) {
    return res.status(400).json({ error: 'Missing SSH credentials or path' });
  }

  try {
    const conn = await connectSSH(credentials);

    // quotes ke saath taaki special chars/space ka issue na ho
    conn.exec(`ls -la "${path}"`, (err, stream) => {
      if (err) throw err;

      let output = '';
      stream
        .on('data', (data) => { output += data.toString(); })
        .on('close', () => {
          const files = output
            .split('\n')
            .slice(1)
            .filter(Boolean)
            .map(line => {
              const parts = line.trim().split(/\s+/);
              const name = parts.slice(8).join(' ');
              const type = line.startsWith('d') ? 'folder' : 'file';
              return { name, type };
            });

          conn.end();
          res.json({ files });
        });
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
};




/**
 * Create file or folder
 */
export const createFileOrFolder = async (req, res) => {
  const { credentials, path, name, type } = req.body;

  if (!credentials || !credentials.ip || !credentials.username) {
    return res.status(400).json({ error: 'Missing SSH credentials' });
  }

  try {
    const conn = await connectSSH(credentials);
    const command = type === 'folder' ? `mkdir -p "${path}/${name}"` : `touch "${path}/${name}"`;

    conn.exec(command, (err) => {
      conn.end();
      if (err) return res.status(500).json({ error: 'Creation failed', detail: err.message });
      res.json({ message: `${type} created successfully` });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};

/**
 * Delete file or folder
 */
export const deletePath = async (req, res) => {
  const { credentials, path } = req.body;

  if (!credentials || !credentials.ip || !credentials.username) {
    return res.status(400).json({ error: 'Missing SSH credentials' });
  }

  try {
    const conn = await connectSSH(credentials);
    conn.exec(`rm -rf "${path}"`, (err) => {
      conn.end();
      if (err) return res.status(500).json({ error: 'Deletion failed', detail: err.message });
      res.json({ message: 'Deleted successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};

/**
 * Rename file or folder
 */
export const renamePath = async (req, res) => {
  const { credentials, oldPath, newPath } = req.body;

  if (!credentials || !credentials.ip || !credentials.username) {
    return res.status(400).json({ error: 'Missing SSH credentials' });
  }

  try { 
    const conn = await connectSSH(credentials);
    conn.exec(`mv "${oldPath}" "${newPath}"`, (err) => {
      conn.end();
      if (err) return res.status(500).json({ error: 'Rename failed', detail: err.message });
      res.json({ message: 'Renamed successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: 'SSH connection failed', detail: err.message });
  }
};
