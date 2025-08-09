import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const stats = [
  { label: "Active Servers", value: 256 },
  { label: "Monthly Deployments", value: 1500 },
  { label: "Network Uptime", value: 99.99 },
  { label: "Support Tickets Solved", value: 24000 },
];

const services = [
  { name: "SSH Shell", description: "Secure remote terminal access.", path: "/dashboard/services/ssh" },
  { name: "HTML Hosting", description: "Static websites with global CDN.", path: "/dashboard/services/html-hosting" },
  { name: "PHP Hosting", description: "Dynamic PHP apps with DB support.", path: "/dashboard/services/php-hosting" },
  { name: "React Hosting", description: "Optimized SPA hosting.", path: "/dashboard/services/react-hosting" },
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

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to HostPilot</h1>
        <p className="text-gray-400">Manage your hosting, services, and deployments all in one place.</p>
      </header>

      <main className="grid grid-cols-12 gap-8">
        {/* Stats */}
        <section className="col-span-12 lg:col-span-4 grid gap-6">
          {stats.map(({ label, value }) => (
            <div key={label} className="rounded bg-gray-800 p-6 shadow hover:bg-gray-700 transition">
              <CountUp
                end={value}
                duration={2.5}
                separator=","
                decimals={label === "Network Uptime" ? 2 : 0}
                suffix={label === "Network Uptime" ? "%" : ""}
                className="text-3xl font-bold"
              />
              <p className="mt-2 text-gray-400">{label}</p>
            </div>
          ))}
        </section>

        {/* Services */}
        <section className="col-span-12 lg:col-span-5">
          <h2 className="text-2xl font-bold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map(({ name, description, path }) => (
              <Link
                key={name}
                to={path}
                className="bg-gray-800 border border-gray-700 rounded p-4 hover:bg-gray-700 transition flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-1 text-blue-300">{name}</h3>
                <p className="text-sm text-gray-400 flex-grow">{description}</p>
                <span className="text-blue-400 mt-3 underline">Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Aside */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          {/* Tips */}
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">Pro Tips</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              {tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
            </ul>
          </div>
          {/* Recent Activities */}
          <div className="bg-gray-800 border border-gray-700 rounded p-4 max-h-64 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3 text-blue-300">Recent Activity</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              {recentActivities.map((activity, idx) => <li key={idx}>{activity}</li>)}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
