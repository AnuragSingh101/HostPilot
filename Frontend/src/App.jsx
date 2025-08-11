import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/mainPages/Home";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Dashboard from "./pages/mainPages/Dashboard";
import Layout from "./components/layouts/Layout"; 
import ProtectedRoute from "./components/ProtectedRoute";
import HTMLHosting from './pages/services/HTMLHosting';
import PHPHosting from './pages/services/PHPHosting';
import ReactHosting from './pages/services/ReactHosting';

import SSHService from './components/sshFeature/SSHService';

// Placeholder pages
const Blogs = () => <div className="text-center text-gray-300 py-16">Blogs Page</div>;
const About = () => <div className="text-center text-gray-300 py-16">About Us Page</div>;
const Contact = () => <div className="text-center text-gray-300 py-16">Contact Page</div>;
const Pricing = () => <div className="text-center text-gray-300 py-16">Pricing Page</div>;
const Support = () => <div className="text-center text-gray-300 py-16">Support Page</div>;
const Features = () => <div className="text-center text-gray-300 py-16">Features Page</div>;
const Stories = () => <div className="text-center text-gray-300 py-16">Client Stories Page</div>;

// 404 Component - Polished dark UI version
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900">
    <div className="text-5xl font-black text-red-500 mb-4">404</div>
    <div className="text-xl text-gray-100 font-semibold mb-2">Page Not Found</div>
    <div className="text-gray-500">The page you are looking for does not exist.</div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-950 to-black">
      <BrowserRouter>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/features" element={<Features />} />
          <Route path="/stories" element={<Stories />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="services/ssh" element={<SSHService />} />
              <Route path="services/html-hosting" element={<HTMLHosting />} />
              <Route path="services/php-hosting" element={<PHPHosting />} />
              <Route path="services/react-hosting" element={<ReactHosting />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
