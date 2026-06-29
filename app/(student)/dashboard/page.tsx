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
      {/* Model 2: Ultra-Minimalist Typography */}
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

      {/* Complex Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-7 bg-white rounded-3xl">
          <StudyChart />

        </div>

        {/* Upcoming Tasks & Counselor Notes */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-7 shadow-sm flex flex-col h-[400px]">
          <h2 className="text-lg font-bold text-zinc-900 mb-6">اقدامات فوری</h2>

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
    <div className="bg-white border border-zinc-100 p-6 rounded-[24px] transition-all duration-300 group">
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
    urgent: { border: "border-rose-100", dot: "bg-rose-500" },
    meeting: { border: "border-indigo-100", dot: "bg-indigo-500" },
    routine: { border: "border-zinc-100", dot: "bg-zinc-400" },
  };

  return (
    <div
      className={`p-4 rounded-2xl border bg-white flex items-start gap-4 transition-colors hover:bg-zinc-50 ${styles[type].border}`}
    >
      <div
        className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${styles[type].dot}`}
      />
      <div>
        <p className="text-sm font-bold text-zinc-800">{title}</p>
        <div className="flex items-center gap-1.5 mt-1.5 text-zinc-500">
          {type === "meeting" ? (
            <Calendar className="w-3 h-3" />
          ) : (
            <CheckCircle2 className="w-3 h-3" />
          )}
          <span className="text-xs font-semibold">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
