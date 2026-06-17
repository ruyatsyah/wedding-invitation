'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Theme configuration matching Tema.tsx
const THEMES = [
  {
    id: 'sunda',
    name: 'Sunda',
    category: 'Floral',
    accentColor: '#5a7350',
    description: 'Tema bernuansa hijau sage lembut dengan ornamen dedaunan dan melati khas pernikahan adat Sunda yang anggun.',
    defaultGroom: 'Hendra',
    defaultBride: 'Alisha',
    style: {
      outerBg: 'bg-[#f4f7f1]',
      bodyBg: 'bg-white border-emerald-50 text-slate-700',
      headerBg: 'bg-gradient-to-b from-[#e5ede0] via-[#f4f7f1] to-white',
      sectionBg: 'bg-[#e5ede0]/40 border-y border-[#dbe6d5]',
      cardBg: 'bg-white border-[#cddfc6]',
      textTitle: 'text-[#4b5e43]',
      textSub: 'text-[#5a7350]',
      primaryBtn: 'bg-[#5a7350] hover:bg-[#4b5e43] text-white',
      outlineBtn: 'border-[#5a7350] text-[#5a7350] hover:bg-[#eaf0e6]',
      emoji: '🌿',
      badge: 'bg-[#eaf0e6] text-[#4b5e43]'
    }
  },
  {
    id: 'jawa',
    name: 'Jawa',
    category: 'Rustic',
    accentColor: '#5d3e2e',
    description: 'Tema rustic hangat dengan perpaduan latar belakang pasir krem lembut, ornamen dedaunan kering botanical, dan warna terracotta yang eksotis.',
    defaultGroom: 'Bagus',
    defaultBride: 'Ninda',
    style: {
      outerBg: 'bg-[#e7e1da]',
      bodyBg: 'bg-[#f4f1ec] border-[#dcd6cd] text-[#4a3525]',
      headerBg: 'bg-gradient-to-b from-[#d5cbbd] via-[#f4f1ec] to-[#f4f1ec]',
      sectionBg: 'bg-[#eae4db]/60 border-y border-[#dcd6cd]',
      cardBg: 'bg-white border-[#e2ddd5]',
      textTitle: 'text-[#5d3e2e]',
      textSub: 'text-[#7c5641]',
      primaryBtn: 'bg-[#5d3e2e] hover:bg-[#4a3124] text-white',
      outlineBtn: 'border-[#5d3e2e] text-[#5d3e2e] hover:bg-[#eae4db]',
      emoji: '🍂',
      badge: 'bg-[#eae4db] text-[#5d3e2e]'
    }
  },
  {
    id: 'manado',
    name: 'Manado',
    category: 'Minimalist',
    accentColor: '#0284c7',
    description: 'Tema bernuansa tropis pesisir dengan latar biru laut bersih, bunga kembang sepatu, dan tipografi modern yang segar.',
    defaultGroom: 'Billy',
    defaultBride: 'Stevani',
    style: {
      outerBg: 'bg-sky-50/50',
      bodyBg: 'bg-white border-sky-100 text-slate-700',
      headerBg: 'bg-gradient-to-b from-sky-100/60 via-sky-50/20 to-white',
      sectionBg: 'bg-sky-50/30 border-y border-sky-100',
      cardBg: 'bg-white border-sky-200/60',
      textTitle: 'text-sky-900',
      textSub: 'text-sky-800',
      primaryBtn: 'bg-[#0284c7] hover:bg-[#0369a1] text-white',
      outlineBtn: 'border-[#0284c7] text-[#0284c7] hover:bg-sky-50',
      emoji: '🌺',
      badge: 'bg-sky-100 text-sky-850'
    }
  },
  {
    id: 'snapfoto',
    name: 'Snap Foto',
    category: 'Modern',
    accentColor: '#1e293b',
    description: 'Tema modern penuh foto romantis dengan filter gelap/moody yang menonjolkan keintiman pasangan pengantin.',
    defaultGroom: 'Risa',
    defaultBride: 'Putra',
    style: {
      outerBg: 'bg-slate-950',
      bodyBg: 'bg-slate-900 border-slate-800 text-slate-300',
      headerBg: 'bg-gradient-to-b from-slate-950/90 via-slate-900 to-slate-900',
      sectionBg: 'bg-slate-950/40 border-y border-slate-800',
      cardBg: 'bg-slate-800/60 border-slate-700',
      textTitle: 'text-white',
      textSub: 'text-slate-200',
      primaryBtn: 'bg-slate-700 hover:bg-slate-600 text-white',
      outlineBtn: 'border-slate-500 text-white hover:bg-slate-800',
      emoji: '✨',
      badge: 'bg-slate-800 text-slate-300'
    }
  }
];

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Active Theme
  const themeId = searchParams.get('theme') || 'sunda';
  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  // Customization States
  const [groomName, setGroomName] = useState(activeTheme.defaultGroom);
  const [brideName, setBrideName] = useState(activeTheme.defaultBride);
  const [isOpened, setIsOpened] = useState(false);

  // Sync inputs on theme switch
  useEffect(() => {
    setGroomName(activeTheme.defaultGroom);
    setBrideName(activeTheme.defaultBride);
    setIsOpened(false);
  }, [themeId, activeTheme]);

  const selectTheme = (id: string) => {
    router.push(`/preview?theme=${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col lg:flex-row">
      
      {/* ── LEFT SIDEBAR: CONTROL PANEL ───────────────────────────────── */}
      <aside className="w-full lg:w-96 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/landing#tema" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              &larr; Kembali
            </Link>
            <span className="text-[10px] uppercase tracking-widest font-bold text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full">
              Live Preview
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>🎨</span> Demo Editor Tema
            </h1>
            <p className="text-xs text-slate-500 mt-1">Ubah nama mempelai di bawah untuk mencoba kustomisasi undangan Anda secara langsung.</p>
          </div>

          {/* Customizer Fields */}
          <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sesuaikan Nama</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-1 uppercase">Pria</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-850 focus:border-pink-500 focus:outline-none rounded-lg px-2.5 py-2 text-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-1 uppercase">Wanita</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-850 focus:border-pink-500 focus:outline-none rounded-lg px-2.5 py-2 text-white transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Theme Selector list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Desain Tema</h3>
            <div className="space-y-2">
              {THEMES.map((theme) => {
                const isSelected = theme.id === themeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-pink-600/10 border-pink-500/60 shadow-lg text-white'
                        : 'bg-slate-900/40 border-slate-850 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{isSelected ? '⭐' : '👉'}</span>
                        <p className="font-bold text-sm leading-none">{theme.name}</p>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{theme.category}</p>
                    </div>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action button at bottom */}
        <div className="pt-6 border-t border-slate-850 mt-8 lg:mt-0">
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
            {activeTheme.description}
          </p>
          <Link
            href={`/admin?theme=${themeId}`}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-pink-600/15 hover:shadow-pink-600/25 transition-all text-center cursor-pointer"
          >
            🚀 Gunakan Tema &amp; Mulai Buat
          </Link>
        </div>
      </aside>

      {/* ── RIGHT PANEL: LIVE MOCKUP FRAME ─────────────────────────────── */}
      <main className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Subtle decorative background shapes matching theme colors */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full filter blur-[150px] opacity-20 -z-10 transition-all duration-700" 
          style={{ backgroundColor: activeTheme.accentColor, top: '10%', right: '10%' }} 
        />
        
        {/* iPhone Wrapper Mockup */}
        <div className="relative w-[310px] h-[610px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800/80 ring-8 ring-slate-900/40 select-none overflow-hidden flex flex-col justify-between">
          
          {/* Dynamic Island Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-905 rounded-full ml-auto mr-1" />
          </div>

          {/* Screen Container */}
          <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-white flex flex-col">
            
            {/* ✉ SCREEN 1: COVER VIEW */}
            {!isOpened && (
              <div className={`absolute inset-0 z-30 ${activeTheme.style.outerBg} flex flex-col items-center justify-center p-6 text-center animate-fade-in`}>
                {/* Visual Cover Elements */}
                {themeId === 'snapfoto' && (
                  <div className="absolute inset-0 z-0">
                    <img src="/assets/landing/hero-4.png" alt="Couple cover" className="w-full h-full object-cover brightness-[0.5]" />
                  </div>
                )}
                {themeId === 'sunda' && (
                  <div className="absolute inset-x-0 top-0 h-16 bg-[#e5ede0] rounded-b-[40px] opacity-60 z-0" />
                )}

                <div className={`relative z-10 space-y-6 max-w-[240px] p-5 rounded-2xl border ${themeId === 'snapfoto' ? 'bg-slate-950/65 border-slate-800 text-white' : 'bg-white/80 backdrop-blur-md border-slate-100 text-slate-800 shadow-xl'}`}>
                  <span className={`text-xl font-serif block ${themeId === 'snapfoto' ? 'text-slate-200' : activeTheme.style.textTitle}`}>♥</span>
                  <div className="space-y-1">
                    <p className="text-[7px] uppercase tracking-[0.2em] text-pink-600 font-bold">Walimatul &apos;Ursy</p>
                    <h2 className={`text-2xl font-serif font-bold italic leading-tight ${themeId === 'snapfoto' ? 'text-white' : activeTheme.style.textTitle}`}>
                      {groomName} &amp; {brideName}
                    </h2>
                  </div>
                  
                  <div className={`py-4 border-y ${themeId === 'snapfoto' ? 'border-slate-800' : 'border-slate-100'}`}>
                    <p className="text-[7px] text-slate-400 mb-1">Kepada Yth. Tamu Undangan:</p>
                    <p className={`text-xs font-bold ${themeId === 'snapfoto' ? 'text-white' : 'text-slate-900'}`}>Keluarga &amp; Sahabat</p>
                  </div>
                  
                  <button
                    onClick={() => setIsOpened(true)}
                    className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-[9px] rounded-full transition-all shadow-md shadow-pink-500/10 cursor-pointer"
                  >
                    ✉️ Buka Undangan
                  </button>
                </div>
              </div>
            )}

            {/* ✉ SCREEN 2: SCROLLABLE INVITATION BODY */}
            {isOpened && (
              <div className={`w-full h-full overflow-y-auto ${activeTheme.style.bodyBg} flex flex-col pb-10 scrollbar-none relative animate-fade-in`}>
                
                {/* Reset button inside invitation screen */}
                <button
                  onClick={() => setIsOpened(false)}
                  className="absolute top-6 right-4 z-40 bg-slate-900/60 hover:bg-slate-900 text-white text-[8px] font-bold py-1 px-2.5 rounded-full backdrop-blur-sm border border-white/10 cursor-pointer"
                >
                  &larr; Tutup
                </button>

                {/* Hero section */}
                <div className={`h-64 shrink-0 ${activeTheme.style.headerBg} flex flex-col items-center justify-center text-center p-4 space-y-2`}>
                  {themeId === 'snapfoto' && (
                    <div className="absolute inset-x-0 top-0 h-64 z-0">
                      <img src="/assets/landing/hero-4.png" alt="Couple cover" className="w-full h-full object-cover brightness-[0.4]" />
                    </div>
                  )}
                  <p className="text-[6px] uppercase tracking-[0.3em] font-sans font-bold opacity-75 relative z-10">The Wedding of</p>
                  <h1 className={`text-3xl font-serif italic font-bold relative z-10 ${activeTheme.style.textTitle}`}>
                    {groomName} &amp; {brideName}
                  </h1>
                  <p className="text-[6px] font-mono tracking-widest opacity-60 relative z-10">
                    {themeId === 'sunda' && '12 · 07 · 2026'}
                    {themeId === 'jawa' && '30 · 06 · 2025'}
                    {themeId === 'manado' && '20 · 09 · 2025'}
                    {themeId === 'snapfoto' && '15 · 02 · 2026'}
                  </p>
                </div>

                {/* Couple details */}
                <section className="px-5 py-8 text-center space-y-6">
                  <p className="text-[7px] leading-relaxed italic max-w-[180px] mx-auto opacity-70">
                    &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.&rdquo; — Ar-Rum: 21
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-base font-serif italic font-bold ${activeTheme.style.textTitle}`}>{groomName} Saputra</h3>
                      <p className="text-[6px] opacity-60 mt-0.5">Putra dari Bpk. Bambang &amp; Ibu Wati</p>
                    </div>
                    <span className="text-lg font-serif text-pink-300 block leading-none">&amp;</span>
                    <div>
                      <h3 className={`text-base font-serif italic font-bold ${activeTheme.style.textTitle}`}>{brideName} Amalia</h3>
                      <p className="text-[6px] opacity-60 mt-0.5">Putri dari Bpk. Harun &amp; Ibu Aminah</p>
                    </div>
                  </div>
                </section>

                {/* Event Schedule */}
                <section className={`px-5 py-8 ${activeTheme.style.sectionBg} text-center space-y-6`}>
                  <h2 className={`text-lg font-serif italic font-bold ${activeTheme.style.textTitle}`}>Waktu &amp; Tempat</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className={`${activeTheme.style.cardBg} p-4 rounded-xl border text-left space-y-1 shadow-sm`}>
                      <span className="text-base block">💍</span>
                      <h4 className={`font-bold text-[8px] uppercase tracking-wider ${activeTheme.style.textTitle}`}>Akad Nikah</h4>
                      <p className="text-[7px] opacity-70">Pukul 09.00 – 10.30 WIB</p>
                      <p className={`text-[7px] font-semibold ${activeTheme.style.textSub}`}>Gedung Pernikahan Indah</p>
                    </div>
                    <div className={`${activeTheme.style.cardBg} p-4 rounded-xl border text-left space-y-1 shadow-sm`}>
                      <span className="text-base block">🎉</span>
                      <h4 className={`font-bold text-[8px] uppercase tracking-wider ${activeTheme.style.textTitle}`}>Resepsi</h4>
                      <p className="text-[7px] opacity-70">Pukul 11.00 – 14.00 WIB</p>
                      <p className={`text-[7px] font-semibold ${activeTheme.style.textSub}`}>Gedung Pernikahan Indah</p>
                    </div>
                  </div>
                  <button className={`w-full ${activeTheme.style.outlineBtn} text-[8px] font-semibold py-2 rounded-full transition-all shadow-sm cursor-pointer`}>
                    📍 Buka Google Maps
                  </button>
                </section>

                {/* RSVP Mockup */}
                <section className="px-5 py-8 text-center space-y-6">
                  <h2 className={`text-lg font-serif italic font-bold ${activeTheme.style.textTitle}`}>Konfirmasi</h2>
                  <div className={`${activeTheme.style.cardBg} border rounded-2xl p-4 text-left space-y-3`}>
                    <p className="text-[7px] leading-relaxed text-center opacity-70">Konfirmasi kehadiran Anda langsung di editor demo ini.</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button className={`py-1.5 rounded-lg text-[8px] font-bold border transition-all ${activeTheme.style.rsvpBtnSelected}`}>
                        ✓ Hadir
                      </button>
                      <button className={`py-1.5 rounded-lg text-[8px] font-bold border transition-all ${activeTheme.style.rsvpBtnUnselected}`}>
                        ✗ Absen
                      </button>
                    </div>
                    <button className={`w-full py-2 rounded-lg text-[8px] font-bold ${activeTheme.style.primaryBtn} cursor-pointer`}>
                      Kirim Konfirmasi
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* Small hint under mockup */}
        <p className="text-[10px] text-slate-500 mt-4 text-center">
          *Ini adalah tampilan persis undangan di layar HP tamu Anda.
        </p>
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-pink-500 font-medium text-sm animate-pulse">Memuat Preview Workspace...</p>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
