// MegaNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  PencilIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const MegaNavbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center text-black relative z-50">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-blue-600">HostPilot</Link>
      </div>

      {/* Center Navigation */}
      <div className="flex items-center gap-6 text-sm relative">
        {/* Services with mega menu */}
        <div className="relative group">
          <button className="hover:text-blue-600">Services ▾</button>

          <div
            className="absolute top-full left-0 bg-white text-black rounded-xl shadow-lg p-6 w-[700px] hidden group-hover:flex gap-6 z-50"
          >
            {/* Left Section */}
            <div className="flex flex-col gap-5 w-2/3">
              <Link to="/services/ssh" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <RocketLaunchIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">SSH Shell</p>
                  <p className="text-sm text-gray-500">Access secure remote terminal</p>
                </div>
              </Link>

              <Link to="/services/html" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <RocketLaunchIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">HTML Site Hosting</p>
                  <p className="text-sm text-gray-500">Deploy static websites easily</p>
                </div>
              </Link>

              <Link to="/services/php" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <RocketLaunchIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">PHP Site Hosting</p>
                  <p className="text-sm text-gray-500">Run dynamic PHP websites</p>
                </div>
              </Link>

              <Link to="/services/react" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <RocketLaunchIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">React Site Hosting</p>
                  <p className="text-sm text-gray-500">Deploy your React apps</p>
                </div>
              </Link>
            </div>

            {/* Right Section */}
            <div className="w-1/3 border-l pl-4 flex flex-col justify-between">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                alt="Client Story"
                className="rounded-lg object-cover h-32 w-full"
              />
              <div className="mt-2">
                <p className="text-sm font-semibold">Client stories</p>
                <p className="text-xs text-gray-500">
                  Our clients’ successes are our favorite stories
                </p>
                <Link to="/stories" className="text-blue-600 flex items-center text-sm mt-1">
                  Read more <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Explore */}
        <div className="relative group">
          <button className="hover:text-blue-600">Explore ▾</button>

          <div
            className="absolute top-full left-0 bg-white text-black rounded-xl shadow-lg p-6 w-[700px] hidden group-hover:flex gap-6 z-50"
          >
            {/* Left Section */}
            <div className="flex flex-col gap-5 w-2/3">
              <Link to="/blogs" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <PencilIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">Blog</p>
                  <p className="text-sm text-gray-500">Our latest news and updates</p>
                </div>
              </Link>

              <Link to="/features" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <WrenchScrewdriverIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">Features and tools</p>
                  <p className="text-sm text-gray-500">Latest product releases and features</p>
                </div>
              </Link>

              <Link to="/about" className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded">
                <RocketLaunchIcon className="w-5 h-5 mt-1 text-blue-500" />
                <div>
                  <p className="font-medium">Our story</p>
                  <p className="text-sm text-gray-500">How we got here and where we’re going</p>
                </div>
              </Link>
            </div>

            {/* Right Section */}
            <div className="w-1/3 border-l pl-4 flex flex-col justify-between">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                alt="Client Story"
                className="rounded-lg object-cover h-32 w-full"
              />
              <div className="mt-2">
                <p className="text-sm font-semibold">Client stories</p>
                <p className="text-xs text-gray-500">
                  Our clients’ successes are our favorite stories
                </p>
                <Link to="/stories" className="text-blue-600 flex items-center text-sm mt-1">
                  Read more <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Link to="/support" className="hover:text-blue-600">Support</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
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
    </div>
  );
};

export default MegaNavbar;
