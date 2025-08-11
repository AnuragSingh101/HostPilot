import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTerminal, FaHtml5, FaPhp, FaReact, FaTachometerAlt,
  FaUser, FaCogs, FaLock, FaSignOutAlt, FaAngleRight, FaAngleLeft
} from "react-icons/fa";

const ICON_CLASSES = "text-xl opacity-90";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/dashboard/services/ssh", label: "SSH Access", icon: <FaTerminal /> },
  { path: "/dashboard/services/html-hosting", label: "HTML Hosting", icon: <FaHtml5 /> },
  { path: "/dashboard/services/php-hosting", label: "PHP Hosting", icon: <FaPhp /> },
  { path: "/dashboard/services/react-hosting", label: "React Hosting", icon: <FaReact /> },
];

const profileItems = [
  { path: "/profile", label: "Profile", icon: <FaUser /> },
  { path: "/settings", label: "Settings", icon: <FaCogs /> },
  { path: "/privacy", label: "Privacy", icon: <FaLock /> },
];

const Sidebar = ({ collapsed = false, toggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <aside
      className={`h-screen ${collapsed ? "w-20" : "w-64"} flex flex-col justify-between
      transition-all duration-300 
      bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950
      text-gray-300 shadow-lg border-r border-gray-800`}
    >

      {/* ----- LOGO: Modern Negative Space + Font ------ */}
      <div>
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} px-6 py-6`}>
          {!collapsed ? (
            <span className="font-logo font-extrabold text-2xl tracking-tight select-none leading-none relative">
              <span className="text-white">Host</span>
              {/* Negative-space PILOT logo effect */}
              <span className="ml-1 relative inline-block">
                <span 
                  className="text-blue-600 font-black relative" 
                  style={{
                    fontSize: "1.85em",
                    zIndex: 2,
                    letterSpacing: "-0.09em",
                    textShadow: "2px 2px 6px #232f3e50",
                    marginRight: "-3px",
                  }}
                >P</span>
                {/* "ilot" visually merged with the big "P"'s counter */}
                <span
                  className="absolute left-6 top-1 text-white font-extrabold"
                  style={{
                    fontSize: "1em",
                    letterSpacing: "0em",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                >
                  ilot
                </span>
              </span>
            </span>
          ) : (
            <span className="font-logo font-black text-2xl text-blue-600 select-none tracking-tight">HP</span>
          )}
        </div>

        {/* ---------- Menu Links ---------- */}
        <nav className="mt-2 select-none">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 py-2 my-1 font-logo font-semibold transition-colors duration-200
                  ${collapsed ? "justify-center px-0" : "px-6"}
                  ${
                    isActive
                      ? "bg-gray-800 text-white border-l-4 border-blue-500"
                      : "hover:bg-gray-800/70 hover:text-white border-l-4 border-transparent"
                  }
                `}
              >
                <span
                  className={`${ICON_CLASSES} ${
                    isActive ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="transition-opacity duration-200">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ---------- Profile + Logout + Collapse --------- */}
      <div>
        <nav className="pt-5 border-t border-gray-800 select-none">
          {profileItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 py-2 my-1 font-logo font-semibold transition-colors duration-200
                  ${collapsed ? "justify-center px-0" : "px-6"}
                  ${
                    isActive
                      ? "bg-gray-800 text-white border-l-4 border-blue-500"
                      : "hover:bg-gray-800/70 hover:text-white border-l-4 border-transparent"
                  }
                `}
              >
                <span
                  className={`${ICON_CLASSES} ${isActive ? "text-blue-400" : "text-gray-400"}`}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="transition-opacity duration-200">{item.label}</span>
                )}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 py-2 w-full font-logo font-semibold text-gray-400 hover:text-red-500 hover:bg-gray-800/70 
              border-l-4 border-transparent hover:border-red-500 transition-colors duration-200
              ${collapsed ? "justify-center px-0" : "px-6"}
            `}
          >
            <FaSignOutAlt className={`${ICON_CLASSES} text-red-500`} />
            {!collapsed && (<span className="transition-opacity duration-200">Logout</span>)}
          </button>
        </nav>
        {/* Collapse Toggle */}
        <div className="flex justify-center my-6">
          <button
            onClick={toggle}
            className="flex items-center justify-center bg-gray-800 h-8 w-8 rounded-md text-blue-400 hover:bg-blue-700 transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FaAngleRight size={18} /> : <FaAngleLeft size={18} />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
