'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Template {
  _id: string;
  templateName: string;
  price: number;
  discount: number;
  thumbnailUrl: string;
  sourceCodeUrl: string;
  enableWaBlast: boolean;
  guestListOnly: boolean;
  dailyLimit: number;
  publishImmediately: boolean;
  createdAt: string;
}

export default function TemplateCatalog() {
  const [search, setSearch] = useState('');

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates', 'published'],
    queryFn: async () => {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch');
      return data.data.filter((t: Template) => t.publishImmediately);
    },
  });

  const filtered = templates.filter((t: Template) =>
    t.templateName.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Info */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Template Catalog</h1>
        <p className="text-sm text-slate-500 mt-1">Temukan undangan digital premium yang didesain untuk momen paling berharga Anda.</p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari template..."
            className="w-full bg-white text-[13px] text-slate-700 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] transition-all placeholder-slate-400"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">URUTKAN:</span>
          <select className="border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 cursor-pointer">
            <option>Terbaru</option>
            <option>Harga Tertinggi</option>
            <option>Harga Terendah</option>
            <option>Terpopuler</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
              <div className="h-56 bg-slate-100" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-5 bg-slate-100 rounded w-1/2" />
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="h-9 bg-slate-100 rounded-lg" />
                  <div className="h-9 bg-slate-100 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((tpl: Template) => (
            <div key={tpl._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
              <div className="h-56 relative overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={tpl.thumbnailUrl} 
                  alt={tpl.templateName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-800 line-clamp-1">{tpl.templateName}</h3>
                </div>
                
                <div className="mb-4">
                  <p className="font-bold text-[#8D1A42] text-lg">
                    {tpl.discount > 0 ? (
                      <span className="flex flex-col">
                        <span className="line-through text-slate-400 text-xs font-medium">
                          {formatPrice(tpl.price)}
                        </span>
                        {formatPrice(tpl.price * (1 - tpl.discount / 100))}
                      </span>
                    ) : (
                      formatPrice(tpl.price)
                    )}
                  </p>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <a
                    href={tpl.sourceCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#8D1A42] transition-colors"
                  >
                    <Eye className="w-4 h-4" /> Preview
                  </a>
                  <Link
                    href={`/client?theme=${tpl._id}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-[#8D1A42] rounded-lg text-sm font-medium text-white hover:bg-[#721535] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Gunakan
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State / Not found */}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                {search ? `Tidak ada template untuk "${search}"` : 'Belum ada template'}
              </h3>
              <p className="text-xs text-slate-500 mb-4 px-4">
                {search ? 'Coba gunakan kata kunci pencarian yang lain.' : 'Admin belum mempublikasikan template apapun.'}
              </p>
            </div>
          )}

          {/* Request theme card */}
          {filtered.length > 0 && (
            <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Punya ide tema?</h3>
              <p className="text-xs text-slate-500 mb-4 px-4">Desainer kami selalu membuat template-template baru.</p>
              <button className="text-sm font-semibold text-[#8D1A42] hover:text-[#721535] flex items-center gap-1">
                Request a theme &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filtered.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">Menampilkan {filtered.length} template</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50">&lsaquo;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#8D1A42] text-white font-medium text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">&rsaquo;</button>
          </div>
        </div>
      )}
    </div>
  );
}
