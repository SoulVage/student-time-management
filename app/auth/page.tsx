"use client";

import React, { useState } from "react";
import { Lock, User, BookOpen, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // اینجا لاجیک اتصال به بک‌اند یا API رو قرار میدی
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-zinc-100 p-6" dir="rtl">
      {/* کارت اصلی لاگین */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-zinc-100 w-full max-w-md">
        
        {/* هدر بخش لاگین */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900">سامانه دانش‌آموزی</h1>
          <p className="text-zinc-500 font-medium mt-2 text-sm">به حساب کاربری خود وارد شوید</p>
        </div>

        {/* فرم ورود */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* فیلد نام کاربری */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 mr-1">نام کاربری (کد ملی/دانش‌آموزی)</label>
            <div className="relative flex items-center">
              <User className="absolute right-4 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثال: 123456789"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pr-12 pl-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* فیلد رمز عبور */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 mr-1">رمز عبور</label>
            <div className="relative flex items-center">
              <Lock className="absolute right-4 w-5 h-5 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pr-12 pl-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* دکمه ورود */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 mt-2"
          >
            ورود به داشبورد
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* فوتر کوچک */}
        <p className="text-center text-zinc-400 text-[10px] mt-8">
          طراحی و توسعه توسط تیم فنی هنرستان فناوران
        </p>
      </div>
    </div>
  );
}