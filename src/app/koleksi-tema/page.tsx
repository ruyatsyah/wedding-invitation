'use client';

import React, { useState, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/landing/Footer';
import LoginModal from '@/components/landing/LoginModal';

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

function KoleksiTemaContent() {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates', 'all-published'],
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

  const filteredTemplates = templates.filter((t: Template) => 
    t.templateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />
      
      <main className="flex-1 pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Page Header */}
          <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#000000] tracking-tight">Koleksi Semua Tema</h1>
            <p className="text-neutral-500 text-base leading-relaxed">
              Jelajahi berbagai pilihan desain undangan digital premium yang elegan dan siap digunakan untuk menyempurnakan hari bahagia Anda.
            </p>
            
            {/* Search Input */}
            <div className="relative max-w-md mx-auto mt-8">
              <input 
                type="text" 
                placeholder="Cari nama tema..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-sm text-neutral-800 px-4 py-3 pl-11 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all shadow-sm"
              />
              <svg className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Grid Layout */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <svg className="animate-spin w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-neutral-500 text-sm">Memuat koleksi tema...</p>
            </div>
          ) : (
            <>
              {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredTemplates.map((theme: Template) => (
                    <div
                      key={theme._id}
                      className="group bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                      {/* Thumbnail Container */}
                      <div className="bg-neutral-100 rounded-xl flex items-center justify-center relative overflow-hidden group/phone mb-4 h-64">
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/phone:opacity-100 transition-opacity pointer-events-none z-10" />
                        
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={theme.thumbnailUrl} 
                          alt={theme.templateName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Price Tag */}
                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm z-20">
                          <span className="font-bold text-xs text-[#000000]">
                            {theme.discount > 0 ? (
                              <>
                                <span className="line-through text-neutral-400 text-[10px] mr-1">
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
                      <h3 className="text-center font-bold text-neutral-800 text-base mb-4 truncate">
                        {theme.templateName}
                      </h3>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 mt-auto">
                        <a
                          href={theme.sourceCodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 px-3 text-xs font-bold text-neutral-600 border border-neutral-200 hover:border-neutral-800 hover:bg-neutral-50 rounded-xl transition-all text-center cursor-pointer"
                        >
                          Lihat Demo
                        </a>
                        <button
                          onClick={() => handleGunakanTema(theme._id)}
                          className="w-full py-2 px-3 text-xs font-bold text-white bg-[#000000] hover:bg-[#171717] rounded-xl shadow-md transition-all text-center cursor-pointer"
                        >
                          Gunakan Tema
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Tema tidak ditemukan</h3>
                  <p className="text-neutral-500 text-sm">Tidak ada tema yang cocok dengan pencarian "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-sm font-semibold text-[#000000] hover:underline"
                  >
                    Hapus pencarian
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer onLoginOpen={() => setIsLoginModalOpen(true)} />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}

export default function KoleksiTemaPage() {
  return (
    <Suspense fallback={null}>
      <KoleksiTemaContent />
    </Suspense>
  );
}
