"use client";

import React from "react";
import { Code2, GraduationCap, Laptop, Sparkles, Terminal } from "lucide-react";

export default function InformationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] overflow-y-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
          <Code2 className="w-8 h-8 text-indigo-600" />
          درباره سازندگان
        </h1>
        <p className="text-zinc-500 mt-2 font-medium">اطلاعات توسعه‌دهندگان و تکنولوژی‌های پروژه</p>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
               <h2 className="text-2xl font-black mb-3 flex items-center gap-2">
                 <Sparkles className="w-6 h-6 text-indigo-400" />
                 داستان این پروژه
               </h2>
               <p className="text-indigo-100/90 leading-relaxed text-sm md:text-base font-medium max-w-2xl">
                 این سیستم با هدف هوشمندسازی، تحلیل عملکرد و مدیریت بهتر برنامه‌های تحصیلی دانش‌آموزان توسعه داده شده است. ما به عنوان توسعه‌دهندگان فول‌استک، تلاش کردیم تا با استفاده از جدیدترین تکنولوژی‌های وب، یک تجربه کاربری سریع، پایدار و جذاب را خلق کنیم.
               </p>
            </div>
        </div>

        <div className="p-8 md:p-10">
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-800 text-lg">امیررضا قاسم‌پور</h3>
                <p className="text-xs font-bold text-zinc-500 mt-1">توسعه‌دهنده فول‌استک</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-800 text-lg">امیرمحمد آذربهرام</h3>
                <p className="text-xs font-bold text-zinc-500 mt-1">توسعه‌دهنده فول‌استک</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-5 py-3 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-bold border border-zinc-200">
              <GraduationCap className="w-5 h-5 text-zinc-500" />
              دانش‌آموزان پایه یازدهم شبکه و نرم‌افزار - هنرستان فناوران
            </div>
            
            <div className="flex items-center gap-2 px-5 py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-zinc-900/20 border border-zinc-800">
              <Code2 className="w-5 h-5 text-zinc-400" />
              توسعه یافته با Next.js
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}