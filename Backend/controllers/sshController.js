import { Client } from 'ssh2';
import { v4 as uuidv4 } from 'uuid';
import SshSession from '../models/sshSessionModel.js';

// ✅ Function to create SSH connection (reusable)
export const connectSSH = (credentials) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn
      .on('ready', () => {
        console.log('✅ SSH Connection Ready');
        resolve(conn); // return valid SSH client
      })
      .on('error', (err) => {
        reject(err);
      })
      .connect({
        host: credentials.ip,
        port: credentials.port || 22,
        username: credentials.username,
        password: credentials.method === 'password' ? credentials.password : undefined,
        privateKey: credentials.method === 'key' ? credentials.privateKey : undefined,
        passphrase: credentials.passphrase || undefined,
        readyTimeout: credentials.timeout ? credentials.timeout * 1000 : 600000,
      });
  });
};

export const createSSHSession = async (req, res) => {
  const {
    server: { ip, port = 22, hostname, type },
    auth: { method, username, password, privateKey, passphrase },
    options,
    timeout = 600,
  } = req.body;

  const session_id = uuidv4();
  const createdBy = req.user?.id || 'unknown';

  try {
    const conn = await connectSSH({
      ip,
      port,
      method,
      username,
      password,
      privateKey,
      passphrase,
      timeout,
    });

    // ✅ Store session details in DB
    await SshSession.create({
      session_id,
      server: { ip, port, hostname, type },
      auth: { method, username, password, privateKey, passphrase },
      options,
      timeout,
      createdBy,
    });

    res.status(200).json({ message: 'SSH session established', session_id });

    // Close immediately if just testing connection
    conn.end();

  } catch (err) {
    res.status(500).json({ message: 'SSH connection failed', error: err.message });
  }
};
// controllers/sshController.js
// This file handles SSH session creation and management. 