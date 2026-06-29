import {
  Bell,
  Search,
  ChevronDown,
  BookOpen,
  Menu,
  LayoutGrid,
  Library,
  Timer,
  Layers,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ onMenuToggle }) {
  const [onAccessMenu, setOnAccessMenu] = useState(false);
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-white px-4 sm:px-8 border-b border-gray-100"
    >
      {/* بخش راست: منوی موبایل، لوگو و عنوان سامانه */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* دکمه همبرگری منو - فقط در موبایل و تبلت */}
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 md:hidden transition-colors"
        >
          <Menu className="h-5 w-5 stroke-[1.5]" />
        </button>

        {/* آیکون برنامه */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50/80 border border-indigo-100/40 text-indigo-600 shadow-sm shadow-indigo-100/10">
          <BookOpen className="h-5 w-5 stroke-[1.5]" />
        </div>

        {/* عناوین متنی */}
        <div className="md:flex flex-col hidden">
          <h1 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
            داشبورد مطالعاتی
          </h1>
          <span className="text-[10px] sm:text-xs font-semibold text-indigo-600/90 mt-0.5">
            نمای دانش‌آموز
          </span>
        </div>
      </div>

      {/* بخش چپ: جستجو، منوی گوگل/لینکدینی، اعلان‌ها و پروفایل */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* نوار جستجو در سمت چپ (فقط در دسکتاپ لپ‌تاپ به بالا lg) */}
        <div className="hidden lg:flex items-center justify-center relative w-64 xl:w-90 ml-2 px-3 py-2.5 bg-[#F6F8FA] gap-3 rounded-xl">
          <Search className="h-4 w-4 text-gray-400 stroke-[1.5]" />
          <input
            type="text"
            placeholder="جستجو در دروس و گزارش‌ها..."
            className="w-full text-xs text-gray-900 placeholder:text-gray-400 border border-transparent transition-all focus:outline-none"
          />
        </div>

        {/* آیکون جستجوی سریع فقط برای نمایشگرهای کوچک */}
        <button className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 transition-colors">
          <Search className="h-5 w-5 stroke-[1.5]" />
        </button>

        {/* منوی شبکه‌ای مشابه گوگل و لینکدین (App Launcher) */}
        <div className="relative group select-none">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
            onClick={() => setOnAccessMenu((prev) => !prev)}
          >
            <LayoutGrid className="h-5 w-5 stroke-[1.5]" />
          </button>
          <AnimatePresence>
            {onAccessMenu && (
              <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              
                className="absolute left-0 top-full z-50 mt-2 w-72 origin-top-left pointer-events-none rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/50"
              >
                <div className="mb-3 border-b border-gray-50 pb-2">
                  <h3 className="text-xs font-bold text-gray-950">
                    ابزارها و کتابخانه‌ها
                  </h3>
                </div>

                {/* گرید ۲ در ۲ برای برنامه‌ها */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="#library"
                    className="flex flex-col items-center justify-center rounded-xl border border-gray-50 bg-gray-50/30 p-3 text-center transition-all hover:border-indigo-100 hover:bg-indigo-50/30 group/item"
                  >
                    <Library className="h-5 w-5 text-indigo-500 stroke-[1.5] group-hover/item:scale-110 transition-transform" />
                    <span className="mt-2 text-xs font-medium text-gray-700">
                      کتابخانه دیجیتال
                    </span>
                  </a>
                  <a
                    href="#leitner"
                    className="flex flex-col items-center justify-center rounded-xl border border-gray-50 bg-gray-50/30 p-3 text-center transition-all hover:border-emerald-100 hover:bg-emerald-50/30 group/item"
                  >
                    <Layers className="h-5 w-5 text-emerald-500 stroke-[1.5] group-hover/item:scale-110 transition-transform" />
                    <span className="mt-2 text-xs font-medium text-gray-700">
                      جعبه لایتنر
                    </span>
                  </a>
                  <a
                    href="#pomodoro"
                    className="flex flex-col items-center justify-center rounded-xl border border-gray-50 bg-gray-50/30 p-3 text-center transition-all hover:border-rose-100 hover:bg-rose-50/30 group/item"
                  >
                    <Timer className="h-5 w-5 text-rose-500 stroke-[1.5] group-hover/item:scale-110 transition-transform" />
                    <span className="mt-2 text-xs font-medium text-gray-700">
                      تایمر پومودورو
                    </span>
                  </a>
                  <a
                    href="#exams"
                    className="flex flex-col items-center justify-center rounded-xl border border-gray-50 bg-gray-50/30 p-3 text-center transition-all hover:border-amber-100 hover:bg-amber-50/30 group/item"
                  >
                    <GraduationCap className="h-5 w-5 text-amber-500 stroke-[1.5] group-hover/item:scale-110 transition-transform" />
                    <span className="mt-2 text-xs font-medium text-gray-700">
                      بانک آزمون
                    </span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* دکمه اعلان‌ها */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50 hover:text-indigo-600">
          <Bell className="h-5 w-5 stroke-[1.5]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse"></span>
        </button>

        {/* خط جداکننده عمودی */}
        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* منوی بازشوی پروفایل کاربری */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              آریا رضایی
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 mt-0.5">
              پایه دوازدهم
            </span>
          </div>

          <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-50 group-hover:ring-4 group-hover:ring-indigo-50 group-hover:border-indigo-200 transition-all duration-200">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aria&backgroundColor=f9fafb"
              alt="پروفایل کاربری"
              className="h-full w-full object-cover"
            />
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-y-0.5 group-hover:text-gray-600" />
        </div>
      </div>
    </header>
  );
}
