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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-950 text-gray-200">
      {/* LEFT SIDE (Dark Branding Section) */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 flex flex-col justify-between p-10 border-r border-gray-800 relative">
        <div className="font-extrabold text-blue-400 text-2xl absolute top-6 left-6">
          HostPilot
        </div>

        <div className="flex-1 flex flex-col justify-center mt-6">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome Back to HostPilot</h1>
          <p className="text-lg mb-8 text-gray-400">
            Log in and manage your deployments, services, and infrastructure — fast and securely.
          </p>

          <ul className="mb-8 list-disc pl-5 space-y-2 text-gray-400 text-sm">
            <li>🚀 Launch apps in under 5 minutes</li>
            <li>🧠 Easy-to-use control panel</li>
            <li>🔒 Enterprise-grade security</li>
          </ul>

          {/* Testimonial */}
          <div className="bg-gray-800 p-5 rounded-lg max-w-md shadow border border-gray-700">
            <p className="italic mb-2 text-gray-300">“Super easy to get started!”</p>
            <p className="text-sm text-gray-400">Fast login, clean dashboard, and reliable service.</p>
            <p className="mt-4 font-semibold text-blue-400">— Anurag Singh ⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        {/* Security + Partners */}
        <div className="mt-8 text-xs text-gray-400">
          <p>🔒 Secure AES-256 Encryption</p>
          <p className="mt-2">Trusted by: AWS • Vercel • DigitalOcean</p>
        </div>
      </div>

      {/* RIGHT SIDE (Dark Sign-in Form, centered) */}
      <div className="flex items-center justify-center bg-gray-900 px-8 py-12 relative">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-gray-900 rounded-xl shadow-xl p-8 border border-gray-800"
        >
          {/* Logo (Blue accent on dark) */}
          <div className="font-extrabold text-blue-400 text-2xl absolute top-7 left-8">
            HostPilot
          </div>

          <h2 className="text-3xl font-semibold text-white mt-16 mb-2">Sign In</h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          {message && (
            <p className="text-sm text-red-400 mt-1 text-center">{message}</p>
          )}

          {/* Footer links */}
          <div className="text-sm text-center text-gray-400 mt-2">
            <Link to="/forgot-password" className="hover:underline text-blue-400">
              Forgot your password?
            </Link>
            <br />
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </div>

          {/* Promo */}
          <div className="mt-4 bg-gray-800 text-blue-400 p-3 rounded text-center text-sm font-medium border border-gray-700">
            🎁 Use code <strong>WELCOME10</strong> to get 10% off your first month!
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;