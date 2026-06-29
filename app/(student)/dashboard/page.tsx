"use client";

import React from "react";
import {
  TrendingUp,
  Clock,
  BookOpen,
  Target,
  MoreVertical,
  ArrowUpRight,
  Download,
  Calendar,
  CheckCircle2,
  Check,
  Play
} from "lucide-react";
import StudyChart from "@/components/StudyChart/StudyChart";

export default function StudentDashboardPage() {
  const date = new Date();
  const persianYear = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
  }).format(date);

  return (
    <div
      dir="rtl"
      className="w-full h-full bg-[#F8F9FA] overflow-y-auto custom-scrollbar p-6"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-10 bg-orange-500 rounded-full hidden md:block" />
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-zinc-900 leading-tight">
              داشبورد تحصیلی
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
              <span>گزارش روزانه مطالعه</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-indigo-600 font-bold">
                سال {persianYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
          iconBg="bg-indigo-50"
          title="ساعات مطالعه (هفته)"
          value="۳۲.۵"
          unit="ساعت"
          trend="+۴.۲ ساعت"
        />
        <MetricCard
          icon={<Target className="w-5 h-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
          title="تکمیل برنامه‌ها"
          value="۸۵٪"
          trend="+۵٪"
        />
        <MetricCard
          icon={<BookOpen className="w-5 h-5 text-orange-600" />}
          iconBg="bg-orange-50"
          title="آزمون‌های پیش‌رو"
          value="۳"
          trend="نیاز به مرور"
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5 text-rose-600" />}
          iconBg="bg-rose-50"
          title="معدل تراز"
          value="۶۸۵۰"
          trend="+۱۲۰ واحد"
        />
      </div>

      {/* Complex Data Section - Now 3 Columns (5-4-3 layout on large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Study Chart (Takes 5 columns width) */}
        <div className="lg:col-span-5 p-7 bg-white border border-zinc-100 rounded-3xl shadow-sm h-[420px] flex flex-col">
          <StudyChart />
        </div>

        {/* Column 2: Upcoming Tasks (Takes 4 columns width) */}
        <div className="lg:col-span-4 bg-white border border-zinc-100 rounded-3xl p-7 shadow-sm flex flex-col h-[420px]">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-zinc-900">اقدامات فوری</h2>
             <button className="text-xs text-indigo-600 font-bold hover:text-indigo-700 transition-colors">مشاهده همه</button>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            <TaskItem
              title="تکمیل گزارش شیمی"
              subtitle="مهلت: فردا، ۰۸:۰۰"
              type="urgent"
            />
            <TaskItem
              title="جلسه با مشاور تحصیلی"
              subtitle="امروز، ۱۶:۳۰"
              type="meeting"
            />
            <TaskItem
              title="مرور لغات زبان (درس ۴)"
              subtitle="برنامه روتین شبانه"
              type="routine"
            />
            <TaskItem
              title="ثبت کارنامه ماهانه"
              subtitle="توسط پنل مشاور"
              type="routine"
            />
          </div>
        </div>

        {/* Column 3: NEW Focus Timer Widget (Takes 3 columns width) */}
        <div className="lg:col-span-3 bg-white border border-zinc-100 rounded-3xl p-7 shadow-sm flex flex-col items-center justify-center h-[420px] relative overflow-hidden">
          <div className="w-full text-right mb-6">
             <h2 className="text-lg font-bold text-zinc-900">تایمر تمرکز</h2>
             <p className="text-xs text-zinc-500 mt-1 font-medium">۲۵ دقیقه مطالعه عمیق</p>
          </div>
          
          <div className="relative w-40 h-40 flex items-center justify-center mb-8">
            {/* SVG Circular Progress */}
            <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f4f4f5" strokeWidth="6" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#4f46e5" 
                strokeWidth="6" 
                strokeDasharray="283" 
                strokeDashoffset="60" 
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out" 
              />
            </svg>
            <div className="flex flex-col items-center z-10">
               <span className="text-4xl font-black text-indigo-600 tracking-tight" dir="ltr">25:00</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200/50 group">
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">شروع تمرکز</span>
          </button>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e4e4e7;
          border-radius: 8px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d4d4d8;
        }
      `}</style>
    </div>
  );
}

// --- Minimalist Sub-Components ---

function MetricCard({ icon, iconBg, title, value, unit, trend }: any) {
  return (
    <div className="bg-white border border-zinc-100 p-6 rounded-[24px] transition-all duration-300 hover:shadow-md group">
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg} transition-transform group-hover:scale-105`}
        >
          {icon}
        </div>
        <div className="px-2.5 py-1.5 bg-zinc-50 rounded-full border border-zinc-100 flex items-center gap-1.5">
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[11px] font-bold text-zinc-600">{trend}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-zinc-500 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black tracking-tight text-zinc-900">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-bold text-zinc-400">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskItem({
  title,
  subtitle,
  type,
}: {
  title: string;
  subtitle: string;
  type: "urgent" | "meeting" | "routine";
}) {
  const styles = {
    urgent: { border: "border-rose-100", dot: "bg-rose-500", shadow: "shadow-rose-500/40", hoverBtn: "text-rose-500 hover:bg-rose-50" },
    meeting: { border: "border-indigo-100", dot: "bg-indigo-500", shadow: "shadow-indigo-500/40", hoverBtn: "text-indigo-500 hover:bg-indigo-50" },
    routine: { border: "border-zinc-200", dot: "bg-zinc-400", shadow: "shadow-zinc-400/40", hoverBtn: "text-zinc-600 hover:bg-zinc-100" },
  };

  return (
    <div
      className={`group p-4 rounded-2xl border bg-white flex items-center justify-between transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer ${styles[type].border}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${styles[type].dot} shadow-[0_0_6px_currentColor]`}
        />
        <div>
          <p className="text-sm font-bold text-zinc-800">{title}</p>
          <div className="flex items-center gap-1.5 mt-1 text-zinc-500">
            {type === "meeting" ? (
              <Calendar className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <span className="text-[11px] font-semibold">{subtitle}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Action Button */}
      <button className={`opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl ${styles[type].hoverBtn}`}>
        <Check className="w-4 h-4" />
      </button>
    </div>
  );
}