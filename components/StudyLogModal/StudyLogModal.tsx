"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Plus, Star, Check } from "lucide-react";

interface StudyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
}

export default function StudyLogModal({ isOpen, onClose, selectedDate = "امروز" }: StudyLogModalProps) {
  const [difficulty, setDifficulty] = useState<number>(3);
  const [focusQuality, setFocusQuality] = useState<"low" | "medium" | "high">("medium");
  const [understanding, setUnderstanding] = useState<"unclear" | "moderate" | "clear">("moderate");
  const [timePeriods, setTimePeriods] = useState([{ id: 1 }]);

  if (!isOpen) return null;

  const addTimePeriod = () => {
    setTimePeriods([...timePeriods, { id: timePeriods.length + 1 }]);
  };

  return (
    <div dir="rtl" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* هدر */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
          <div>
            <h2 className="text-xl font-black text-zinc-900">ثبت گزارش مطالعه جدید</h2>
            <p className="text-sm font-medium text-zinc-500 mt-1">جزئیات جلسه مطالعاتی خود را وارد کنید</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* محتوای فرم */}
        <div className="p-8 overflow-y-auto flex flex-col gap-8">
          
          {/* ردیف اول: تاریخ و درس */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">تاریخ</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Calendar className="w-5 h-5 text-zinc-400" />
                </div>
                <input 
                  type="text" 
                  defaultValue={selectedDate}
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block py-3.5 pr-12 pl-4 outline-none transition-all"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">درس</label>
              <select className="w-full bg-white border border-zinc-200 text-zinc-800 text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block py-3.5 px-4 outline-none transition-all appearance-none cursor-pointer">
                <option value="">انتخاب درس...</option>
                <option value="math">ریاضیات گسسته</option>
                <option value="physics">فیزیک ۳</option>
                <option value="network">تجهیزات شبکه</option>
              </select>
            </div>
          </div>

          {/* ردیف دوم: بازه‌های زمانی */}
          <div className="border border-zinc-100 rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-800">بازه‌های زمانی مطالعه</h3>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-4 px-2 text-xs font-bold text-zinc-400">
                <div>زمان شروع</div>
                <div>زمان پایان</div>
                <div>مدت (دقیقه)</div>
                <div>نوع فعالیت</div>
              </div>

              {timePeriods.map((period, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center group">
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input type="time" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pr-9 pl-3 text-sm outline-none focus:border-indigo-500 transition-colors" defaultValue="09:00" />
                  </div>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input type="time" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 pr-9 pl-3 text-sm outline-none focus:border-indigo-500 transition-colors" defaultValue="10:30" />
                  </div>
                  <div>
                    <input type="number" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3 text-sm text-center outline-none focus:border-indigo-500 transition-colors" placeholder="مثلا ۹۰" defaultValue="90" />
                  </div>
                  <div>
                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-3 text-sm outline-none focus:border-indigo-500 transition-colors">
                      <option>مطالعه عمیق</option>
                      <option>حل تمرین و تست</option>
                      <option>مرور و خلاصه‌نویسی</option>
                    </select>
                  </div>
                </div>
              ))}

              <button 
                onClick={addTimePeriod}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-zinc-200 rounded-xl text-indigo-600 text-sm font-bold hover:bg-indigo-50 hover:border-indigo-200 transition-all"
              >
                <Plus className="w-4 h-4" />
                افزودن بازه زمانی جدید
              </button>
            </div>
          </div>

          {/* ردیف سوم: شاخص‌های ارزیابی */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-3">میزان سختی درس</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setDifficulty(star)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star className={`w-6 h-6 ${difficulty >= star ? 'fill-orange-400 text-orange-400' : 'fill-transparent text-zinc-300'}`} />
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold text-zinc-400 mt-2 px-1">
                <span>بسیار آسان</span>
                <span>بسیار سخت</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-3">کیفیت تمرکز</label>
              <div className="flex bg-zinc-200/50 p-1 rounded-xl">
                <button onClick={() => setFocusQuality('low')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${focusQuality === 'low' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>پایین</button>
                <button onClick={() => setFocusQuality('medium')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${focusQuality === 'medium' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>متوسط</button>
                <button onClick={() => setFocusQuality('high')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${focusQuality === 'high' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>بالا</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-3">میزان درک مطلب</label>
              <div className="flex bg-zinc-200/50 p-1 rounded-xl">
                <button onClick={() => setUnderstanding('unclear')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${understanding === 'unclear' ? 'bg-white text-rose-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>مبهم</button>
                <button onClick={() => setUnderstanding('moderate')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${understanding === 'moderate' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>متوسط</button>
                <button onClick={() => setUnderstanding('clear')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${understanding === 'clear' ? 'bg-white text-emerald-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>واضح</button>
              </div>
            </div>
          </div>

          {/* ردیف چهارم: بازخورد */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">خلاصه جلسه</label>
              <textarea 
                className="w-full bg-white border border-zinc-200 rounded-2xl p-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all min-h-[120px] resize-none"
                placeholder="مباحثی که مطالعه کردید را به صورت خلاصه بنویسید..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">گزارش اشکالات و تست‌های غلط</label>
              <textarea 
                className="w-full bg-white border border-zinc-200 rounded-2xl p-4 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-50 transition-all min-h-[120px] resize-none"
                placeholder="اشتباهات مفهومی، مباحث فراموش شده یا تست‌هایی که نیاز به مرور دارند را اینجا بنویسید..."
              />
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-100 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
          >
            انصراف
          </button>
          <button className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200/50 rounded-xl transition-all">
            <Check className="w-4 h-4" />
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
}