import React, { useState } from 'react';

interface Theme {
  id: number;
  name: string;
  category: 'Modern' | 'Rustic' | 'Floral' | 'Minimalist';
  color: string;
  imgUrl: string;
}

const THEMES: Theme[] = [
  { id: 1, name: 'Adinda & Rahmat', category: 'Modern', color: 'bg-emerald-800', imgUrl: '🌿' },
  { id: 2, name: 'Chandra & Melati', category: 'Floral', color: 'bg-[#8e1b42]', imgUrl: '🌸' },
  { id: 3, name: 'Dewi & Surya', category: 'Rustic', color: 'bg-[#a3704c]', imgUrl: '🍂' },
  { id: 4, name: 'Eka & Bagus', category: 'Minimalist', color: 'bg-slate-800', imgUrl: '⚪' },
  { id: 5, name: 'Fitri & Hidayat', category: 'Modern', color: 'bg-indigo-950', imgUrl: '✨' },
  { id: 6, name: 'Gita & Bayu', category: 'Floral', color: 'bg-rose-950', imgUrl: '🌹' },
];

export default function Tema() {
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Modern' | 'Rustic' | 'Floral' | 'Minimalist'>('Semua');

  const filteredThemes = activeCategory === 'Semua' 
    ? THEMES 
    : THEMES.filter(t => t.category === activeCategory);

  return (
    <section id="tema" className="py-24 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Pilihan Tema Desain Premium</h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Pilih dari puluhan desain tema undangan eksklusif yang dirancang oleh desainer profesional kami. Semua tema responsif dan dapat disesuaikan sesuka Anda.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {(['Semua', 'Modern', 'Rustic', 'Floral', 'Minimalist'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#8e1b42] text-white shadow-md shadow-pink-900/10'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid layout of Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              className="group bg-[#FCF8F9]/60 border border-rose-100/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col"
            >
              {/* Theme Preview Card Graphic */}
              <div className={`h-64 ${theme.color} flex flex-col items-center justify-center relative overflow-hidden text-center text-white p-8 group-hover:scale-[1.01] transition-transform`}>
                {/* Background decorative ring */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-white/20 animate-spin-slow"></div>
                </div>
                
                <span className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{theme.imgUrl}</span>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/80 font-bold">Wedding Invitation</p>
                <h4 className="text-2xl font-serif italic my-2">{theme.name}</h4>
                <div className="w-10 h-[1px] bg-white/40 mx-auto"></div>
              </div>

              {/* Theme Bottom description details */}
              <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between">
                <div className="text-left">
                  <h5 className="font-bold text-slate-800 text-sm">{theme.name}</h5>
                  <span className="text-[10px] text-rose-600 font-semibold uppercase tracking-wider">{theme.category}</span>
                </div>
                
                <a
                  href="/?to=tamu-kehormatan"
                  className="px-4 py-2 bg-rose-50 text-rose-800 hover:bg-[#8e1b42] hover:text-white rounded-xl text-xs font-semibold transition-all"
                >
                  Lihat Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
