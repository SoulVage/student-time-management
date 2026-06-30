"use client";

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ViewTransition } from "react"; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Header 
        onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-[#F6F8FA] z-1">
          <ViewTransition default="morph" share="morph">
            {children}
          </ViewTransition>
        </main>
      </div>
    </div>
  );
};

export default Layout;