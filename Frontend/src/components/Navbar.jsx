import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [showServices, setShowServices] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // Active link styling
  const navLink = (path, label) => (
    <Link
      to={path}
      className={`text-sm font-medium hover:text-blue-600 transition duration-150 ${
        location.pathname === path ? "text-blue-600 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white text-black shadow-md p-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-blue-600">HostPilot</Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-base">
        {/* Services Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <button className="text-sm font-medium hover:text-blue-600 transition duration-150">
            Services ▾
          </button>

          <div
            className={`absolute top-10 left-0 bg-white border rounded shadow-md w-56 transition-opacity duration-200 ${
              showServices ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <Link to="/services/ssh" className="block px-4 py-2 hover:bg-blue-50 text-sm">SSH Access</Link>
            <Link to="/services/php" className="block px-4 py-2 hover:bg-blue-50 text-sm">PHP Hosting</Link>
            <Link to="/services/html" className="block px-4 py-2 hover:bg-blue-50 text-sm">HTML Hosting</Link>
            <Link to="/services/react" className="block px-4 py-2 hover:bg-blue-50 text-sm">React Hosting</Link>
          </div>
        </div>

        {navLink("/blogs", "Blogs")}
        {navLink("/about", "About Us")}
        {navLink("/contact", "Contact Us")}
        {navLink("/pricing", "Pricing")}
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex gap-2">
        <Link
          to="/login"
          className="text-blue-600 border border-blue-600 px-4 py-1 rounded hover:bg-blue-50 text-sm font-medium transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm font-medium transition"
        >
          Signup
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button onClick={() => setShowMenu(!showMenu)} className="text-2xl font-bold">
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-2 p-4 md:hidden z-50 text-sm">
          <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>

          <details className="group">
            <summary className="cursor-pointer">Services</summary>
            <div className="pl-4 flex flex-col">
              <Link to="/services/ssh" onClick={() => setShowMenu(false)}>SSH Access</Link>
              <Link to="/services/php" onClick={() => setShowMenu(false)}>PHP Hosting</Link>
              <Link to="/services/html" onClick={() => setShowMenu(false)}>HTML Hosting</Link>
              <Link to="/services/react" onClick={() => setShowMenu(false)}>React Hosting</Link>
            </div>
          </details>

          <Link to="/blogs" onClick={() => setShowMenu(false)}>Blogs</Link>
          <Link to="/about" onClick={() => setShowMenu(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setShowMenu(false)}>Contact Us</Link>
          <Link to="/pricing" onClick={() => setShowMenu(false)}>Pricing</Link>
          <Link to="/login" onClick={() => setShowMenu(false)} className="text-blue-600">Login</Link>
          <Link to="/signup" onClick={() => setShowMenu(false)} className="text-white bg-blue-600 px-2 py-1 rounded mt-2 w-max">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
