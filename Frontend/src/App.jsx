// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HTMLHosting from './pages/services/HTMLHosting';  
import PHPHosting from './pages/services/PHPHosting'; 
import ReactHosting from './pages/services/ReactHosting'; 

// Service pages
import SSHService from './pages/services/SSHService';

// Other placeholder pages
const Blogs = () => <div>Blogs Page</div>;
const About = () => <div>About Us Page</div>;
const Contact = () => <div>Contact Page</div>;
const Pricing = () => <div>Pricing Page</div>;
const Support = () => <div>Support Page</div>;
const Features = () => <div>Features Page</div>;
const Stories = () => <div>Client Stories Page</div>;

function App() {
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />

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
        <Route path="*" element={<div className="p-10 text-center text-red-600 font-bold text-lg">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
