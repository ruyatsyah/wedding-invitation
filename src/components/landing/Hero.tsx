import React from 'react';
import Link from 'next/link';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative pt-32 pb-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/50 via-rose-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-rose-700 text-xs font-semibold uppercase tracking-wider animate-bounce">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Platform Undangan Pernikahan Digital #1
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 leading-[1.1] tracking-tight">
            Bagikan Hari Bahagia dengan <span className="text-[#8e1b42] relative inline-block">Undangan Digital<span className="absolute bottom-1 left-0 w-full h-2 bg-rose-200 -z-10 rounded-full"></span></span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Buat undangan pernikahan online yang elegan, responsif, dan interaktif dalam hitungan menit. Kirim ke ribuan tamu dengan mudah via WhatsApp otomatis.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/admin"
              className="px-8 py-4 bg-[#8e1b42] hover:bg-[#731433] text-white rounded-xl font-bold shadow-lg shadow-pink-900/10 hover:shadow-pink-900/20 transform hover:-translate-y-0.5 transition-all text-center cursor-pointer"
            >
              Buat Undangan Sekarang 💍
            </Link>
            <button
              onClick={() => scrollToSection('tema')}
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transform hover:-translate-y-0.5 transition-all shadow-sm text-center cursor-pointer"
            >
              Lihat Desain Tema
            </button>
          </div>

          {/* Real-time stats */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-extrabold text-slate-800">100k+</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Undangan Dibuat</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800">2M+</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Tamu RSVP</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-800">4.9/5</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Rating Kepuasan</p>
            </div>
          </div>
        </div>

        {/* Right Phone Mockup illustration */}
        <div className="relative flex justify-center z-10 lg:pl-10">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-pink-200/40 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-rose-200/30 rounded-full filter blur-3xl -z-10"></div>
          
          {/* Mockup Container */}
          <div className="relative w-[310px] h-[620px] bg-slate-900 rounded-[42px] p-3 shadow-2xl border-4 border-slate-800/80">
            {/* Phone Speaker & Camera Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-32 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Screen */}
            <div className="w-full h-full bg-[#FCF8F9] rounded-[32px] overflow-hidden flex flex-col justify-between p-6 text-center relative">
              <div className="my-auto space-y-4">
                <span className="text-rose-500 text-2xl font-serif">♥</span>
                <p className="text-[10px] uppercase tracking-[0.25em] text-rose-600 font-bold">The Wedding of</p>
                <h2 className="text-3xl font-serif text-rose-800 italic">Rian & Rina</h2>
                <div className="w-12 h-[1px] bg-rose-300 mx-auto my-2"></div>
                <p className="text-[10px] text-slate-500 font-semibold tracking-widest font-mono">25 JULI 2026</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/95 p-4 rounded-2xl border border-rose-100 shadow-sm">
                  <p className="text-[9px] text-slate-400">Kepada Yth:</p>
                  <p className="text-sm font-bold text-rose-900 mt-0.5">Bapak Budi Santoso</p>
                </div>
                <div className="w-full py-3 bg-[#8e1b42] text-white rounded-xl text-xs font-semibold shadow-md shadow-pink-900/10">
                  ✉️ Buka Undangan
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge items */}
          <div className="absolute -left-6 top-1/4 bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
            <span className="text-lg">💌</span>
            <div>
              <p className="text-[10px] font-bold text-slate-800">Kirim Otomatis</p>
              <p className="text-[8px] text-slate-400">via WhatsApp API</p>
            </div>
          </div>

          <div className="absolute -right-8 bottom-1/4 bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '6s' }}>
            <span className="text-lg">🎵</span>
            <div>
              <p className="text-[10px] font-bold text-slate-800">Custom Backsound</p>
              <p className="text-[8px] text-slate-400">Pilih lagu favorit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
