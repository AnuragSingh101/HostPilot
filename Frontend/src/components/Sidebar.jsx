// Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTerminal,
  FaHtml5,
  FaPhp,
  FaReact,
  FaTachometerAlt,
  FaUser,
  FaCogs,
  FaLock,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/services/ssh", label: "SSH Access", icon: <FaTerminal /> },
    { path: "/services/html", label: "HTML Hosting", icon: <FaHtml5 /> },
    { path: "/services/php", label: "PHP Hosting", icon: <FaPhp /> },
    { path: "/services/react", label: "React Hosting", icon: <FaReact /> },
  ];

  const profileItems = [
    { path: "/profile", label: "Profile", icon: <FaUser /> },
    { path: "/settings", label: "Settings", icon: <FaCogs /> },
    { path: "/privacy", label: "Privacy", icon: <FaLock /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-white shadow-md rounded-r-3xl p-6 min-h-screen flex flex-col justify-between">
      <div>
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
      </div>

      <div className="mt-10 border-t pt-6 space-y-3">
        {profileItems.map((item) => (
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-200 w-full text-left"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
