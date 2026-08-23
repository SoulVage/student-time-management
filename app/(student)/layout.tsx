"use client";

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Sun, X } from "lucide-react"; // add icons

interface LayoutProps {
  children: React.ReactNode;
  stats?: {
    totalMinutes: number;
    partsCount: number;
    totalTests: number;
    avgQuality: number;
  }; // optional stats prop
}

const Layout = ({ children, stats }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showEndDayModal, setShowEndDayModal] = useState(false);

  // Use provided stats or fallback to zeros
  const displayStats = stats ?? {
    totalMinutes: 0,
    partsCount: 0,
    totalTests: 0,
    avgQuality: 0,
  };

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
        <main className="flex-1 overflow-y-auto bg-[#F6F8FA] z-1 rounded-lg border border-gray-100 m-3">
          {children}
        </main>
      </div>

      {/* Floating End Day Button + Dropdown */}
      <div className="fixed bottom-6 left-4 z-50">
        {showEndDayModal && (
          <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">پایان روز</h3>
              <button
                type="button"
                onClick={() => setShowEndDayModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">زمان مطالعه</span>
                <span className="font-bold text-indigo-600">
                  {Math.floor(displayStats.totalMinutes / 60)} ساعت و{" "}
                  {displayStats.totalMinutes % 60} دقیقه
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">تعداد پارت</span>
                <span className="font-bold text-blue-600">{displayStats.partsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">مجموع تست</span>
                <span className="font-bold text-emerald-600">{displayStats.totalTests}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">میانگین کیفیت</span>
                <span className="font-bold text-amber-600">{displayStats.avgQuality} / ۵</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                // Perform end‑of‑day actions here
                setShowEndDayModal(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 transition-all"
            >
              پایان روز
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowEndDayModal((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-all"
          title="پایان روز"
        >
          <Sun size={24} />
        </button>
      </div>
    </div>
  );
};

export default Layout;