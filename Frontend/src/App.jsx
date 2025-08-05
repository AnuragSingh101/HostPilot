// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

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
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {!isLoggedIn && <Route path="/" element={<Home />} />}
        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
        {!isLoggedIn && <Route path="/login" element={<Signin />} />}
        {!isLoggedIn && <Route path="/blogs" element={<Blogs />} />}
        {!isLoggedIn && <Route path="/about" element={<About />} />}
        {!isLoggedIn && <Route path="/contact" element={<Contact />} />}
        {!isLoggedIn && <Route path="/pricing" element={<Pricing />} />}
        {!isLoggedIn && <Route path="/support" element={<Support />} />}
        {!isLoggedIn && <Route path="/features" element={<Features />} />}
        {!isLoggedIn && <Route path="/stories" element={<Stories />} />}

        {/* Protected routes */}
        {isLoggedIn && (
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="services/ssh" element={<SSH />} />
              <Route path="services/html" element={<HTML />} />
              <Route path="services/php" element={<PHP />} />
              <Route path="services/react" element={<ReactHosting />} />
            </Route>
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
