import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back 👋</h1>
      <p className="text-gray-500 mb-10">Manage your hosting, services, and deployments all in one place.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/dashboard/services/ssh" className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-purple-600">SSH Shell</h3>
          <p className="text-sm text-gray-500">Secure access to your VMs</p>
        </Link>

        <Link to="/dashboard/services/html" className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-orange-600">HTML Hosting</h3>
          <p className="text-sm text-gray-500">Deploy static websites</p>
        </Link>

        <Link to="/dashboard/services/php" className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-blue-600">PHP Hosting</h3>
          <p className="text-sm text-gray-500">Dynamic PHP apps hosting</p>
        </Link>

        <Link to="/dashboard/services/react" className="bg-white shadow rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-cyan-600">React Hosting</h3>
          <p className="text-sm text-gray-500">SPA and JS app support</p>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
