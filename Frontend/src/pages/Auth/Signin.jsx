import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful ✅');
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed ❌');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      {/* LEFT: Branding & Features */}
      <div className="flex-1 flex flex-col justify-center px-10 py-14 md:py-0 bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="font-extrabold text-blue-600 text-2xl mb-8">HostPilot</div>

          <h1 className="text-3xl md:text-4xl font-black text-blue-800 mb-5">
            Welcome Back to HostPilot
          </h1>
          <p className="mb-7 text-blue-700 text-base font-medium">
            Log in and manage your deployments, services, and infrastructure — fast and securely.
          </p>

          <ul className="mb-9 list-disc pl-5 space-y-2 text-blue-700 text-base/relaxed font-medium">
            <li>🚀 Launch apps in under 5 minutes</li>
            <li>🧠 Easy-to-use control panel</li>
            <li>🔒 Enterprise-grade security</li>
          </ul>

          {/* Testimonial */}
          <div className="bg-blue-50 p-5 rounded-xl shadow-lg border border-blue-200">
            <p className="italic mb-2 text-blue-800">&ldquo;Super easy to get started!&rdquo;</p>
            <p className="text-base text-blue-700">
              Fast login, clean dashboard, and reliable service.
            </p>
            <p className="mt-4 font-bold text-blue-600">— Anurag Singh ⭐⭐⭐⭐⭐</p>
          </div>

          {/* Security & Partners */}
          <div className="mt-8 text-sm text-blue-400/90">
            <p>🔒 Secure AES-256 Encryption</p>
            <p className="mt-2">Trusted by: AWS • Vercel • DigitalOcean</p>
          </div>
        </div>
      </div>

      {/* RIGHT: White Card Form */}
      <div className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-blue-300 to-blue-400">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 p-10 relative space-y-7"
        >
          <div className="font-extrabold text-blue-600 text-2xl absolute top-7 left-10">HostPilot</div>

          <h2 className="text-3xl font-extrabold text-blue-800 mt-10 mb-2 tracking-tight">
            Sign In
          </h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-white border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-300 text-blue-900 font-semibold transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-white border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-300 text-blue-900 font-semibold transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          {message && (
            <p className="text-base text-red-500 mt-2 text-center font-semibold">{message}</p>
          )}

          {/* Links */}
          <div className="text-center text-base text-blue-700 mt-2">
            <Link to="/forgot-password" className="hover:underline text-blue-600 font-semibold">
              Forgot your password?
            </Link>
            <br />
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">
              Sign Up
            </Link>
          </div>

          {/* Promo */}
          <div className="mt-4 bg-blue-50 text-blue-600 p-3 rounded text-center text-base font-bold border border-blue-200">
            🎁 Use code <strong>WELCOME10</strong> to get 10% off your first month!
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
