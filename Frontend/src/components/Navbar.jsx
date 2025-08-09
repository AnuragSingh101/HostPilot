import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [showServices, setShowServices] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`text-gray-700 hover:text-blue-600 transition font-medium px-3 py-2 rounded-md ${
        location.pathname === path ? "text-blue-600 font-semibold bg-blue-100" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-blue-700 hover:text-blue-800">
          HostPilot
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-base">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
              aria-haspopup="true"
              aria-expanded={showServices}
            >
              Services
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  showServices ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden transition-opacity duration-300 ${
                showServices ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <Link
                to="/services/ssh"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                SSH Access
              </Link>
              <Link
                to="/services/php"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                PHP Hosting
              </Link>
              <Link
                to="/services/html"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                HTML Hosting
              </Link>
              <Link
                to="/services/react"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                React Hosting
              </Link>
            </div>
          </div>

          {navLink("/blogs", "Blogs")}
          {navLink("/about", "About Us")}
          {navLink("/contact", "Contact Us")}
          {navLink("/pricing", "Pricing")}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 font-semibold transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-blue-700 hover:text-blue-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {showMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 text-sm">
            <Link to="/" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
              Home
            </Link>

            <details className="group">
              <summary className="cursor-pointer flex justify-between items-center font-medium py-2 hover:text-blue-600">
                Services
                <svg
                  className="w-4 h-4 text-gray-600 group-open:rotate-180 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="flex flex-col pl-4 mt-2 space-y-2">
                <Link
                  to="/services/ssh"
                  onClick={() => setShowMenu(false)}
                  className="hover:text-blue-600"
                >
                  SSH Access
                </Link>
                <Link
                  to="/services/php"
                  onClick={() => setShowMenu(false)}
                  className="hover:text-blue-600"
                >
                  PHP Hosting
                </Link>
                <Link
                  to="/services/html"
                  onClick={() => setShowMenu(false)}
                  className="hover:text-blue-600"
                >
                  HTML Hosting
                </Link>
                <Link
                  to="/services/react"
                  onClick={() => setShowMenu(false)}
                  className="hover:text-blue-600"
                >
                  React Hosting
                </Link>
              </div>
            </details>

            <Link to="/blogs" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
              Blogs
            </Link>
            <Link to="/about" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
              About Us
            </Link>
            <Link to="/contact" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
              Contact Us
            </Link>
            <Link to="/pricing" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
              Pricing
            </Link>
            <Link
              to="/login"
              onClick={() => setShowMenu(false)}
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setShowMenu(false)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md font-semibold"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
