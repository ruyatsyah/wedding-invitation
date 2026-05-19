'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-50 rounded-full filter blur-[120px] opacity-60 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-50 rounded-full filter blur-[100px] opacity-50 translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* ── Left ── */}
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#8e1b42] bg-rose-50 border border-rose-100 px-4 py-2 rounded-full uppercase tracking-widest">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
            </span>
            Platform Undangan Pernikahan Digital
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Undangan Pernikahan{' '}
              <span className="relative text-[#8e1b42]">
                Digital
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C50 2 150 2 198 6" stroke="#f9a8bf" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>{' '}
              yang Elegan
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-light">
              Bagikan hari bahagia Anda dengan undangan online yang indah, interaktif, dan mudah disebarkan ke ribuan tamu melalui WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="px-7 py-3.5 bg-[#8e1b42] hover:bg-[#731433] text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-900/15 hover:shadow-rose-900/25 transform hover:-translate-y-0.5 transition-all">
              Buat Undangan Gratis →
            </Link>
            <button onClick={() => scrollTo('tema')} className="px-7 py-3.5 bg-white text-slate-700 text-sm font-semibold border border-slate-200 rounded-xl hover:border-rose-200 hover:bg-rose-50/50 transform hover:-translate-y-0.5 transition-all">
              Lihat Desain Tema
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 pt-4 border-t border-slate-100">
            {[
              { num: '100K+', label: 'Undangan Dibuat' },
              { num: '2M+',   label: 'Tamu RSVP' },
              { num: '4.9',   label: 'Rating Bintang' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-2xl font-extrabold text-slate-800">{num}</p>
                <p className="text-xs text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Phone Mockup ── */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Decorative ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full border border-rose-100 opacity-60" />
            <div className="absolute w-96 h-96 rounded-full border border-rose-50 opacity-40" />
          </div>

          {/* Phone */}
          <div className="relative w-[280px] h-[560px] bg-slate-900 rounded-[40px] p-2.5 shadow-2xl border-4 border-slate-800/70">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-2xl z-20" />
            {/* Screen */}
            <div className="w-full h-full bg-[#FCF8F9] rounded-[32px] overflow-hidden flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <p className="text-[9px] uppercase tracking-[0.3em] text-rose-500 font-bold">The Wedding of</p>
                <h2 className="text-4xl font-serif italic text-rose-800">Rian &amp; Rina</h2>
                <div className="w-8 h-px bg-rose-200 mx-auto" />
                <p className="text-[9px] text-slate-400 tracking-widest font-mono">25 · 07 · 2026</p>
              </div>
              <div className="p-4 space-y-3 bg-white border-t border-rose-50">
                <div className="bg-rose-50 rounded-xl p-3.5">
                  <p className="text-[9px] text-slate-400 mb-1">Kepada Yth:</p>
                  <p className="text-sm font-bold text-rose-900">Bapak Budi Santoso</p>
                </div>
                <div className="w-full py-3 bg-[#8e1b42] rounded-xl text-center text-white text-xs font-semibold shadow-md">
                  ✉️ Buka Undangan
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-8 top-1/3 bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
            <span className="text-xl">💌</span>
            <div>
              <p className="text-[10px] font-bold text-slate-800">Auto WA Blast</p>
              <p className="text-[9px] text-slate-400">Kirim ke semua tamu</p>
            </div>
          </div>
          <div className="absolute -right-6 bottom-1/3 bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-[10px] font-bold text-slate-800">RSVP Real-time</p>
              <p className="text-[9px] text-slate-400">Pantau kehadiran</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
