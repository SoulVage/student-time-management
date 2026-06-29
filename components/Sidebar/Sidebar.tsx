"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Flame,
  ArrowUpRight,
  LogOut,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ناوبری همراه با سیستم بج عددی دیزاین پلتفرم
const navItems = [
  {
    name: "پیشخوان",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "تقویم",
    href: "/dashboard/calendar",
    icon: BookOpen,
  },
  {
    name: "وظایف روزانه",
    href: "/dashboard/daily-routine",
    icon: GraduationCap,
    count: "جدید",
  },
  {
    name: "دستیار وظایف",
    href: "/dashboard/ai",
    icon: GraduationCap,
    count: "هوش مصنوعی",
  },
  {
    name: "برنامه درسی",
    href: "/dashboard/study-plan",
    icon: GraduationCap,
  },
  {
    name: "ارتباط با مدیران",
    href: "/dashboard/information",
    icon: GraduationCap,
    count: "4",
  },
];

// دیتای پیگیری روزانه استریک (Weekly Log Tracker)
const streakDays = [
  { label: "ش", status: "completed" },
  { label: "ی", status: "completed" },
  { label: "د", status: "completed" },
  { label: "س", status: "active" }, // روز جاری
  { label: "چ", status: "pending" },
  { label: "پ", status: "pending" },
  { label: "ج", status: "pending" },
];

export default function SidebarWithStreak({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        dir="rtl"
        className={`fixed md:sticky top-20 right-0 z-999 h-[calc(100vh-5rem)] w-74 bg-white border-l border-zinc-100 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col justify-between p-5">
          {/* هدر سایدبار و بخش آیتم‌های منو */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                فهرست اصلی
              </span>
              <button
                onClick={onClose}
                className="md:hidden p-1 rounded-lg hover:bg-zinc-50 text-zinc-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-bold transition-all duration-200 group ${
                      isActive
                        ? "bg-orange-50/70 text-orange-600"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    {/* خط شاخص عمودی لبه راست منوی فعال */}
                    {isActive && (
                      <span className="absolute right-0 top-1/4 h-1/2 w-0.5 rounded-l-full bg-orange-500" />
                    )}

                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-4 w-4 stroke-[1.7] ${
                          isActive
                            ? "text-orange-600"
                            : "text-zinc-400 group-hover:text-zinc-800 transition-colors"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {/* نمایه شمارنده مینیاتوری */}
                    {item.count && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-md font-black ${
                          isActive
                            ? "bg-orange-200/50 text-orange-700"
                            : item.count === "جدید"
                            ? "bg-indigo-50 text-indigo-600"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* بخش پایینی: ویجت استریک + تنظیمات و خروج */}
          <div className="space-y-4">
            {/* کارت استریک پر جزییات نارنجی */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 border border-orange-100/50 text-orange-500">
                    <Flame className="h-4 w-4 stroke-[2] fill-orange-500/10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-zinc-900">
                      استریک مطالعه
                    </span>
                    <span className="text-[9px] text-zinc-400">
                      ۱۲ روز پایداری مداوم
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 rounded-lg bg-orange-50 px-2 py-1 text-[11px] font-black text-orange-600 border border-orange-100/30">
                  <span>۱۲</span>
                  <span className="text-[10px]">🔥</span>
                </div>
              </div>

              {/* پروگرس بار دقیق گرادیانی */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-zinc-50 overflow-hidden p-[1px] border border-zinc-100/50">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-l from-orange-500 via-amber-500 to-yellow-400" />
              </div>

              {/* تراکر تقویم خطی هفتگی زیر مینی‌پانل */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3 px-0.5">
                {streakDays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <span className="text-[9px] font-bold text-zinc-400">
                      {day.label}
                    </span>
                    {day.status === "completed" && (
                      <div className="h-3.5 w-3.5 rounded-full bg-orange-500 flex items-center justify-center">
                        <div className="h-1 w-1 rounded-full bg-white" />
                      </div>
                    )}
                    {day.status === "active" && (
                      <div className="h-3.5 w-3.5 rounded-full bg-orange-50 flex items-center justify-center border border-orange-300 animate-pulse">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      </div>
                    )}
                    {day.status === "pending" && (
                      <div className="h-3.5 w-3.5 rounded-full bg-zinc-50 border border-dashed border-zinc-200" />
                    )}
                  </div>
                ))}
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-100 bg-white py-2.5 text-[10px] font-bold text-zinc-700 hover:border-zinc-900 hover:bg-zinc-50 transition-all group">
                <span>جزییات زنجیره موفقیت</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform" />
              </button>
            </div>

            <div className="flex flex-col gap-1 pt-1.5 border-t border-zinc-100/80">
              <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-500 hover:bg-rose-50/60 hover:text-rose-600 transition-colors">
                <LogOut className="h-4 w-4 stroke-[1.7]" />
                <span>خروج از سیستم</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
