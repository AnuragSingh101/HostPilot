// socketserver.js
import { WebSocketServer } from 'ws';
import { Client } from 'ssh2';

const wss = new WebSocketServer({ port: 5001 });

wss.on('connection', (ws) => {
  const conn = new Client();
  let shellStream;

  ws.once('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (err) {
      return ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
    }

    if (data.type === 'connect') {
      conn
        .on('ready', () => {
          conn.shell((err, stream) => {
            if (err) {
              return ws.send(JSON.stringify({ type: 'error', message: err.message }));
            }

            shellStream = stream;

            stream
              .on('data', (chunk) => {
                ws.send(JSON.stringify({ type: 'output', data: chunk.toString() }));
              })
              .on('close', () => {
                conn.end();
                ws.send(JSON.stringify({ type: 'output', data: '\n🔚 SSH session ended.\n' }));
              });

            // ✅ Now listen for input from frontend AFTER stream is ready
            ws.on('message', (msg) => {
              try {
                const parsed = JSON.parse(msg);
                if (parsed.type === 'input') {
                  shellStream.write(parsed.data);
                }
              } catch (e) {
                // ignore bad JSON
              }
            });

            // Notify frontend that shell is ready
            ws.send(JSON.stringify({ type: 'ready' }));
          });
        })
        .on('error', (err) => {
          ws.send(JSON.stringify({ type: 'error', message: err.message }));
        })
        .connect({
          host: data.host,
          port: data.port || 22,
          username: data.username,
          password: data.password,
          privateKey: data.privateKey,
          passphrase: data.passphrase,
        });
    }
  });

  ws.on('close', () => {
    conn.end();
  });
});

console.log("🧠 WebSocket SSH server running on ws://localhost:5001");
