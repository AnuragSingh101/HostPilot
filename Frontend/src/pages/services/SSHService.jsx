// SSHService.jsx
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
  const [showForm, setShowForm] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

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

  const facts = [
    {
      title: 'What is SSH?',
      desc:
        'SSH (Secure Shell) is a cryptographic network protocol used for secure access to remote systems over an unsecured network.'
    },
    {
      title: 'Why is SSH Secure?',
      desc:
        'SSH uses encryption and key-based authentication to protect data from eavesdropping or tampering.'
    },
    {
      title: 'Common SSH Use Cases',
      desc: 'Remote server access, secure file transfers (SCP/SFTP), Git operations, and DevOps automation.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const connectToSSH = () => {
    const ip = formData.ip.trim();
    if (!/^[0-9]{1,3}(\.[0-9]{1,3}){3}$/.test(ip)) {
      alert("❌ Invalid IP address format");
      return;
    }

    if (socket.current) {
      socket.current.close();
    }

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
        setShowTerminal(true);
        xterm.current?.writeln('✅ SSH Connection Established\n');
        xterm.current?.onData((input) => {
          if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({ type: 'input', data: input }));
          }
        });
      } else if (data.type === 'output') {
        xterm.current?.write(data.data);
      } else if (data.type === 'error') {
        xterm.current?.writeln(`❌ Error: ${data.message}`);
      }
    };

    socket.current.onerror = (err) => {
      xterm.current?.writeln(`❌ WebSocket Error: ${err.message}`);
    };

    socket.current.onclose = () => {
      xterm.current?.writeln('\n🔌 WebSocket connection closed');
      setConnected(false);
      setShowTerminal(false);
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

    const handleResize = () => {
      try {
        fitAddon.current?.fit();
      } catch (err) {
        console.warn('Resize fit failed:', err.message);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      xterm.current?.dispose();
      socket.current?.close();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (showTerminal && terminalRef.current) {
      xterm.current?.open(terminalRef.current);
      setTimeout(() => {
        try {
          fitAddon.current?.fit();
        } catch (err) {
          console.warn('Fit failed:', err.message);
        }
      }, 100);
    }
  }, [showTerminal]);

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-900">
      {/* Home Dashboard */}
      {!showForm && !connected && (
        <section className="space-y-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-purple-700">💻 Shell Access</h1>
              <p className="mt-1 text-lg text-gray-600">Interact with your server using a secure shell.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              ⚡ Connect your SSH
            </button>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '1.2M+', label: 'SSH Sessions Daily', color: 'text-purple-600' },
              { value: '99.9%', label: 'Uptime Secured by SSH', color: 'text-green-600' },
              { value: '10K+', label: 'Engineers Using SSH', color: 'text-blue-600' },
              { value: '24/7', label: 'Global Access', color: 'text-yellow-600' }
            ].map(({ value, label, color }, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center"
              >
                <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
                <p className="text-gray-500 mt-1 text-center">{label}</p>
              </div>
            ))}
          </div>

          {/* Info Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white shadow-md rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">📋 How to Use</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>Click on “Connect your SSH”.</li>
                <li>Fill in IP, username, and password or key.</li>
                <li>Click “Connect” to establish the session.</li>
                <li>Start typing commands in the terminal.</li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">🌐 SSH Quick Facts</h2>
              {facts.map((fact, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-sm font-semibold text-purple-700 mb-1">{fact.title}</h3>
                  <p className="text-xs text-gray-600">{fact.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 border-l-6 border-purple-500 bg-purple-50 rounded-xl shadow-sm">
              <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">🔧 Quick Tip:</h4>
              <p className="text-gray-700 text-sm">
                Use <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">Ctrl + C</code> to stop a running command.
              </p>
            </div>

            <div className="p-6 border-l-6 border-yellow-500 bg-yellow-50 rounded-xl shadow-sm">
              <h4 className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">⚠️ Security Tip:</h4>
              <p className="text-gray-700 text-sm">
                Never share your private key or password. Always use SSH keys for production access.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Form to Connect */}
      {!connected && showForm && (
        <section className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <form
            className="lg:col-span-2 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              connectToSSH();
            }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔐 Connect to SSH</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'IP Address', name: 'ip', placeholder: 'e.g. 192.168.1.100', type: 'text' },
                { label: 'Port', name: 'port', placeholder: '', type: 'number', value: formData.port },
                { label: 'Hostname (optional)', name: 'hostname', placeholder: 'Server name', type: 'text' },
                { label: 'System Type', name: 'type', as: 'select', options: ['linux', 'windows'] },
                { label: 'Auth Method', name: 'method', as: 'select', options: ['password', 'key'] },
                { label: 'Username', name: 'username', placeholder: 'e.g. root', type: 'text' }
              ].map(({ label, name, placeholder, type, as, options, value }, idx) => (
                <div key={idx} className={name === 'hostname' ? 'md:col-span-2' : ''}>
                  <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
                    {label}
                  </label>
                  {as === 'select' ? (
                    <select
                      name={name}
                      id={name}
                      className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={handleInputChange}
                      value={formData[name]}
                    >
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={name}
                      name={name}
                      placeholder={placeholder}
                      className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={handleInputChange}
                      value={value !== undefined ? value : formData[name]}
                    />
                  )}
                </div>
              ))}

              {formData.method === 'password' && (
                <div className="md:col-span-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={handleInputChange}
                    autoComplete="current-password"
                  />
                </div>
              )}

              {formData.method === 'key' && (
                <>
                  <div className="md:col-span-2">
                    <label htmlFor="privateKey" className="block text-sm font-semibold text-gray-700 mb-1">
                      Private Key
                    </label>
                    <textarea
                      id="privateKey"
                      name="privateKey"
                      rows="6"
                      placeholder="Paste your SSH private key here..."
                      className="input w-full border border-gray-300 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                      onChange={handleInputChange}
                      spellCheck="false"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="passphrase" className="block text-sm font-semibold text-gray-700 mb-1">
                      Passphrase (optional)
                    </label>
                    <input
                      type="text"
                      id="passphrase"
                      name="passphrase"
                      placeholder="Optional"
                      className="input w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={connected}
              className="mt-4 w-full max-w-xs bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              🔐 Connect to SSH
            </button>
          </form>

          {/* Right Column: Helpful Tips */}
          <aside className="space-y-6 text-gray-700">
            <div className="p-5 bg-blue-50 border-l-8 border-blue-400 rounded-lg shadow">
              <h4 className="text-blue-700 font-semibold mb-1">ℹ️ IP Tip</h4>
              <p className="text-sm">
                Use the public IP of your server. You can find it using commands like{' '}
                <code className="bg-gray-200 rounded px-1 py-0.5 text-xs">curl ifconfig.me</code>.
              </p>
            </div>
            <div className="p-5 bg-green-50 border-l-8 border-green-400 rounded-lg shadow">
              <h4 className="text-green-700 font-semibold mb-1">🔒 Use Keys in Production</h4>
              <p className="text-sm">Passwords are easier to brute force. For production, always prefer SSH key authentication with a strong passphrase.</p>
            </div>
            <div className="p-5 bg-yellow-50 border-l-8 border-yellow-500 rounded-lg shadow">
              <h4 className="text-yellow-700 font-semibold mb-1">⚠️ Common Error</h4>
              <p className="text-sm">"Connection refused" usually means SSH is not running on the server or the port is incorrect.</p>
            </div>
          </aside>
        </section>
      )}

      {/* Terminal */}
      {showTerminal && (
        <div
          ref={terminalRef}
          className="h-[600px] w-full bg-black rounded-xl shadow overflow-hidden mt-6"
        />
      )}
    </div>
  );
};

export default SSHService;
