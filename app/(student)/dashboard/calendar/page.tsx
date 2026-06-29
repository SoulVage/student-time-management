"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, HelpCircle, Settings } from "lucide-react";
import StudyLogModal from "@/components/StudyLogModal/StudyLogModal"; 

type TaskType = "exam" | "study" | "class";

interface Task {
  id: string;
  title: string;
  type: TaskType;
  time?: string;
}

const mockTasks: Record<number, Task[]> = {
  5: [{ id: "1", title: "آزمون جامع فیزیک", type: "exam", time: "08:00" }],
  12: [
    { id: "2", title: "کلاس آنلاین دیفرانسیل", type: "class", time: "16:30" },
    { id: "3", title: "مرور لغات زبان", type: "study" },
  ],
  18: [{ id: "4", title: "تحویل پروژه شیمی", type: "study" }],
  25: [{ id: "5", title: "آزمون شبیه‌ساز کنکور", type: "exam", time: "08:00" }],
};

const weekDays = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

export default function StudentCalendar() {
  const [realToday, setRealToday] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setHours(12, 0, 0, 0);
    setRealToday(now);
    setViewDate(now);
  }, []);

  const getJalali = (d: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const parts = formatter.formatToParts(d);
    return {
      y: parseInt(parts.find((p) => p.type === "year")?.value || "0", 10),
      m: parseInt(parts.find((p) => p.type === "month")?.value || "0", 10),
      d: parseInt(parts.find((p) => p.type === "day")?.value || "0", 10),
    };
  };

  const getMonthYearFa = (d: Date) => {
    const f = new Intl.DateTimeFormat("fa-IR", { month: "long", year: "numeric" });
    return f.format(d);
  };

  const nextMonth = () => {
    if (!viewDate) return;
    const d = new Date(viewDate);
    const p = getJalali(d);
    d.setDate(d.getDate() + (32 - p.d + 5));
    d.setDate(d.getDate() - (getJalali(d).d - 1));
    setViewDate(d);
  };

  const prevMonth = () => {
    if (!viewDate) return;
    const d = new Date(viewDate);
    const p = getJalali(d);
    d.setDate(d.getDate() - p.d - 5);
    d.setDate(d.getDate() - (getJalali(d).d - 1));
    setViewDate(d);
  };

  const goToToday = () => {
    if (realToday) setViewDate(new Date(realToday));
  };

  const getTaskColor = (type: TaskType) => {
    switch (type) {
      case "exam": return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
      case "study": return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
      case "class": return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
      default: return "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100";
    }
  };

  if (!viewDate || !realToday) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cells = [];
  const currentP = getJalali(viewDate);
  const todayP = getJalali(realToday);
  const firstDayOfMonth = new Date(viewDate);
  firstDayOfMonth.setDate(firstDayOfMonth.getDate() - (currentP.d - 1));
  const startDayOfWeek = (firstDayOfMonth.getDay() + 1) % 7;
  const nextMonthFirstDay = new Date(firstDayOfMonth);
  nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() + 32);
  nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - (getJalali(nextMonthFirstDay).d - 1));
  const lastDayOfMonth = new Date(nextMonthFirstDay);
  lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
  const daysInMonth = getJalali(lastDayOfMonth).d;
  const prevMonthLastDay = new Date(firstDayOfMonth);
  prevMonthLastDay.setDate(prevMonthLastDay.getDate() - 1);
  const prevMonthDays = getJalali(prevMonthLastDay).d;

  for (let i = startDayOfWeek - 1; i >= 0; i--) { cells.push({ dayNumber: prevMonthDays - i, isCurrentMonth: false, isToday: false, tasks: [] }); }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = todayP.y === currentP.y && todayP.m === currentP.m && todayP.d === i;
    cells.push({ dayNumber: i, isCurrentMonth: true, isToday, tasks: mockTasks[i] || [] });
  }
  const remaining = 32 - cells.length;
  for (let i = 1; i <= remaining; i++) { cells.push({ dayNumber: i, isCurrentMonth: false, isToday: false, tasks: [] }); }

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <header className="h-16 border-b border-zinc-100 flex items-center justify-between px-6 bg-white shrink-0 rounded-xl shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={goToToday} className="border border-zinc-200 hover:bg-zinc-50 rounded-lg px-4 py-1.5 text-xs font-bold text-zinc-700 transition-colors">باز کردن امروز</button>
          <div className="flex items-center gap-2 text-zinc-500">
            <button onClick={prevMonth} className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors"><ChevronRight className="w-5 h-5" /></button>
            <button onClick={nextMonth} className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          </div>
          <h1 className="text-xl font-black text-zinc-800">{getMonthYearFa(viewDate)}</h1>
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><Settings className="w-5 h-5" /></button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col overflow-hidden rounded-xl border border-zinc-100 shadow-sm bg-zinc-50">
        <div className="grid grid-cols-7 border-b border-zinc-100 bg-white shrink-0">
          {weekDays.map((day) => (
            <div key={day} className="py-3 text-center border-l border-zinc-100 last:border-l-0">
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider">{day}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 md:grid-rows-5 overflow-hidden bg-white">
          {cells.map((cell, index) => {
            const day = cell.dayNumber < 10 ? `0${cell.dayNumber}` : `${cell.dayNumber}`;
            const year = currentP.y;
            const month = currentP.m < 10 ? `0${currentP.m}` : `${currentP.m}`;
            
            return (
              <div
                key={index}
                onClick={() => {
                   setSelectedDateForModal(`${year}/${month}/${day}`);
                   setIsModalOpen(true);
                }}
                className={`border-b border-l border-zinc-100 bg-white p-2 transition-colors flex flex-col gap-1 min-h-[120px] overflow-hidden cursor-pointer ${
                  !cell.isCurrentMonth ? "bg-zinc-50/50 opacity-60" : "hover:bg-zinc-50"
                }`}
              >
                <div className="flex justify-center mt-1 shrink-0">
                  <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${cell.isToday ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40" : cell.isCurrentMonth ? "text-zinc-700" : "text-zinc-300"}`}>
                    {cell.dayNumber}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-1 overflow-y-auto mt-2 pr-1 pb-1">
                  {cell.tasks.map((task) => (
                    <div key={task.id} className={`px-2 py-1.5 rounded-md border text-[10px] font-bold cursor-pointer truncate flex items-center gap-1.5 shrink-0 ${getTaskColor(task.type)}`} title={task.title}>
                      {task.time ? <span className="shrink-0 flex items-center gap-0.5 opacity-80"><span className="w-1.5 h-1.5 rounded-full bg-current" />{task.time}</span> : null}
                      <span className="truncate">{task.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <StudyLogModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         selectedDate={selectedDateForModal}
      />
    </div>
  );
}