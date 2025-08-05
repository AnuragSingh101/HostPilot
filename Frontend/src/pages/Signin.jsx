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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE (Blue Branding Section) */}
      <div className="bg-blue-800 text-white flex flex-col justify-between p-10">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          HostPilot
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back to HostPilot</h1>
          <p className="text-lg mb-8">
            Log in and manage your deployments, services, and infrastructure — fast and securely.
          </p>

          <ul className="mb-8 list-disc pl-5 space-y-2 text-white text-sm">
            <li>🚀 Launch apps in under 5 minutes</li>
            <li>🧠 Easy-to-use control panel</li>
            <li>🔒 Enterprise-grade security</li>
          </ul>

          {/* Testimonial */}
          <div className="bg-blue-700 p-5 rounded-lg max-w-md">
            <p className="italic mb-2">“Super easy to get started!”</p>
            <p className="text-sm">Fast login, clean dashboard, and reliable service.</p>
            <p className="mt-4 font-semibold">— Anurag Singh ⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        {/* Security + Partners */}
        <div className="mt-8 text-xs">
          <p>🔒 Secure AES-256 Encryption</p>
          <p className="mt-2">Trusted by: [AWS] [Vercel] [DigitalOcean]</p>
        </div>
      </div>

      {/* RIGHT SIDE (Sign-in Form) */}
      <div className="flex items-center justify-center bg-white px-8 py-12 relative">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          {/* Logo (Blue text on white background) */}
          <div className="text-blue-800 text-2xl font-bold absolute top-8 left-8">
            HostPilot
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mt-16">Sign In</h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Sign In
          </button>

          {message && (
            <p className="text-sm text-red-600 mt-2 text-center">{message}</p>
          )}

          {/* Footer links */}
          <div className="text-sm text-center text-gray-600">
            <Link to="/forgot-password" className="hover:underline text-blue-600">
              Forgot your password?
            </Link>
            <br />
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>

          {/* Promo */}
          <div className="mt-4 bg-blue-100 text-blue-800 p-3 rounded text-center text-sm font-medium">
            🎁 Use code <strong>WELCOME10</strong> to get 10% off your first month!
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
