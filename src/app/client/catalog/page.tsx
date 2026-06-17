'use client';

import { Search, Eye, ShoppingCart } from 'lucide-react';

const templates = [
  { name: 'Eternal Rose', price: 'Rp 149.000', tags: 'Modern • Romantis • Floral', image: 'bg-rose-900', isTraditional: false },
  { name: 'Gending Jawi', price: 'Rp 129.000', tags: 'Tradisional • Mewah • Batik', image: 'bg-[#5b3b1e]', isTraditional: true },
  { name: 'Wildwood Echo', price: 'Rp 99.000', tags: 'Rustik • Earthy • Vintage', image: 'bg-emerald-900', isTraditional: false },
  { name: 'Pure Serif', price: 'Rp 89.000', tags: 'Minimalis • Clean • Typography', image: 'bg-slate-100', isTraditional: false },
  { name: 'Royal Velvet', price: 'Rp 199.000', tags: 'Luxury • Laser Cut • Premium', image: 'bg-teal-900', isTraditional: false },
  { name: 'Floral Whimsy', price: 'Rp 119.000', tags: 'Watercolor • Playful • Garden', image: 'bg-pink-100', isTraditional: false },
  { name: 'Midnight Gatsby', price: 'Rp 159.000', tags: 'Vintage • Art Deco • Glamour', image: 'bg-blue-950', isTraditional: false },
];

export default function TemplateCatalog() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Info */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Template Catalog</h1>
        <p className="text-sm text-slate-500 mt-1">Discover premium digital invitations curated for your most precious moments.</p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button className="px-5 py-2 rounded-full bg-[#8D1A42] text-white text-sm font-medium whitespace-nowrap">Semua</button>
          <button className="px-5 py-2 rounded-full bg-transparent hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap">Modern</button>
          <button className="px-5 py-2 rounded-full bg-transparent hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap">Tradisional</button>
          <button className="px-5 py-2 rounded-full bg-transparent hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap">Rustik</button>
          <button className="px-5 py-2 rounded-full bg-transparent hover:bg-slate-100 text-slate-600 text-sm font-medium whitespace-nowrap">Minimalis</button>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">URUTKAN:</span>
          <select className="border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#8D1A42]/20">
            <option>Terbaru</option>
            <option>Harga Tertinggi</option>
            <option>Harga Terendah</option>
            <option>Terpopuler</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((tpl, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className={`h-56 ${tpl.image} relative`}>
              {tpl.isTraditional && (
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 tracking-wider">
                  TRADISIONAL
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-slate-800">{tpl.name}</h3>
                <p className="font-bold text-[#8D1A42] text-sm">{tpl.price}</p>
              </div>
              <p className="text-xs text-slate-500 mb-6">{tpl.tags}</p>
              
              <div className="mt-auto grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 bg-[#8D1A42] rounded-lg text-sm font-medium text-white hover:bg-[#721535] transition-colors">
                  <ShoppingCart className="w-4 h-4" /> Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Coming soon card */}
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-2">More coming soon!</h3>
          <p className="text-xs text-slate-500 mb-4 px-4">Our designers are crafting new stunning templates every week.</p>
          <button className="text-sm font-semibold text-[#8D1A42] hover:text-[#721535] flex items-center gap-1">
            Request a theme &rarr;
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-500">Showing 7 of 48 premium templates</p>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50">&lsaquo;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#8D1A42] text-white font-medium text-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">&rsaquo;</button>
        </div>
      </div>
    </div>
  );
}
