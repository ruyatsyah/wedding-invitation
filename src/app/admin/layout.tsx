'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-white text-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-slate-100">
        <h2 className="text-lg font-extrabold tracking-tight flex items-center gap-1.5" style={{ color: '#8D1A42' }}>
          InvitoAdmin
          <span className="text-[9px] bg-pink-50 px-2 py-0.5 rounded-full font-semibold ml-1" style={{ color: '#8D1A42' }}>Suite</span>
        </h2>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Shared Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-52px)] md:max-h-screen md:h-screen">
        {children}
      </div>
    </div>
  );
}
