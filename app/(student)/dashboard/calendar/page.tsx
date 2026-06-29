"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Search,
  HelpCircle,
  Settings,
} from "lucide-react";

type TaskType = "exam" | "study" | "class";

interface Task {
  id: string;
  title: string;
  type: TaskType;
  time?: string;
}

// تسک‌های نمونه
const mockTasks: Record<number, Task[]> = {
  5: [{ id: "1", title: "آزمون جامع فیزیک", type: "exam", time: "08:00" }],
  12: [
    { id: "2", title: "کلاس آنلاین دیفرانسیل", type: "class", time: "16:30" },
    { id: "3", title: "مرور لغات زبان", type: "study" },
  ],
  18: [{ id: "4", title: "تحویل پروژه شیمی", type: "study" }],
  25: [{ id: "5", title: "آزمون شبیه‌ساز کنکور", type: "exam", time: "08:00" }],
};

const weekDays = [
  "شنبه",
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

// تابع تبدیل اعداد انگلیسی به فارسی برای رابط کاربری

export default function StudentCalendar() {
  const [realToday, setRealToday] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date | null>(null);
  const router = useRouter();
  // راه‌اندازی اولیه تقویم
  useEffect(() => {
    const now = new Date();
    now.setHours(12, 0, 0, 0); // نرمال‌سازی زمان برای جلوگیری از تداخل Timezone
    setRealToday(now);
    setViewDate(now);
  }, []);

  // استخراج اجزای تاریخ شمسی با اعداد استاندارد برای محاسبات
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

  // هدر تاریخ فارسی (مثال: خرداد ۱۴۰۳)
  const getMonthYearFa = (d: Date) => {
    const f = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      year: "numeric",
    });
    return f.format(d);
  };

  // --- منطق جابجایی ماه‌ها ---
  const nextMonth = () => {
    if (!viewDate) return;
    const d = new Date(viewDate);
    const p = getJalali(d);
    d.setDate(d.getDate() + (32 - p.d + 5)); // پرش امن به ماه بعد
    d.setDate(d.getDate() - (getJalali(d).d - 1)); // فیکس شدن روی روز اول
    setViewDate(d);
  };

  const prevMonth = () => {
    if (!viewDate) return;
    const d = new Date(viewDate);
    const p = getJalali(d);
    d.setDate(d.getDate() - p.d - 5); // پرش امن به ماه قبل
    d.setDate(d.getDate() - (getJalali(d).d - 1)); // فیکس شدن روی روز اول
    setViewDate(d);
  };

  const goToToday = () => {
    if (realToday) setViewDate(new Date(realToday));
  };

  // توابع رنگ‌بندی
  const getTaskColor = (type: TaskType) => {
    switch (type) {
      case "exam":
        return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
      case "study":
        return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
      case "class":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100";
    }
  };

  if (!viewDate || !realToday) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- ساخت گرید ۴۲ سلولی تقویم ---
  const cells = [];
  const currentP = getJalali(viewDate);
  const todayP = getJalali(realToday);

  // پیدا کردن روز اول ماه جاری
  const firstDayOfMonth = new Date(viewDate);
  firstDayOfMonth.setDate(firstDayOfMonth.getDate() - (currentP.d - 1));

  // پیدا کردن اینکه ماه با چه روزی از هفته شروع می‌شود (شنبه = 0)
  const startDayOfWeek = (firstDayOfMonth.getDay() + 1) % 7;

  // پیدا کردن تعداد روزهای ماه جاری
  const nextMonthFirstDay = new Date(firstDayOfMonth);
  nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() + 32);
  nextMonthFirstDay.setDate(
    nextMonthFirstDay.getDate() - (getJalali(nextMonthFirstDay).d - 1)
  );
  const lastDayOfMonth = new Date(nextMonthFirstDay);
  lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
  const daysInMonth = getJalali(lastDayOfMonth).d;

  // استخراج روزهای ماه قبل برای پر کردن فضاهای خالی ابتدای گرید
  const prevMonthLastDay = new Date(firstDayOfMonth);
  prevMonthLastDay.setDate(prevMonthLastDay.getDate() - 1);
  const prevMonthDays = getJalali(prevMonthLastDay).d;

  // سلول‌های ماه قبل
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    cells.push({
      dayNumber: prevMonthDays - i,
      isCurrentMonth: false,
      isToday: false,
      tasks: [],
    });
  }

  // سلول‌های ماه جاری
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      todayP.y === currentP.y && todayP.m === currentP.m && todayP.d === i;
    // تسک‌ها فقط برای ماه جاری که امروز است لود می‌شوند (در دنیای واقعی با دیتابیس هندل می‌شود)
    cells.push({
      dayNumber: i,
      isCurrentMonth: true,
      isToday,
      tasks: mockTasks[i] || [],
    });
  }

  // سلول‌های ماه بعد جهت تکمیل ۴۲ خانه (۶ سطر کامل)
  const remaining = 32 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      dayNumber: i,
      isCurrentMonth: false,
      isToday: false,
      tasks: [],
    });
  }
  const today = new Date();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* بخش اصلی */}
      <header className="h-16 border-b border-zinc-100 flex items-center justify-between px-6 bg-white shrink-0 rounded-xl">
        <div className="flex items-center gap-6">
          <button
            onClick={goToToday}
            className="border border-zinc-200 hover:bg-zinc-50 rounded-lg px-4 py-1.5 text-xs font-bold text-zinc-700 transition-colors"
          >
            باز کردن امروز
          </button>
          <div className="flex items-center gap-2 text-zinc-500">
            {/* در تقویم‌های RTL، چپ و راست برعکس عمل می‌کنند */}
            <button
              onClick={prevMonth}
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <h1 className="text-xl font-black text-zinc-800">
            {getMonthYearFa(viewDate)}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-zinc-500">
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden rounded-xl">
        {/* هدر روزهای هفته */}
        <div className="grid grid-cols-7 border-b border-zinc-100 bg-white shrink-0">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-3 text-center border-l border-zinc-100 last:border-l-0"
            >
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-wider">
                {day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 md:grid-cols-7 md:grid-rows-5 overflow-hidden">
          {cells.map((cell, index) => {
            const day =
              cell.dayNumber < 10 ? `0${cell.dayNumber}` : `${cell.dayNumber}`;
            const currentP = getJalali(viewDate);
            const year = currentP.y;
            const month = currentP.m < 10 ? `0${currentP.m}` : `${currentP.m}`;
            return (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `task/${year}-${month}-${day}`
                  )
                }
                className={`border-b border-l border-zinc-100 bg-white p-1.5 transition-colors flex flex-col gap-1 min-h-30 overflow-hidden ${
                  !cell.isCurrentMonth ? "bg-zinc-50/30" : "hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex justify-center mt-1 shrink-0">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                      cell.isToday
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40"
                        : cell.isCurrentMonth
                        ? "text-zinc-700"
                        : "text-zinc-300"
                    }`}
                  >
                    {cell.dayNumber}
                  </span>
                </div>

                {/* تسک‌ها */}
                <div className="flex-1 flex flex-col gap-1 overflow-y-auto mt-1 pr-1 pb-1">
                  {cell.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`px-2 py-1.5 rounded-md border text-[10px] font-bold cursor-pointer truncate flex items-center gap-1.5 shrink-0 ${getTaskColor(
                        task.type
                      )}`}
                      title={task.title}
                    >
                      {task.time ? (
                        <span className="shrink-0 flex items-center gap-0.5 opacity-80">
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {task.time}
                        </span>
                      ) : null}
                      <span className="truncate">{task.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
