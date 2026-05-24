'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoginModal from './LoginModal';

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
}

export default function Tema() {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates', 'published'],
    queryFn: async () => {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch templates');
      return data.data.filter((t: Template) => t.publishImmediately);
    }
  });

  const handleGunakanTema = (themeId: string) => {
    setSelectedThemeId(themeId);
    setIsLoginModalOpen(true);
  };

  const callbackUrl = selectedThemeId ? `/client?theme=${selectedThemeId}` : '/client';

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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="animate-spin w-8 h-8 text-[#8D1A42]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-slate-500 text-sm">Memuat koleksi tema...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map(theme => (
              <div
                key={theme._id}
                className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail Container */}
                <div className="bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden group/phone mb-4 h-64">
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover/phone:opacity-100 transition-opacity pointer-events-none z-10" />
                  
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={theme.thumbnailUrl} 
                    alt={theme.templateName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Price Tag */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm z-20">
                    <span className="font-bold text-xs" style={{ color: '#8D1A42' }}>
                      {theme.discount > 0 ? (
                        <>
                          <span className="line-through text-slate-400 text-[10px] mr-1">
                            Rp {theme.price.toLocaleString('id-ID')}
                          </span>
                          Rp {(theme.price * (1 - theme.discount / 100)).toLocaleString('id-ID')}
                        </>
                      ) : (
                        `Rp ${theme.price.toLocaleString('id-ID')}`
                      )}
                    </span>
                  </div>
                </div>

                {/* Theme Name */}
                <h3 className="text-center font-bold text-slate-800 text-base mb-4 font-serif truncate">
                  {theme.templateName}
                </h3>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href={theme.sourceCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 text-xs font-semibold text-pink-600 border border-pink-200 hover:border-pink-600 hover:bg-pink-50/50 rounded-xl transition-all text-center cursor-pointer"
                  >
                    Preview
                  </a>
                  <button
                    onClick={() => handleGunakanTema(theme._id)}
                    className="w-full py-2 px-3 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-700 rounded-xl shadow-md shadow-pink-600/10 transition-all text-center cursor-pointer"
                  >
                    Gunakan Tema
                  </button>
                </div>
              </div>
            ))}
            
            {templates.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                Belum ada tema yang dipublikasikan saat ini.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        callbackUrl={callbackUrl}
      />
    </section>
  );
}
