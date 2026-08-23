"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  BookOpen,
  MonitorPlay,
  PenTool,
  Coffee,
  CalendarDays,
} from "lucide-react";

type Category = "study" | "class" | "homework" | "rest";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  time?: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "مرور لغات زبان انگلیسی (درس ۳)",
    completed: true,
    category: "study",
    time: "۰۸:۰۰ - ۰۹:۰۰",
  },
  {
    id: "2",
    title: "کلاس آنلاین فیزیک",
    completed: false,
    category: "class",
    time: "۱۰:۳۰ - ۱۲:۰۰",
  },
  {
    id: "3",
    title: "حل ۲۰ تست ریاضی",
    completed: false,
    category: "homework",
  },
  {
    id: "4",
    title: "استراحت و ناهار",
    completed: false,
    category: "rest",
    time: "۱۳:۰۰ - ۱۴:۰۰",
  },
];

export default function DailyRoutinePage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<Category>("study");

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      category: newTaskCategory,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const categoryConfig = {
    study: {
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      label: "مطالعه",
    },
    class: {
      icon: MonitorPlay,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      label: "کلاس",
    },
    homework: {
      icon: PenTool,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      label: "تکلیف",
    },
    rest: {
      icon: Coffee,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      label: "استراحت",
    },
  };

  const todayDate = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  // آیکون هدف (بدون گرادینت)
  const TargetIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-orange-500"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );

  return (
    <div
      dir="rtl"
      className="w-full p-6"
      style={{ background: "transparent" }} // پس‌زمینه کلی رو از والد بگیره
    >
      {/* === هدر شیشه‌ای (تمام عرض) === */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 p-6 md:p-8 rounded-[28px] bg-white/70 backdrop-blur-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-800 flex items-center gap-3">
            برنامه امروز من
            <TargetIcon />
          </h1>
          <p className="text-zinc-500 font-medium flex items-center gap-2 mt-2">
            <CalendarDays className="w-4 h-4" />
            {todayDate}
          </p>
        </div>

        {/* نوار پیشرفت (شیشه‌ای، بدون سایه/بوردر/گرادینت) */}
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-lg p-4 rounded-2xl w-full md:w-auto min-w-[220px]">
          <div className="flex-1">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-zinc-500">پیشرفت امروز</span>
              <span className="text-orange-600">{progressPercentage}٪</span>
            </div>
            <div className="h-2.5 w-full bg-white/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* === فرم افزودن تسک (شیشه‌ای) === */}
      <form
        onSubmit={addTask}
        className="flex flex-col md:flex-row gap-3 mb-8 p-5 md:p-6 rounded-[24px] bg-white/60 backdrop-blur-xl"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="امروز چه برنامه‌ای داری؟ (مثلا: مرور فصل ۲ فیزیک)"
            className="w-full bg-white/70 backdrop-blur-md text-zinc-800 rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-zinc-400 focus:bg-white/90 focus:ring-2 focus:ring-orange-500/50"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value as Category)}
            className="bg-white/70 backdrop-blur-md text-zinc-700 text-sm font-medium rounded-2xl px-4 py-4 outline-none cursor-pointer focus:ring-2 focus:ring-orange-500/50"
          >
            <option value="study">📖 مطالعه</option>
            <option value="homework">📝 تکلیف و تست</option>
            <option value="class">💻 کلاس</option>
            <option value="rest">☕ استراحت</option>
          </select>

          <button
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">افزودن</span>
          </button>
        </div>
      </form>

      {/* === لیست وظایف (شیشه‌ای) === */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[28px] overflow-hidden">
        <div className="px-6 py-4 bg-white/40 backdrop-blur-md">
          <h2 className="text-sm font-bold text-zinc-600">
            لیست وظایف ({tasks.filter((t) => !t.completed).length} کار باقیمانده)
          </h2>
        </div>

        {tasks.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <span className="text-6xl mb-4">✨</span>
            <h3 className="text-lg font-bold text-zinc-700 mb-1">
              امروزت رو بساز!
            </h3>
            <p className="text-zinc-500 text-sm">
              هنوز هیچ برنامه‌ای برای امروز ثبت نکردی.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {tasks.map((task, index) => {
              const CatIcon = categoryConfig[task.category].icon;
              return (
                <div
                  key={task.id}
                  className={`group flex items-center justify-between p-4 px-6 transition-all hover:bg-white/50 ${
                    task.completed ? "opacity-60 bg-white/30" : ""
                  } ${index !== tasks.length - 1 ? "border-b border-white/30" : ""}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`shrink-0 transition-colors ${
                        task.completed
                          ? "text-emerald-500"
                          : "text-zinc-300 hover:text-orange-500"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-[15px] font-bold transition-all ${
                          task.completed
                            ? "line-through text-zinc-500"
                            : "text-zinc-800"
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.time && (
                        <span className="text-xs font-medium text-zinc-400 tracking-wide">
                          {task.time}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${categoryConfig[task.category].bg} ${categoryConfig[task.category].color}`}
                    >
                      <CatIcon className="w-3.5 h-3.5" />
                      {categoryConfig[task.category].label}
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-zinc-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}