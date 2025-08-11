// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navOptions = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  return (
    <nav className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="font-extrabold text-2xl text-blue-700 tracking-tight">
          HostPilot
        </Link>
        <div className="hidden md:flex gap-2">
          {navOptions.map(opt => (
            <Link key={opt.path} to={opt.path}
              className={`px-4 py-2 rounded transition font-semibold ${
                location.pathname === opt.path
                  ? "bg-blue-600 text-white"
                  : "text-blue-800 hover:bg-blue-50"
              }`}>
              {opt.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-2">
          <Link to="/login"
            className="px-4 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-100 transition font-semibold">
            Login
          </Link>
          <Link to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition">
            Get Started
          </Link>
        </div>
        <button className="md:hidden p-2 text-blue-700" onClick={() => setMenu(v => !v)}>
          <svg width={30} height={30} fill="none" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d={menu ? "M6 6L24 24M6 24L24 6" : "M5 9h20M5 15h20"} /></svg>
        </button>
      </div>
      {menu && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-6 py-4 gap-2 font-semibold text-blue-900">
            {navOptions.map(opt => (
              <Link to={opt.path} key={opt.path} onClick={() => setMenu(false)} className="py-2">
                {opt.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setMenu(false)} className="py-2">Login</Link>
            <Link to="/signup" onClick={() => setMenu(false)} className="py-2">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
