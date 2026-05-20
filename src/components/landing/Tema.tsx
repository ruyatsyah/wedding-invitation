'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Detailed themes configured for Snap Foto, Sunda, Jawa, and Manado
const THEMES = [
  {
    id: 'snapfoto',
    name: 'Snap Foto',
    category: 'Modern',
    accentColor: '#1e293b',
    previewUrl: '/preview/snapfoto',
    useUrl: '/admin?theme=snapfoto',
  },
  {
    id: 'sunda',
    name: 'Sunda',
    category: 'Floral',
    accentColor: '#5a7350',
    previewUrl: '/preview/sunda',
    useUrl: '/admin?theme=sunda',
  },
  {
    id: 'jawa',
    name: 'Jawa',
    category: 'Rustic',
    accentColor: '#dfb76c',
    previewUrl: '/preview/jawa',
    useUrl: '/admin?theme=jawa',
  },
  {
    id: 'manado',
    name: 'Manado',
    category: 'Minimalist',
    accentColor: '#0284c7',
    previewUrl: '/preview/manado',
    useUrl: '/admin?theme=manado',
  }
];

const CATS = ['Semua', 'Modern', 'Rustic', 'Floral', 'Minimalist'] as const;
type Cat = typeof CATS[number];

// Render the interactive styled phone invitation preview for each specific culture/style
const PhoneScreen = ({ id }: { id: string }) => {
  if (id === 'snapfoto') {
    return (
      <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-3 select-none text-white">
        {/* Full-bleed Photo Background */}
        <div className="absolute inset-0">
          <img src="/assets/landing/hero-4.png" alt="Snap Foto Couple" className="w-full h-full object-cover brightness-[0.55]" />
        </div>
        
        <div className="text-center z-10 flex-1 flex flex-col justify-end gap-1.5 pb-2">
          <p className="text-[4px] uppercase tracking-[0.25em] font-sans font-semibold text-white/70">Wedding Invitation</p>
          <h4 className="text-[12px] font-serif italic text-white leading-tight font-bold">Risa &amp; Putra</h4>
          <p className="text-[4px] font-sans text-white/60">SABTU, 15 FEBRUARI 2026</p>
          
          <div className="w-16 py-0.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[4px] font-sans font-bold flex items-center justify-center gap-0.5 mx-auto shadow-sm">
            ✉ Buka Undangan
          </div>
        </div>
      </div>
    );
  }

  if (id === 'sunda') {
    return (
      <div className="relative w-full h-full bg-[#f4f7f1] flex flex-col justify-between p-3 select-none text-[#5a7350] font-serif">
        {/* Soft jasmine and green gradient styling */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#e5ede0] via-transparent to-[#e8efe3] opacity-60 pointer-events-none" />
        <div className="absolute top-2 right-2 text-[9px] opacity-75 pointer-events-none select-none">🎋</div>
        <div className="absolute bottom-2 left-2 text-[9px] opacity-75 pointer-events-none select-none">🌿</div>
        
        <div className="text-center mt-3 z-10 flex-1 flex flex-col justify-center gap-1">
          <p className="text-[4px] uppercase tracking-[0.2em] font-sans font-semibold text-[#5a7350]/70">Undangan Pernikahan</p>
          <h4 className="text-[12px] font-bold italic text-[#4b5e43] leading-tight font-serif">Hendra &amp; Alisha</h4>
          
          <div className="border border-[#c6d7be] rounded-md p-1 flex flex-col items-center justify-center my-0.5 w-14 mx-auto bg-white/40">
            <p className="text-[4px] uppercase tracking-widest text-[#5a7350] font-bold font-sans">Minggu</p>
            <p className="text-[9px] font-serif font-bold text-[#5a7350] leading-none my-0.5">12</p>
            <p className="text-[4px] uppercase tracking-widest text-[#5a7350] font-bold font-sans">Juli</p>
          </div>
          
          <p className="text-[4px] font-sans text-slate-400">Kepada Yth. Tamu Undangan</p>
          <div className="w-16 py-0.5 bg-[#5a7350] text-white rounded-full text-[4px] font-sans font-bold flex items-center justify-center gap-0.5 mx-auto shadow-sm">
            ✉ Buka Undangan
          </div>
        </div>
      </div>
    );
  }

  if (id === 'jawa') {
    return (
      <div className="relative w-full h-full bg-[#110c08] flex flex-col justify-between p-3 select-none text-[#dfb76c] border border-amber-900/30 rounded-[26px]">
        <div className="text-center z-10 flex-1 flex flex-col justify-center gap-0.5">
          {/* Gunungan Shadow Art */}
          <svg className="w-8 h-10 text-[#dfb76c]/40 mx-auto" viewBox="0 0 100 120" fill="currentColor">
            <path d="M50 0 L90 80 L70 110 L30 110 L10 80 Z" />
            <path d="M50 15 L80 85 L20 85 Z" opacity="0.6" fill="#dfb76c" />
          </svg>
          
          <p className="text-[4px] uppercase tracking-[0.2em] font-sans font-semibold text-[#dfb76c]/60">Undangan Pernikahan</p>
          <h4 className="text-[11px] font-serif italic font-bold text-[#dfb76c] leading-tight">Romi &amp; Shinta</h4>
          <p className="text-[4px] font-sans text-slate-400">Minggu, 30 Juni 2025</p>
          
          {/* Javanese Countdown */}
          <div className="flex justify-center gap-0.5 my-0.5">
            {['00', '00', '00', '00'].map((n, i) => (
              <div key={i} className="w-3 h-3 rounded-full border border-[#dfb76c]/40 flex items-center justify-center bg-[#dfb76c]/5">
                <span className="text-[3px] font-bold text-[#dfb76c]/80">{n}</span>
              </div>
            ))}
          </div>
          
          <div className="w-16 py-0.5 bg-[#dfb76c] text-[#110c08] rounded-md text-[4px] font-sans font-bold flex items-center justify-center gap-0.5 mx-auto shadow-sm mt-0.5">
            ✉ Buka Undangan
          </div>
        </div>
      </div>
    );
  }

  // Manado Theme Screen Vibe
  return (
    <div className="relative w-full h-full bg-[#f0f9ff] flex flex-col justify-between p-3 select-none text-[#0284c7]">
      {/* Beach shore / blue leaf elements */}
      <div className="absolute bottom-1 right-1 text-sm opacity-40 pointer-events-none">🌊</div>
      <div className="absolute top-1 left-1 text-sm opacity-35 pointer-events-none">🌺</div>
      
      <div className="z-10 flex-1 flex flex-col justify-between py-1">
        <p className="text-[4px] text-center font-sans tracking-[0.2em] font-semibold text-slate-400">Wedding Invitation</p>
        
        {/* Couple Image card */}
        <div className="w-18 h-20 mx-auto rounded-md overflow-hidden border border-sky-100 shadow-sm relative bg-sky-50 flex items-center justify-center">
          <img src="/assets/landing/hero-2.png" alt="Manado Couple" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent p-0.5">
            <p className="text-[4px] text-white font-sans text-center font-semibold">B &amp; S</p>
          </div>
        </div>

        <div className="text-center space-y-0.5">
          <h4 className="text-[10px] font-serif italic text-sky-900 leading-tight">Billy &amp; Stevani</h4>
          <p className="text-[4px] font-sans text-slate-400">Sabtu, 20 September 2025</p>
          
          <div className="w-16 py-0.5 bg-[#0284c7] text-white rounded-md text-[4px] font-sans font-bold flex items-center justify-center gap-0.5 mx-auto shadow-sm">
            ✉ Open Invitation
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Tema() {
  const [active, setActive] = useState<Cat>('Semua');

  const filtered = active === 'Semua' ? THEMES : THEMES.filter(t => t.category === active);

  return (
    <section id="tema" className="py-24 bg-slate-50/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">Koleksi Tema</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Pilihan Desain Premium</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Dirancang oleh desainer profesional kami. Responsif, elegan, dan mudah dikustomisasi sesuai keinginan Anda.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                active === cat
                  ? 'bg-[#8e1b42] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(theme => (
            <div
              key={theme.id}
              className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* iPhone Mockup Container */}
              <div className="bg-slate-100 rounded-xl py-6 flex items-center justify-center relative overflow-hidden group/phone mb-4">
                <div className="absolute inset-0 bg-slate-200/40 opacity-0 group-hover/phone:opacity-100 transition-opacity pointer-events-none" />
                
                {/* iPhone Outer Frame */}
                <div className="relative w-[150px] h-[300px] bg-slate-900 rounded-[28px] p-1.5 shadow-xl ring-4 ring-slate-800/80 mx-auto select-none overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-11 h-3 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                    <div className="w-1 h-1 bg-slate-800 rounded-full ml-auto mr-1" />
                  </div>
                  
                  {/* Screen Content Wrapper */}
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-white">
                    <PhoneScreen id={theme.id} />
                  </div>
                </div>
              </div>

              {/* Theme Name */}
              <h3 className="text-center font-bold text-slate-800 text-base mb-4 font-serif">
                {theme.name}
              </h3>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href={theme.previewUrl}
                  target="_blank"
                  className="w-full py-2 px-3 text-xs font-semibold text-pink-600 border border-pink-200 hover:border-pink-600 hover:bg-pink-50/50 rounded-xl transition-all text-center cursor-pointer"
                >
                  Lihat Demo
                </Link>
                <Link
                  href={theme.useUrl}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow-md shadow-pink-600/10 transition-all text-center cursor-pointer"
                >
                  Gunakan Tema
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
