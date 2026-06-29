"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// داده‌های نمودار با همان مقادیر قبلی
const studyData = [
  { day: "ش", value: 45 },
  { day: "ی", value: 60 },
  { day: "د", value: 35 },
  { day: "س", value: 80 },
  { day: "چ", value: 55 },
  { day: "پ", value: 90 }, // بیشترین مقدار (ایندکس ۵)
  { day: "ج", value: 75 },
];

// کامپوننت کاستوم برای Tooltip که با دیزاین سیستم شما هم‌خوانی داشته باشد
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 border border-zinc-100 rounded-xl shadow-lg shadow-zinc-200/50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-600" />
        <p className="text-sm font-black text-zinc-800">
          {payload[0].value}{" "}
          <span className="text-xs text-zinc-500 font-semibold">دقیقه</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function StudyChart() {
  return (
    <div className="h-60 w-full mt-4" dir="ltr">
      {/* دایرکشن LTR برای چارت‌ها بهتر کار می‌کند چون 
        محور مختصات به صورت استاندارد از چپ به راست رسم می‌شود 
      */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={studyData}
          margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
          barSize={32} // عرض ستون‌ها
        >
          {/* خطوط پس‌زمینه مینیمال */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f4f4f5" // zinc-100
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: "bold" }} // zinc-400
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: "bold" }} // zinc-400
            dx={-10}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f4f4f5", radius: [8, 8, 0, 0] }} // بک‌گراند هاور با گوشه‌های گرد
          />

          {/* مقادیر ستون‌ها */}
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {studyData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // اعمال رنگ اختصاصی برای ایندکس ۵ (روز پنج‌شنبه)
                fill={index === 5 ? "#4f46e5" : "#e4e4e7"} // indigo-600 vs zinc-200
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
