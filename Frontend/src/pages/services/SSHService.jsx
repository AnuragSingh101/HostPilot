import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const SSHService = () => {
  const terminalRef = useRef(null);
  const xterm = useRef(null);
  const fitAddon = useRef(null);
  const socket = useRef(null);
  const [connected, setConnected] = useState(false);

  const [formData, setFormData] = useState({
    ip: '',
    port: 22,
    hostname: '',
    type: 'linux',
    method: 'password',
    username: '',
    password: '',
    privateKey: '',
    passphrase: '',
    cols: 80,
    rows: 24,
    timeout: 600
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const connectToSSH = () => {
    // Validate IP
    const ip = formData.ip.trim();
    if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
      xterm.current.writeln('❌ Invalid IP address format');
      return;
    }

    if (!xterm.current || !fitAddon.current) return;
    xterm.current.clear();

    socket.current = new WebSocket("ws://localhost:5001");

    socket.current.onopen = () => {
      socket.current.send(
        JSON.stringify({
          type: 'connect',
          host: ip,
          port: Number(formData.port),
          username: formData.username,
          password: formData.method === 'password' ? formData.password : undefined,
          privateKey: formData.method === 'key' ? formData.privateKey : undefined,
          passphrase: formData.passphrase
        })
      );
    };

    socket.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.type === 'ready') {
        setConnected(true);
        xterm.current.writeln('✅ SSH Connection Established\n');

        // ✅ Input handler now added after terminal is ready
        xterm.current.onData((input) => {
          if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({ type: 'input', data: input }));
          }
        });
      } else if (data.type === 'output') {
        xterm.current.write(data.data);
      } else if (data.type === 'error') {
        xterm.current.writeln(`❌ Error: ${data.message}`);
      }
    };

    socket.current.onerror = (err) => {
      xterm.current.writeln(`❌ WebSocket Error: ${err.message}`);
    };

    socket.current.onclose = () => {
      xterm.current.writeln('\n🔌 WebSocket connection closed');
      setConnected(false);
    };
  };

  useEffect(() => {
    xterm.current = new Terminal({
      fontSize: 14,
      cursorBlink: true,
      theme: {
        background: '#000000',
        foreground: '#00FF00'
      }
    });

    fitAddon.current = new FitAddon();
    xterm.current.loadAddon(fitAddon.current);
    xterm.current.open(terminalRef.current);

    // ✅ Delay fit() to prevent dimension error
    setTimeout(() => {
      try {
        if (
          terminalRef.current?.offsetHeight > 0 &&
          terminalRef.current?.offsetWidth > 0
        ) {
          fitAddon.current.fit();
        }
      } catch (e) {
        console.warn('🛠 Terminal fit failed:', e.message);
      }
    }, 100);

    const handleResize = () => {
      try {
        if (
          terminalRef.current?.offsetHeight > 0 &&
          terminalRef.current?.offsetWidth > 0
        ) {
          fitAddon.current?.fit();
        }
      } catch (e) {
        console.warn('🛠 Resize fit failed:', e.message);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      xterm.current?.dispose();
      socket.current?.close();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="p-6">
      {!connected && (
        <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow mb-6">
          <input name="ip" placeholder="IP Address" className="input" onChange={handleInputChange} />
          <input name="port" placeholder="Port" type="number" value={formData.port} className="input" onChange={handleInputChange} />
          <input name="hostname" placeholder="Hostname (optional)" className="input" onChange={handleInputChange} />
          <select name="type" onChange={handleInputChange} className="input">
            <option value="linux">Linux</option>
            <option value="windows">Windows</option>
          </select>
          <select name="method" onChange={handleInputChange} className="input">
            <option value="password">Password</option>
            <option value="key">SSH Key</option>
          </select>
          <input name="username" placeholder="Username" className="input" onChange={handleInputChange} />
          {formData.method === 'password' && (
            <input name="password" placeholder="Password" className="input" type="password" onChange={handleInputChange} />
          )}
          {formData.method === 'key' && (
            <>
              <textarea name="privateKey" placeholder="Private Key" className="input" onChange={handleInputChange} />
              <input name="passphrase" placeholder="Passphrase" className="input" onChange={handleInputChange} />
            </>
          )}
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 col-span-2"
            onClick={connectToSSH}
          >
            Connect
          </button>
        </div>
      )}

      <div ref={terminalRef} className="h-[600px] w-full bg-black rounded-xl shadow overflow-hidden" />
    </div>
  );
};

export default SSHService;
