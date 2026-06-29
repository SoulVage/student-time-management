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
  CalendarDays
} from "lucide-react";

// تایپ‌های مربوط به تسک‌ها
type Category = "study" | "class" | "homework" | "rest";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  time?: string;
}

// دیتای اولیه (برای اینکه صفحه خالی نباشد و ظاهرش را ببینی)
const initialTasks: Task[] = [
  { id: "1", title: "مرور لغات زبان انگلیسی (درس ۳)", completed: true, category: "study", time: "08:00 - 09:00" },
  { id: "2", title: "کلاس آنلاین فیزیک", completed: false, category: "class", time: "10:30 - 12:00" },
  { id: "3", title: "حل ۲۰ تست ریاضی", completed: false, category: "homework" },
  { id: "4", title: "استراحت و ناهار", completed: false, category: "rest", time: "13:00 - 14:00" },
];

export default function DailyRoutinePage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<Category>("study");

  // توابع مدیریت تسک‌ها
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
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

  // محاسبه پیشرفت
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // تنظیمات ظاهری دسته‌بندی‌ها
  const categoryConfig = {
    study: { icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50", label: "مطالعه" },
    class: { icon: MonitorPlay, color: "text-purple-500", bg: "bg-purple-50", label: "کلاس" },
    homework: { icon: PenTool, color: "text-orange-500", bg: "bg-orange-50", label: "تکلیف" },
    rest: { icon: Coffee, color: "text-emerald-500", bg: "bg-emerald-50", label: "استراحت" },
  };

  // دریافت تاریخ امروز (شمسی)
  const todayDate = new Intl.DateTimeFormat("fa-IR", { 
    weekday: "long", 
    day: "numeric", 
    month: "long" 
  }).format(new Date());

const TargetIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-4 md:p-8">
      
      {/* هدر صفحه و میزان پیشرفت */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-[24px] border border-zinc-100 shadow-sm">
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

        <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 w-full md:w-auto">
          <div className="flex-1 md:w-40 text-left">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-zinc-500">پیشرفت امروز</span>
              <span className="text-orange-600">{progressPercentage}٪</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-l from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* فرم افزودن تسک جدید */}
      <form onSubmit={addTask} className="flex flex-col md:flex-row gap-3 mb-10">
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="امروز چه برنامه‌ای داری؟ (مثلا: مرور فصل ۲ فیزیک)"
            className="w-full bg-white border border-zinc-200 text-zinc-800 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent py-4 px-6 outline-none transition-all shadow-sm"
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value as Category)}
            className="bg-white border border-zinc-200 text-zinc-700 text-sm font-medium rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none px-4 py-4 shadow-sm cursor-pointer"
          >
            <option value="study">📖 مطالعه</option>
            <option value="homework">📝 تکلیف و تست</option>
            <option value="class">💻 کلاس</option>
            <option value="rest">☕ استراحت</option>
          </select>
          
          <button 
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-orange-200/50"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">افزودن</span>
          </button>
        </div>
      </form>

      {/* لیست تسک‌ها */}
      <div className="bg-white rounded-[24px] border border-zinc-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-sm font-bold text-zinc-600">لیست وظایف ({tasks.filter(t => !t.completed).length} کار باقیمانده)</h2>
        </div>
        
        {tasks.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <span className="text-6xl mb-4">✨</span>
            <h3 className="text-lg font-bold text-zinc-700 mb-1">امروزت رو بساز!</h3>
            <p className="text-zinc-500 text-sm">هنوز هیچ برنامه‌ای برای امروز ثبت نکردی.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {tasks.map((task) => {
              const CatIcon = categoryConfig[task.category].icon;
              
              return (
                <div 
                  key={task.id} 
                  className={`group flex items-center justify-between p-4 px-6 border-b border-zinc-100 last:border-0 transition-all hover:bg-zinc-50 ${task.completed ? "opacity-60 bg-zinc-50/50" : ""}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* دکمه تیک زدن */}
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`shrink-0 transition-colors ${task.completed ? 'text-emerald-500' : 'text-zinc-300 hover:text-orange-500'}`}
                    >
                      {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </button>
                    
                    {/* اطلاعات تسک */}
                    <div className="flex flex-col gap-1">
                      <span className={`text-[15px] font-bold transition-all ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-800'}`}>
                        {task.title}
                      </span>
                      {task.time && (
                        <span className="text-xs font-medium text-zinc-400 font-sans tracking-wide">
                          {task.time}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* بج دسته‌بندی */}
                    <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${categoryConfig[task.category].bg} ${categoryConfig[task.category].color}`}>
                      <CatIcon className="w-3.5 h-3.5" />
                      {categoryConfig[task.category].label}
                    </div>

                    {/* دکمه حذف */}
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