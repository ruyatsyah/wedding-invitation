'use client';

import React, { useState } from 'react';

const THEMES = [
  { id: 1, name: 'Adinda & Rahmat', category: 'Modern',     emoji: '🌿', bg: 'bg-emerald-900',  accent: 'emerald' },
  { id: 2, name: 'Chandra & Melati', category: 'Floral',    emoji: '🌸', bg: 'bg-[#8e1b42]',    accent: 'rose' },
  { id: 3, name: 'Dewi & Surya',     category: 'Rustic',    emoji: '🍂', bg: 'bg-[#7a4a2a]',    accent: 'amber' },
  { id: 4, name: 'Eka & Bagus',      category: 'Minimalist',emoji: '◆',  bg: 'bg-slate-800',    accent: 'slate' },
  { id: 5, name: 'Fitri & Hidayat',  category: 'Modern',    emoji: '✦',  bg: 'bg-indigo-900',   accent: 'indigo' },
  { id: 6, name: 'Gita & Bayu',      category: 'Floral',    emoji: '🌹', bg: 'bg-rose-950',     accent: 'rose' },
];

const CATS = ['Semua', 'Modern', 'Rustic', 'Floral', 'Minimalist'] as const;
type Cat = typeof CATS[number];

export default function Tema() {
  const [active, setActive] = useState<Cat>('Semua');

  const filtered = active === 'Semua' ? THEMES : THEMES.filter(t => t.category === active);

  return (
    <section id="tema" className="py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">Koleksi Tema</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Pilihan Desain Premium</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Dirancang oleh desainer profesional kami. Responsif, elegan, dan mudah dikustomisasi.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(theme => (
            <div
              key={theme.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Preview */}
              <div className={`${theme.bg} h-52 flex flex-col items-center justify-center text-white text-center p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <span className="text-4xl mb-3 relative z-10">{theme.emoji}</span>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/70 font-semibold relative z-10">Wedding Invitation</p>
                <h4 className="text-xl font-serif italic mt-1 relative z-10">{theme.name}</h4>
              </div>

              {/* Card Footer */}
              <div className="p-5 flex items-center justify-between bg-white border-t border-slate-50">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{theme.name}</p>
                  <span className="text-[10px] text-[#8e1b42] font-semibold uppercase tracking-wider">{theme.category}</span>
                </div>
                <a
                  href="/?to=tamu-kehormatan"
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-rose-50 text-[#8e1b42] hover:bg-[#8e1b42] hover:text-white transition-all"
                >
                  Preview
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
