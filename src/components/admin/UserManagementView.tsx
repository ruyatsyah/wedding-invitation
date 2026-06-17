'use client';

import React from 'react';

export default function UserPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen relative pb-20">
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
            placeholder="Search users by name, email or ID..."
            className="w-full bg-[#f1f3f6] text-[13px] text-slate-700 pl-10 pr-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-[#8D1A42]/20 border border-transparent focus:border-[#8D1A42]/30 transition-all placeholder-slate-400"
          />
        </div>

        {/* Buttons & Profile Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          <button className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 -mt-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold mb-1">
            <span className="text-slate-500">Management</span>
            <span className="text-slate-300">/</span>
            <span style={{ color: '#8D1A42' }}>Users</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#8D1A42' }}>User Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage the lifecycle of registered organizers and guests.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer mt-2 sm:mt-0" style={{ backgroundColor: '#8D1A42' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite New User
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Organizers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8D1A42] flex items-center justify-center border border-rose-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 12a2 2 0 100-4 2 2 0 000 4zm0 0a2 2 0 100 4 2 2 0 000-4zm0 0a2 2 0 10-4 0 2 2 0 004 0zm0 0a2 2 0 104 0 2 2 0 00-4 0z" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-0.5">
              +5.2% ↗
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">TOTAL ORGANIZERS</p>
            <p className="text-3xl font-bold text-slate-800">1,284</p>
          </div>
        </div>

        {/* Active Invitations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8D1A42] flex items-center justify-center border border-rose-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-0.5">
              +12% ↗
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">ACTIVE INVITATIONS</p>
            <p className="text-3xl font-bold text-slate-800">45,092</p>
          </div>
        </div>

        {/* Banned Accounts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#8D1A42] flex items-center justify-center border border-rose-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#8D1A42] flex items-center gap-0.5">
              -2% ↘
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">BANNED ACCOUNTS</p>
            <p className="text-3xl font-bold text-slate-800">14</p>
          </div>
        </div>
      </div>

      {/* Directory List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-800 text-[15px]">Directory List</h3>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-semibold">Showing 50 of 1,284</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 transition-all shadow-sm hover:bg-slate-50 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Filters
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 transition-all shadow-sm hover:bg-slate-50 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="py-4 px-6 font-sans">USER PROFILE</th>
                <th className="py-4 px-6 font-sans">STATUS</th>
                <th className="py-4 px-6 font-sans">JOINED DATE</th>
                <th className="py-4 px-6 font-sans">TOTAL PROJECTS</th>
                <th className="py-4 px-6 text-right font-sans">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600 font-medium">
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://ui-avatars.com/api/?name=Eleanor+Shellstrop&background=random" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Eleanor Shellstrop</p>
                      <p className="text-slate-500 text-xs">eleanor.s@architetto.com</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Active
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Oct 24, 2023
                </td>
                <td className="py-4 px-6 text-slate-600">
                  12 Events
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-2 opacity-100">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-md transition-colors" style={{ backgroundColor: '#8D1A42' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Detail
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-rose-600 text-xs font-semibold rounded-md border border-rose-200 hover:bg-rose-50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Banned
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://ui-avatars.com/api/?name=Marcus+Aurelius&background=random" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Marcus Aurelius</p>
                      <p className="text-slate-500 text-xs">marcus.stoic@legacy.io</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Pending
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Nov 02, 2023
                </td>
                <td className="py-4 px-6 text-slate-600">
                  3 Events
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-2 opacity-100">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-md transition-colors" style={{ backgroundColor: '#8D1A42' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Detail
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-rose-600 text-xs font-semibold rounded-md border border-rose-200 hover:bg-rose-50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Banned
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors group bg-rose-50/30">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 filter grayscale">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://ui-avatars.com/api/?name=James+Dean&background=random" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">James Dean</p>
                      <p className="text-slate-500 text-xs">rebel@withoutacause.net</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    Banned
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Jan 12, 2023
                </td>
                <td className="py-4 px-6 text-slate-600">
                  0 Events
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-2 opacity-100">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md border border-slate-200 hover:bg-slate-200 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Detail
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-700 text-white text-xs font-semibold rounded-md hover:bg-red-800 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Restore
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/50 transition-colors group border-b border-transparent">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://ui-avatars.com/api/?name=Sarah+Miller&background=random" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Sarah Miller</p>
                      <p className="text-slate-500 text-xs">sarah@celebrations.io</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Active
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600">
                  Mar 15, 2024
                </td>
                <td className="py-4 px-6 text-slate-600">
                  24 Events
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-2 opacity-100">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-md transition-colors" style={{ backgroundColor: '#8D1A42' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Detail
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-rose-600 text-xs font-semibold rounded-md border border-rose-200 hover:bg-rose-50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      Banned
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500 font-medium">Showing 1 to 10 of 1,284 entries</p>
          <div className="flex gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm bg-white cursor-pointer">‹</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#8D1A42] bg-[#8D1A42] text-white text-sm cursor-pointer shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm bg-white cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm bg-white cursor-pointer">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm font-medium">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm bg-white cursor-pointer">129</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm bg-white cursor-pointer">›</button>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[12px] text-slate-500 font-medium">
        <p>© 2024 InvitoAdmin. All systems operational.</p>
        <div className="flex items-center gap-6 mt-2 sm:mt-0">
          <a href="#" className="hover:text-slate-800 transition-colors">Documentation</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Support API</a>
        </div>
      </footer>

      {/* Floating Action Button (FAB) */}
      <button 
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-900/20 hover:scale-105 transition-transform cursor-pointer z-50"
        style={{ backgroundColor: '#8D1A42' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}
