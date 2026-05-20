'use client';

import React from 'react';
import Link from 'next/link';

const HERO_IMAGES = [
  '/assets/landing/hero-1.png',
  '/assets/landing/hero-2.png',
  '/assets/landing/hero-3.png',
  '/assets/landing/hero-4.png',
  '/assets/landing/hero.png',
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500); // changes every 4.5s
    return () => clearInterval(interval);
  }, []);

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
        <div className="relative flex justify-center w-full">
          {/* Wrapper for phone and floating badges */}
          <div className="relative w-[280px] h-[560px]">
            {/* Decorative ring (Centered behind the phone mockup) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="absolute w-[380px] h-[380px] rounded-full border border-rose-200/80" />
              <div className="absolute w-[480px] h-[480px] rounded-full border border-rose-100" />
            </div>

            {/* Phone */}
            <div className="absolute inset-0 bg-slate-900 rounded-[40px] p-2.5 shadow-2xl border-4 border-slate-800/70">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-2xl z-20" />
              {/* Screen */}
              <div className="relative w-full h-full rounded-[32px] overflow-hidden flex flex-col justify-end">
                {/* Background image carousel with smooth cross-fade */}
                {HERO_IMAGES.map((imgSrc, idx) => (
                  <img
                    key={imgSrc}
                    src={imgSrc}
                    alt={`Kabar Bahagia Preview ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      idx === currentIdx ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                
                {/* Soft overlay to ensure text readability */}
                <div className="absolute inset-0 bg-slate-950/15" />
                
                {/* Bottom Section (Only Button) */}
                <div className="p-4 z-10 relative">
                  <div className="w-full py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Buka Undangan
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges (Responsive positions: -left-10/top-24 on mobile, -left-32/top-1/3 on desktop) */}
            <div className="absolute -left-10 top-24 lg:-left-32 lg:top-1/3 bg-white border border-slate-100 rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 shadow-xl flex items-center gap-2 lg:gap-3 z-30">
              <span className="text-lg lg:text-xl">💌</span>
              <div className="text-left">
                <p className="text-[9px] lg:text-[10px] font-bold text-slate-800">Auto WA Blast</p>
                <p className="text-[8px] lg:text-[9px] text-slate-400">Kirim ke semua tamu</p>
              </div>
            </div>
            <div className="absolute -right-10 bottom-24 lg:-right-32 lg:bottom-1/3 bg-white border border-slate-100 rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 shadow-xl flex items-center gap-2 lg:gap-3 z-30">
              <span className="text-xl lg:text-xl">✅</span>
              <div className="text-left">
                <p className="text-[9px] lg:text-[10px] font-bold text-slate-800">RSVP Real-time</p>
                <p className="text-[8px] lg:text-[9px] text-slate-400">Pantau kehadiran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
