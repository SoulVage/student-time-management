"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Header controls the mobile state trigger */}
      <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
