import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white flex flex-col">
      {/* <Navbar /> ✅ Navbar component used here */}

      <section className="flex flex-col md:flex-row justify-between items-center p-10 gap-10 grow">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Always-on vendor risk management</h1>
          <p className="text-lg text-white/80 mb-6">
            See your attack surface and third-party risk with unrivaled clarity. Reduce your team's workload at the same time.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-700 px-6 py-2 rounded font-semibold">Get a demo</button>
            <button className="border border-white px-6 py-2 rounded font-semibold">Free trial</button>
          </div>
        </div>

        <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full border border-white/20 animate-pulse delay-100"></div>
          <div className="absolute inset-8 rounded-full border border-white/20 animate-pulse delay-200"></div>
          <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-8 right-10 text-green-400 font-semibold">🟢 B675</div>
          <div className="absolute bottom-10 right-14 text-red-500 font-semibold">🔴 Risk detected</div>
          <div className="absolute top-20 left-6 text-orange-400 font-semibold">🟡 C420</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
