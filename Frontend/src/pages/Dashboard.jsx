import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

const stats = [
  { label: "Active Servers", value: 256, color: "from-purple-500 to-indigo-400" },
  { label: "Monthly Deployments", value: 1500, color: "from-pink-400 to-red-400" },
  { label: "Network Uptime", value: 99.99, color: "from-green-400 to-blue-400" },
  { label: "Support Tickets Solved", value: 24000, color: "from-yellow-400 to-orange-500" },
];

const services = [
  { name: "SSH Shell", description: "Secure remote terminal access.", path: "/dashboard/services/ssh" },
  { name: "HTML Hosting", description: "Static websites with global CDN.", path: "/dashboard/services/html" },
  { name: "PHP Hosting", description: "Dynamic PHP apps with DB support.", path: "/dashboard/services/php" },
  { name: "React Hosting", description: "Optimized SPA hosting.", path: "/dashboard/services/react" },
];

const tips = [
  "Use SSH keys for secure authentication.",
  "Regularly monitor your server uptime.",
  "Keep backups for disaster recovery.",
  "Contact support for any assistance 24/7.",
];

const recentActivities = [
  "Server 192.168.1.100 deployed successfully.",
  "New SSH session started on server 10.0.0.5.",
  "Maintenance scheduled for 12th Aug at 2 AM UTC.",
  "Backup completed for website hostpilot.com.",
];

const ModernDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-purple-200 p-10 font-sans text-gray-900">
      <header className="mb-12 max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide text-purple-900">
          Welcome to Host Pilot
        </h1>
        <p className="text-lg max-w-3xl leading-relaxed text-purple-800">
          Manage your hosting, services, and deployments all in one place with our modern dashboard.
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Stats Section */}
        <section className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-8">
          {stats.map(({ label, value, color }) => (
            <div
              key={label}
              className={`rounded-3xl p-8 bg-gradient-to-br ${color} text-white shadow-lg transform transition hover:scale-105`}
            >
              <CountUp
                end={value}
                duration={2.5}
                separator=","
                decimals={label === "Network Uptime" ? 2 : 0}
                suffix={label === "Network Uptime" ? "%" : ""}
                className="text-4xl font-extrabold drop-shadow"
              />
              <p className="mt-2 font-semibold">{label}</p>
            </div>
          ))}
        </section>

        {/* Services Section */}
        <section className="col-span-12 lg:col-span-5 space-y-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map(({ name, description, path }) => (
              <Link
                to={path}
                key={name}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-700">{name}</h3>
                <p className="text-gray-700 flex-grow">{description}</p>
                <span className="mt-4 inline-block text-purple-600 font-semibold underline">Explore &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Aside: Tips & Recent Activity */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-8">
          {/* Tips */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4 text-purple-900">Pro Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-80">
            <h3 className="text-2xl font-semibold mb-4 text-purple-900">Recent Activity</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recentActivities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto mt-16 text-center">
        <h2 className="text-4xl font-extrabold text-purple-900 mb-6">Ready to grow with Host Pilot?</h2>
        <p className="text-lg text-purple-800 max-w-xl mx-auto mb-8">
          Get in touch with our support team or explore more about our services to take your hosting experience to the next level.
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="mailto:support@hostpilot.com"
            className="px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:brightness-110 transition"
          >
            Email Support
          </a>
          <a
            href="tel:+1234567890"
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 text-white font-bold rounded-full shadow-lg hover:brightness-110 transition"
          >
            Call Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default ModernDashboard;
