import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed((v) => !v)} />
      <main className={collapsed ? "flex-1 ml-20 p-6" : "flex-1 ml-64 p-6"}>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
