import { Client } from 'ssh2';
import { v4 as uuidv4 } from 'uuid';
import SshSession from '../models/sshSessionModel.js'; // Make sure this file also uses ES module export

export const createSSHSession = async (req, res) => {
  const {
    server: { ip, port = 22, hostname, type },
    auth: { method, username, password, privateKey, passphrase },
    options,
    timeout = 600,
  } = req.body;

  const session_id = uuidv4();
  const createdBy = req.user?.id || 'unknown';

  const conn = new Client();

  conn
    .on('ready', async () => {
      try {
        await SshSession.create({
          session_id,
          server: { ip, port, hostname, type },
          auth: { method, username, password, privateKey, passphrase },
          options,
          timeout,
          createdBy,
        });

        res.status(200).json({ message: 'SSH session established', session_id });
        conn.end();
      } catch (err) {
        res.status(500).json({ message: 'Failed to save session', error: err.message });
      }
    })
    .on('error', (err) => {
      res.status(500).json({ message: 'SSH connection failed', error: err.message });
    })
    .connect({
      host: ip,
      port,
      username,
      password: method === 'password' ? password : undefined,
      privateKey: method === 'key' ? privateKey : undefined,
      passphrase,
      readyTimeout: timeout * 1000,
    });
};
// sshController.js