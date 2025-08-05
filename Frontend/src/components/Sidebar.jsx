// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTerminal, FaHtml5, FaPhp, FaReact, FaTachometerAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/services/ssh", label: "SSH Access", icon: <FaTerminal /> },
    { path: "/services/html", label: "HTML Hosting", icon: <FaHtml5 /> },
    { path: "/services/php", label: "PHP Hosting", icon: <FaPhp /> },
    { path: "/services/react", label: "React Hosting", icon: <FaReact /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md rounded-r-3xl p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-purple-600 mb-10">HostPilot</h2>
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg text-sm font-medium 
              ${location.pathname === item.path
                ? 'bg-purple-100 text-purple-600'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200'
              }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
