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

const studyData = [
  { day: "ش", value: 45 },
  { day: "ی", value: 60 },
  { day: "د", value: 35 },
  { day: "س", value: 80 },
  { day: "چ", value: 55 },
  { day: "پ", value: 90 },
  { day: "ج", value: 75 },
];

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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={studyData}
          margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
          barSize={32}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f4f4f5"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: "bold" }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: "bold" }}
            dx={-10}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f4f4f5"}}
          />

          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {studyData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 5 ? "#4f46e5" : "#e4e4e7"}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
