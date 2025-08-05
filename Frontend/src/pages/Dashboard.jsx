// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

// Service pages (replace with real components if needed)
const SSH = () => <div>SSH Access Page</div>;
const HTML = () => <div>HTML Hosting Page</div>;
const PHP = () => <div>PHP Hosting Page</div>;
const ReactHosting = () => <div>React Hosting Page</div>;

// Other placeholder pages
const Blogs = () => <div>Blogs Page</div>;
const About = () => <div>About Us Page</div>;
const Contact = () => <div>Contact Page</div>;
const Pricing = () => <div>Pricing Page</div>;
const Support = () => <div>Support Page</div>;
const Features = () => <div>Features Page</div>;
const Stories = () => <div>Client Stories Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/features" element={<Features />} />
        <Route path="/stories" element={<Stories />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="services/ssh" element={<SSH />} />
            <Route path="services/html" element={<HTML />} />
            <Route path="services/php" element={<PHP />} />
            <Route path="services/react" element={<ReactHosting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;