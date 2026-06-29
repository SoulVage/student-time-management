"use client";

import React, { useState } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  BookOpen 
} from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
}

export default function AiAssistantPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "سلام! من دستیار هوشمند تحصیلی شما هستم. چطور می‌تونم امروز بهت کمک کنم؟ می‌تونی درباره نمرات، برنامه‌ریزی درسی یا تحلیل آزمون‌هات ازم بپرسی.",
    }
  ]);

  const suggestedPrompts = [
    "خلاصه مطالعه هفته گذشته",
    "تحلیل نقاط ضعف آزمون جامع",
    "ساخت فلش‌کارت مرور لغات",
    "برنامه‌ریزی برای هفته آینده",
    "تمرکز روی تمرین‌های ریاضی"
  ];

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), type: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    setTimeout(() => {
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "درحال تحلیل اطلاعات شما... این یک پیام آزمایشی برای جایگزینی با هوش مصنوعی واقعی است.",
      };
      setMessages((prev) => [...prev, newBotMsg]);
    }, 1000);
  };

  return (
    <div className="p-6 h-[calc(100vh-80px)] flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto" dir="rtl">
      <div className="flex-1 flex flex-col bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="h-16 px-6 border-b border-zinc-100 flex items-center gap-3 bg-zinc-50/50">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-zinc-800">دستیار هوشمند تحصیلی</h1>
            <p className="text-xs text-zinc-500 mt-0.5">پاسخگویی سریع بر اساس داده‌های شما</p>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 bg-zinc-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-[80%] ${msg.type === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.type === "bot" ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-zinc-200 text-zinc-600"
              }`}>
                {msg.type === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.type === "user" 
                  ? "bg-zinc-800 text-white rounded-tl-sm shadow-sm" 
                  : "bg-white border border-zinc-100 text-zinc-700 rounded-tr-sm shadow-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 bg-white border-t border-zinc-100 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <span className="text-xs font-bold text-zinc-400 ml-2">پیشنهادها:</span>
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt)}
              className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-zinc-100">
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:bg-white transition-all shadow-inner">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="سوالت رو اینجا بپرس..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-zinc-800 placeholder:text-zinc-400"
            />
            <button 
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors shadow-md shadow-indigo-200 shrink-0"
            >
              <Send className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[320px] bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 flex flex-col gap-8 overflow-y-auto">
        
        <div>
          <h2 className="text-lg font-black text-zinc-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            تحلیل عملکرد من
          </h2>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-zinc-500 mb-3">پیشرفت اخیر</h3>
            <div className="h-24 rounded-xl bg-gradient-to-t from-indigo-50/50 to-transparent border-b-2 border-indigo-500 flex items-end justify-between px-2 pb-1 relative">
               {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                  <div key={i} className="w-2 bg-indigo-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-zinc-500 mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" /> توزیع زمان مطالعه
            </h3>
            <div className="flex items-end gap-2 h-24">
              {['ریاضی', 'فیزیک', 'شیمی', 'زبان', 'عمومی'].map((subject, i) => {
                const height = [80, 60, 40, 90, 50][i];
                return (
                  <div key={subject} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-zinc-100 rounded-md overflow-hidden flex flex-col justify-end h-full">
                      <div className="w-full bg-orange-400 rounded-md transition-all hover:bg-orange-500" style={{ height: `${height}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400">{subject}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div>
              <h3 className="text-xs font-bold text-zinc-500 mb-1 flex items-center gap-1.5">
                <PieChart className="w-4 h-4" /> تکمیل دروس
              </h3>
              <p className="text-2xl font-black text-zinc-800">۷۸٪</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-zinc-200 border-t-emerald-500 border-r-emerald-500 transform rotate-45 shadow-sm"></div>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100">
          <div className="p-3 bg-indigo-50 rounded-xl text-center">
            <span className="block text-[10px] font-bold text-indigo-400 mb-1">میانگین نمرات</span>
            <span className="block text-lg font-black text-indigo-700">۱۸.۵</span>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl text-center">
            <span className="block text-[10px] font-bold text-orange-400 mb-1">ساعات مطالعه</span>
            <span className="block text-lg font-black text-orange-700">۴۲ <span className="text-xs">ساعت</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}