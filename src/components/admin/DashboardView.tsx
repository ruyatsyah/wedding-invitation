'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

interface Guest {
  _id: string;
  name: string;
  slug: string;
  phone?: string;
  rsvpStatus: 'PENDING' | 'ATTENDING' | 'DECLINED';
  pax: number;
  group?: string;
  isOpened: boolean;
}

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: string;
}

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme');
  const [toastMessage, setToastMessage] = useState('');

  const { data: guests = [], isLoading: loadingGuests } = useQuery({
    queryKey: ['guests', 'admin'],
    queryFn: async () => {
      const res = await fetch('/api/guests');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    }
  });

  const { data: wishes = [], isLoading: loadingWishes } = useQuery({
    queryKey: ['wishes', 'admin'],
    queryFn: async () => {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    }
  });

  const isLoading = loadingGuests || loadingWishes;

  useEffect(() => {
    if (themeParam) {
      const capitalized = themeParam.charAt(0).toUpperCase() + themeParam.slice(1);
      setToastMessage(`Tema "${capitalized}" berhasil diaktifkan untuk undangan Anda!`);
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [themeParam]);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between animate-fade-in-up shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">✨</span>
            <div>
              <p className="text-sm font-semibold">{toastMessage}</p>
              <p className="text-xs text-emerald-700/80 mt-0.5">Anda dapat membagikan undangan ini menggunakan template baru sekarang.</p>
            </div>
          </div>
          <button onClick={() => setToastMessage('')} className="p-1 hover:bg-emerald-100 rounded-full transition-colors text-emerald-600 hover:text-emerald-800 font-bold font-sans cursor-pointer text-sm leading-none">✕</button>
        </div>
      )}

      {/* Top Header Search & Controls */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search analytics or users..."
            className="w-full bg-[#f1f3f6] text-[13px] text-slate-700 pl-10 pr-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-[#8D1A42]/20 border border-transparent focus:border-[#8D1A42]/30 transition-all placeholder-slate-400"
          />
        </div>

        {/* Buttons & Profile Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          <button className="relative p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8D1A42] rounded-full"></span>
          </button>

          <button className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#8D1A42' }}>
            <span>+</span> Create Event
          </button>
        </div>
      </header>

      {/* Title & Desc */}
      <div className="-mt-2">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Performance Overview</h1>
        <p className="text-xs text-slate-500 mt-1">Monitor your platform&apos;s growth and financial health in real-time.</p>
      </div>

      {/* Row 1: Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Today's Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[152px]">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 text-[#8D1A42]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
              +5.2% ↗
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">TODAY&apos;S REVENUE</p>
            <p className="text-lg font-extrabold text-slate-800 mt-0.5">Rp 12.450.000</p>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-[#8D1A42] w-[35%] rounded-full"></div>
          </div>
        </div>

        {/* Card 2: Monthly Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[152px]">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 text-[#8D1A42]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
              +12.4% ↗
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">MONTHLY REVENUE</p>
            <p className="text-lg font-extrabold text-slate-800 mt-0.5">Rp 348.120.000</p>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-[#8D1A42] w-[65%] rounded-full"></div>
          </div>
        </div>

        {/* Card 3: Annual Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[152px]">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-50 text-[#8D1A42]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
              +28.7% ↗
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">ANNUAL REVENUE</p>
            <p className="text-lg font-extrabold text-slate-800 mt-0.5">Rp 4.250.000k</p>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-[#8D1A42] w-[45%] rounded-full"></div>
          </div>
        </div>

        {/* Card 4: Active Users (Solid Background #8D1A42) */}
        <div className="p-5 rounded-2xl shadow-sm flex flex-col justify-between h-[152px] relative overflow-hidden text-white" style={{ backgroundColor: '#8D1A42' }}>
          <div className="absolute right-[-15px] bottom-[-15px] text-white/10 pointer-events-none">
            <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <div>
            <p className="text-[9px] font-bold text-rose-200 tracking-widest uppercase">ACTIVE USERS</p>
            <p className="text-2xl font-extrabold mt-1">1,240,482</p>
          </div>
          <div className="text-[10px] text-rose-100 font-medium">Active sessions globally</div>
        </div>

        {/* Card 5: Live Invitations */}
        <div className="p-5 rounded-2xl shadow-sm flex flex-col justify-between h-[152px] relative overflow-hidden bg-[#e6f0fa] text-[#1e3a5f]">
          <div className="absolute right-[-15px] bottom-[-15px] text-[#1e3a5f]/5 pointer-events-none">
            <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <div>
            <p className="text-[9px] font-bold text-[#5c7a9c] tracking-widest uppercase">LIVE INVITATIONS</p>
            <p className="text-2xl font-extrabold mt-1">45,829</p>
          </div>
          <div className="text-[10px] text-[#5c7a9c] font-medium">Currently online templates</div>
        </div>
      </div>

      {/* Row 2: Sales Trends & Sidebar info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trends Column */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Sales Trends of Top Templates</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Visualizing performance across primary design categories</p>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-semibold text-slate-600 cursor-pointer">
                Last 30 Days
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Custom SVG line chart matching screenshot exactly */}
            <div className="relative mt-8 h-48 w-full">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
                <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              </div>

              {/* Chart SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8D1A42" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#8D1A42" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area path */}
                <path
                  d="M 0 130 C 60 120, 90 40, 120 50 C 180 70, 210 110, 240 100 C 300 80, 330 30, 360 20 C 420 5, 450 140, 480 120 C 540 80, 570 90, 600 70 L 600 160 L 0 160 Z"
                  fill="url(#chartGrad)"
                />
                {/* Line path */}
                <path
                  d="M 0 130 C 60 120, 90 40, 120 50 C 180 70, 210 110, 240 100 C 300 80, 330 30, 360 20 C 420 5, 450 140, 480 120 C 540 80, 570 90, 600 70"
                  fill="none"
                  stroke="#8D1A42"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Visual points */}
                <circle cx="120" cy="50" r="4" fill="#8D1A42" stroke="#fff" strokeWidth="1.5" />
                <circle cx="360" cy="20" r="4" fill="#8D1A42" stroke="#fff" strokeWidth="1.5" />
                <circle cx="480" cy="120" r="4" fill="#8D1A42" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Chart X Labels */}
          <div className="flex justify-between items-center px-2 mt-4 text-[10px] font-bold text-slate-400">
            <span>Wedding</span>
            <span>Birthday</span>
            <span>Corporate</span>
            <span>Gala</span>
            <span>Holiday</span>
            <span>Modern</span>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* Recent Activity Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Recent Activity</h3>
              <Link href="/admin/tamu" className="text-[11px] font-bold hover:underline" style={{ color: '#8D1A42' }}>
                View All
              </Link>
            </div>

            {/* List */}
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-500 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">New Premium User</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Ahmad Subagyo just upgraded to Elite plan.</p>
                  <span className="text-[9px] text-slate-400 block mt-0.5">2 minutes ago</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-500 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">System Alert</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Payment gateway delay in West Jakarta region.</p>
                  <span className="text-[9px] text-slate-400 block mt-0.5">15 minutes ago</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-50 text-[#8D1A42] shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">New Template Sale</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">&apos;Midnight Royale&apos; template purchased 14 times today.</p>
                  <span className="text-[9px] text-slate-400 block mt-0.5">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Webinar Card */}
          <div className="p-5 rounded-2xl flex flex-col justify-between h-[155px] relative overflow-hidden text-white" style={{ backgroundColor: '#8D1A42' }}>
            <div className="absolute right-[-10px] bottom-[-20px] text-white/10 pointer-events-none">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm tracking-tight">Grow the platform</h3>
              <p className="text-[10px] text-rose-200 leading-relaxed max-w-[200px]">Host a seasonal webinar for invitation creators and designers.</p>
            </div>
            <button className="self-start px-4 py-1.5 bg-white text-[11px] font-bold rounded-lg transition-colors hover:bg-rose-50 cursor-pointer" style={{ color: '#8D1A42' }}>
              Start Session
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Trending Premium Templates */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">Trending Premium Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Midnight Royale */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden bg-slate-50 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/landing/hero-1.png" alt="Midnight Royale" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-[13px] truncate max-w-[120px]">Midnight Royale</h4>
                <span className="font-extrabold text-[13px]" style={{ color: '#8D1A42' }}>Rp 150k</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>Premium Series</span>
                <span className="text-slate-500">428 Sales</span>
              </div>
            </div>
          </div>

          {/* Card 2: Summit Pro */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden bg-slate-50 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/landing/hero-2.png" alt="Summit Pro" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-[13px] truncate max-w-[120px]">Summit Pro</h4>
                <span className="font-extrabold text-[13px]" style={{ color: '#8D1A42' }}>Rp 225k</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>Enterprise Series</span>
                <span className="text-slate-500">312 Sales</span>
              </div>
            </div>
          </div>

          {/* Card 3: Neon Party */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden bg-slate-50 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/landing/hero-3.png" alt="Neon Party" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-[13px] truncate max-w-[120px]">Neon Party</h4>
                <span className="font-extrabold text-[13px]" style={{ color: '#8D1A42' }}>Rp 85k</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>Creative Series</span>
                <span className="text-slate-500">954 Sales</span>
              </div>
            </div>
          </div>

          {/* Card 4: Elysian Night */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-44 overflow-hidden bg-slate-50 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/landing/hero-4.png" alt="Elysian Night" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-[13px] truncate max-w-[120px]">Elysian Night</h4>
                <span className="font-extrabold text-[13px]" style={{ color: '#8D1A42' }}>Rp 300k</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>Designer Series</span>
                <span className="text-slate-500">156 Sales</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
        <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Admin Dashboard...</p>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
