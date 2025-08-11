// pages/Home.jsx
import React from "react";
import Navbar from "../../components/layouts/Navbar";
import { FaCheckCircle, FaRocket, FaServer, FaShieldAlt, FaHeadset, FaCloud } from "react-icons/fa";

const features = [
  { icon: <FaCheckCircle className="text-blue-500 text-xl"/>, title: "Instant Panels", desc: "Deploy secure hosting panels with a single click." },
  { icon: <FaShieldAlt className="text-blue-500 text-xl"/>, title: "Built-in Security", desc: "All panels come firewall & DDoS hardened. No config required." },
  { icon: <FaRocket className="text-blue-500 text-xl"/>, title: "Super Simple", desc: "Just login & manage—no Linux skills or commands needed!" },
];

const plans = [
  { name: "Basic", price: "$5/mo", details: "1 Panel, 5GB SSD, SSL Free", cta: "Choose" },
  { name: "Pro", price: "$15/mo", details: "5 Panels, 30GB SSD, Priority Support", cta: "Most Popular" },
  { name: "Ultra", price: "$29/mo", details: "25 Panels, 100GB SSD, Custom Features", cta: "Choose" },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 flex flex-col font-sans">
    <Navbar />
    {/* Hero */}
    <section className="py-20 flex flex-col md:flex-row items-center max-w-7xl mx-auto w-full gap-10 px-4">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
          Host Secure Linux Panels in <span className="text-blue-600">One Click</span>
        </h1>
        <p className="text-lg mb-6">No setup. No server hardening. Just modern, safe hosting ready instantly.</p>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded font-bold shadow">Deploy Panel</button>
          <button className="border border-blue-500 text-blue-700 px-7 py-3 rounded font-semibold hover:bg-blue-50">See Pricing</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[260px] h-[260px] rounded-full shadow-xl bg-gradient-to-tr from-blue-200 via-blue-300 to-blue-400 flex items-center justify-center">
          <FaRocket className="text-[90px] text-blue-700/80" />
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-t-4 border-blue-100">
            {f.icon}
            <div className="font-bold text-lg mt-2 mb-1">{f.title}</div>
            <div className="text-blue-800 text-sm">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Plans */}
    <section className="py-14 max-w-5xl mx-auto w-full">
      <h2 className="text-center text-2xl font-bold mb-8 text-blue-800 tracking-wide uppercase">Plans</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {plans.map(plan => (
          <div key={plan.name} className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col items-center w-full max-w-xs">
            <div className="text-xl font-black text-blue-700">{plan.name}</div>
            <div className="my-3 text-3xl font-extrabold">{plan.price}</div>
            <div className="text-blue-700 mb-6">{plan.details}</div>
            <button className="px-6 py-2 rounded font-bold bg-blue-600 text-white hover:bg-blue-500 shadow">{plan.cta}</button>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-blue-800 text-blue-100 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-600 pb-2 uppercase tracking-wide">Services</h3>
          <ul className="space-y-2 text-blue-200">
            <li>Shared Hosting</li>
            <li>VPS Hosting</li>
            <li>Dedicated Servers</li>
            <li>Cloud Hosting</li>
            <li>Linux Hosting Panels</li>
            <li>Email Hosting</li>
            <li>Domain Registration</li>
            <li>SSL Certificates</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-600 pb-2 uppercase tracking-wide">Features</h3>
          <ul className="space-y-2 text-blue-200">
            <li>Pre-Hardened Security</li>
            <li>Automated Backups</li>
            <li>One-Click Panel Deployment</li>
            <li>DDoS Protection</li>
            <li>99.99% Uptime SLA</li>
            <li>24/7 Expert Support</li>
            <li>Easy-to-Use Control Panel</li>
            <li>Free SSL & CDN</li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-600 pb-2 uppercase tracking-wide">Support & Contact</h3>
          <ul className="space-y-2 text-blue-200">
            <li>24/7 Live Chat</li>
            <li>Email & Ticket Support</li>
            <li>Knowledge Base & Tutorials</li>
            <li>Phone Support</li>
            <li>Account Management</li>
            <li>Refund Policy</li>
          </ul>
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <FaHeadset className="text-blue-300" />
              <span>+1 800 123 4567</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaCloud className="text-blue-300" />
              <span>support@hostpilot.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-blue-300 text-sm mt-10">
        &copy; {new Date().getFullYear()} HostPilot &mdash; Secure Hosting Made Simple
      </div>
    </footer>
  </div>
);

export default Home;
