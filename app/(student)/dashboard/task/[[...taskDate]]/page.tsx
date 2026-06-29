"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import StudyLogModal from "@/components/StudyLogModal/StudyLogModal";
import { Plus } from "lucide-react";

export default function TaskPage() {
  const params = useParams();
  
  // اگر تاریخی در URL نبود، مقدار 'امروز' قرار می‌گیرد
  const rawDate = params.taskDate as string[] | undefined;
  const formattedDate = rawDate ? rawDate.join("/") : "امروز";

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-[24px] shadow-sm border border-zinc-100 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-800">
            برنامه و تسک‌های: <span className="text-indigo-600 font-sans tracking-wider px-2">{formattedDate}</span>
          </h1>
          <p className="text-zinc-500 mt-2 text-sm font-medium">گزارش‌ها و برنامه‌های مطالعاتی خود را مدیریت کنید.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200/50"
        >
          <Plus className="w-5 h-5" />
          ثبت گزارش جدید
        </button>
      </div>

      <div className="mt-8 bg-zinc-50 rounded-[24px] border border-dashed border-zinc-200 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-zinc-400 font-medium">
          لیست تسک‌ها در اینجا نمایش داده می‌شود...
        </span>
      </div>

      <StudyLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedDate={formattedDate !== "امروز" ? formattedDate : undefined}
      />
    </div>
  );
}