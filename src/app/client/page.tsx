'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BarChart3, CalendarDays, Package, Settings, ExternalLink, Plus, ShoppingCart, X } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

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

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const themeId = searchParams.get('theme');
  const { data: session } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(' ')[0] ?? 'Client';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupleName, setCoupleName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch templates');
      return data.data.filter((t: Template) => t.publishImmediately);
    }
  });

  const activeTheme = templates.find((t: Template) => t._id === themeId);
  const selectedTheme = activeTheme;

  useEffect(() => {
    if (themeId && templates.length > 0) {
      const found = templates.find((t: Template) => t._id === themeId);
      if (found) setIsModalOpen(true);
    }
  }, [themeId, templates]);

  const createProjectMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupleName, customUrl, themeId: activeTheme?._id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal memproses pesanan.');
      return data.data;
    },
    onSuccess: () => { router.push('/client/undangan'); },
    onError: (err: any) => { setErrorMsg(err.message); }
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setCoupleName('');
    setCustomUrl('');
    setErrorMsg('');
    router.replace('/client', { scroll: false });
  };

  const handleCheckout = () => {
    if (!coupleName || !customUrl) { setErrorMsg('Mohon lengkapi semua field form.'); return; }
    if (!activeTheme) { setErrorMsg('Silakan pilih tema terlebih dahulu.'); return; }
    setErrorMsg('');
    createProjectMutation.mutate();
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 relative">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-neutral-900">Welcome back, {firstName} 👋</h1>
          <p className="text-xs md:text-sm text-neutral-500 mt-1">Manage your digital invitations and track real-time engagement.</p>
        </div>
        <button 
          onClick={() => router.push('/client/catalog')}
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#000000] hover:bg-[#171717] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-black/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Beli Template Baru
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'TOTAL VISITORS', value: '12,840', sub: '↗ +12% from last month', subColor: 'text-emerald-600', Icon: BarChart3 },
          { label: 'ACTIVE EVENTS', value: '08', sub: 'Currently published live', subColor: 'text-neutral-500', Icon: CalendarDays },
          { label: 'CREDITS REMAINING', value: '04', sub: 'Template slots available', subColor: 'text-neutral-500', Icon: Package },
        ].map(({ label, value, sub, subColor, Icon }) => (
          <div key={label} className="bg-white p-6 rounded-xl border border-neutral-100 flex flex-col justify-between h-32 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-neutral-500 tracking-wider mb-1">{label}</p>
                <h2 className="text-2xl font-bold text-neutral-900">{value}</h2>
              </div>
              <Icon className="w-6 h-6 text-neutral-300" />
            </div>
            <p className={`text-xs font-medium ${subColor}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Invitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden flex flex-col shadow-sm">
          <div className="h-40 bg-neutral-100 relative">
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-semibold text-neutral-800">Published</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-neutral-800 mb-1">wedding.alexandmaria.com</h3>
            <p className="text-xs text-neutral-500 mb-4 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Dec 12, 2024
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
              <div>
                <p className="text-xs text-neutral-500">Visitors</p>
                <p className="text-sm font-bold text-neutral-800">2,482</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-neutral-200 rounded-lg text-neutral-500 hover:bg-neutral-50 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#000000] rounded-lg text-white hover:bg-[#171717] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Invitation Card */}
        <div 
          onClick={() => router.push('/client/catalog')}
          className="rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-neutral-100/50 hover:border-neutral-300 transition-all"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-neutral-700 shadow-sm mb-4 border border-neutral-100">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-800 mb-2">Launch New Invitation</h3>
          <p className="text-xs text-neutral-500 max-w-[150px]">Choose from over 50+ premium curated templates</p>
        </div>
      </div>

      {/* Template Collection */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">Koleksi Template Kami</h2>
          <button onClick={() => router.push('/client/catalog')} className="text-sm font-semibold text-[#000000] hover:underline cursor-pointer">Lihat Semua</button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-neutral-100 overflow-hidden animate-pulse">
                <div className="h-40 bg-neutral-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-neutral-100 rounded w-1/2" />
                  <div className="h-4 bg-neutral-100 rounded w-3/4" />
                  <div className="h-4 bg-neutral-100 rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {templates.slice(0, 4).map((tpl: Template) => (
              <div 
                key={tpl._id} 
                onClick={() => router.push(`/client?theme=${tpl._id}`)}
                className="bg-white rounded-xl border border-neutral-100 overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-40 relative overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tpl.thumbnailUrl} alt={tpl.templateName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 bg-white flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-bold tracking-wider text-neutral-900 bg-neutral-100 px-2 py-1 rounded uppercase">
                      Premium
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                      <ShoppingCart className="w-3 h-3" />
                      Popular
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">{tpl.templateName}</h3>
                  <div className="mt-auto pt-2">
                    <p className="text-sm font-bold text-[#000000]">
                      {tpl.discount > 0 ? formatPrice(tpl.price * (1 - tpl.discount / 100)) : formatPrice(tpl.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL CHECKOUT */}
      {isModalOpen && selectedTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-neutral-600 hover:bg-black/20 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left side: Image */}
            <div className="md:w-5/12 bg-neutral-100 relative h-64 md:h-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedTheme.thumbnailUrl} 
                alt={selectedTheme.templateName} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#000000] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  Pilihan Anda
                </span>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="md:w-7/12 p-6 md:p-8 flex flex-col bg-white">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">{selectedTheme.templateName}</h2>
              
              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-neutral-100">
                <div className="text-3xl font-bold text-[#000000]">
                  {selectedTheme.discount > 0 ? formatPrice(selectedTheme.price * (1 - selectedTheme.discount / 100)) : formatPrice(selectedTheme.price)}
                </div>
                {selectedTheme.discount > 0 && (
                  <div className="text-sm text-neutral-400 line-through mb-1">{formatPrice(selectedTheme.price)}</div>
                )}
              </div>

              {createProjectMutation.isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">Pesanan Berhasil!</h3>
                  <p className="text-neutral-500 text-sm">Undangan Anda telah berhasil dibuat dan aktif.</p>
                  <button 
                    onClick={() => router.push('/client/undangan')}
                    className="mt-4 px-6 py-2.5 bg-[#000000] hover:bg-[#171717] text-white font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Kelola Undangan
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 flex-1">
                    <h3 className="font-semibold text-neutral-800 text-sm">Informasi Acara</h3>
                    {errorMsg && (
                      <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100">{errorMsg}</div>
                    )}
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Nama Panggilan Mempelai</label>
                      <input 
                        type="text" 
                        value={coupleName}
                        onChange={(e) => setCoupleName(e.target.value)}
                        placeholder="Contoh: Romi & Shinta"
                        className="w-full bg-neutral-50 text-sm text-neutral-800 px-4 py-2.5 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Custom URL / Link Undangan</label>
                      <div className="flex items-center">
                        <span className="bg-neutral-100 border border-neutral-200 border-r-0 rounded-l-xl px-3 py-2.5 text-neutral-500 text-sm select-none">
                          kabarbaik.co/
                        </span>
                        <input 
                          type="text" 
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          placeholder="romishinta" 
                          className="w-full bg-white text-sm text-neutral-800 px-4 py-2.5 rounded-r-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                        />
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1">Gunakan huruf kecil, angka, dan strip (-).</p>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <a 
                      href={selectedTheme.sourceCodeUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-5 py-3 border border-neutral-200 text-neutral-600 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors text-center"
                    >
                      Lihat Demo
                    </a>
                    <button 
                      onClick={handleCheckout}
                      disabled={createProjectMutation.isPending}
                      className="flex-1 bg-[#000000] hover:bg-[#171717] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                    >
                      {createProjectMutation.isPending ? (
                        <>
                          <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Memproses...
                        </>
                      ) : (
                        'Buat Undangan Sekarang'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center py-20 gap-3">
        <svg className="animate-spin w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-neutral-500 text-sm">Memuat Dashboard...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
