'use client';

import React from 'react';

export default function InvitationMonitorPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen">
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
            placeholder="Search invitation ID or subdomain..."
            className="w-full bg-[#f1f3f6] text-[13px] text-slate-700 pl-10 pr-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-[#8D1A42]/20 border border-transparent focus:border-[#8D1A42]/30 transition-all placeholder-slate-400"
          />
        </div>

        {/* Buttons & Profile Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          <button className="relative p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#8D1A42' }}>Invitation Monitor</h1>
          <p className="text-sm text-slate-500 mt-0.5">Real-time content moderation and subdomain governance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 transition-all shadow-sm hover:bg-slate-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#8D1A42' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Active Links */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
              +4.2% ↑
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">TOTAL ACTIVE LINKS</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">12,842</p>
          </div>
        </div>

        {/* Flagged Content */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-rose-500 flex items-center gap-0.5">
              +18% ~
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">FLAGGED CONTENT</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">142</p>
          </div>
        </div>

        {/* Moderation Performance */}
        <div className="p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden" style={{ backgroundColor: '#8D1A42' }}>
          <div className="absolute right-[-20px] bottom-[-20px] text-white/10 pointer-events-none">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
          <div className="relative z-10 space-y-3">
            <h3 className="font-bold text-[13px] text-rose-200">Moderation Performance</h3>
            <p className="text-[11.5px] text-white leading-relaxed">
              98% of flagged items are resolved within 15 minutes. Keep up the high standard.
            </p>
          </div>
          <div className="relative z-10 w-full h-1.5 bg-white/20 rounded-full mt-6">
            <div className="h-full bg-white rounded-full w-[90%]"></div>
          </div>
        </div>
      </div>

      {/* Live Invitation Stream Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-[14px]">Live Invitation Stream</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Show:</span>
            <select className="bg-transparent text-sm text-slate-700 font-medium outline-none cursor-pointer pr-4">
              <option>All Status</option>
              <option>Flagged</option>
              <option>Active</option>
              <option>High Risk</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-700 capitalize">
                <th className="py-4 px-6">Invitation ID</th>
                <th className="py-4 px-6">Owner Name</th>
                <th className="py-4 px-6">Subdomain URL</th>
                <th className="py-4 px-6">Date Created</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-rose-600 font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    INV-9842
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">JM</div>
                    <span className="font-medium text-slate-800">John Maverick</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[12px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">maverick-bash.invito.co</span>
                </td>
                <td className="py-4 px-6 text-[13px]">
                  Oct 24, 2023
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-red-100 text-red-600 text-[11px] font-semibold rounded-full">
                    Flagged
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="px-3 py-1.5 bg-red-700 text-white text-[11px] font-semibold rounded-md border border-red-700">
                      Banned/Cancel
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">
                  INV-9841
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold">SW</div>
                    <span className="font-medium text-slate-800">Sarah Williams</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[12px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">wedding-sw.invito.co</span>
                </td>
                <td className="py-4 px-6 text-[13px]">
                  Oct 24, 2023
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-600 text-[11px] font-semibold rounded-full">
                    Active
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="px-3 py-1.5 bg-white text-red-600 text-[11px] font-semibold rounded-md border border-red-200 hover:bg-red-50">
                      Banned/Cancel
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">
                  INV-9840
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">RK</div>
                    <span className="font-medium text-slate-800">Robert King</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[12px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">king-corp-24.invito.co</span>
                </td>
                <td className="py-4 px-6 text-[13px]">
                  Oct 23, 2023
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-600 text-[11px] font-semibold rounded-full">
                    Active
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="px-3 py-1.5 bg-white text-red-600 text-[11px] font-semibold rounded-md border border-red-200 hover:bg-red-50">
                      Banned/Cancel
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-rose-600 font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    INV-9839
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">AL</div>
                    <span className="font-medium text-slate-800">Anonymous User</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[12px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">crypto-win-free.invito.co</span>
                </td>
                <td className="py-4 px-6 text-[13px]">
                  Oct 23, 2023
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[11px] font-semibold rounded-full whitespace-nowrap">
                    High Risk
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="px-3 py-1.5 bg-red-700 text-white text-[11px] font-semibold rounded-md border border-red-700">
                      Banned/Cancel
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[13px] text-slate-500">Showing 1 to 4 of 12,842 entries</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm">‹</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#8D1A42] bg-[#8D1A42] text-white text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm">›</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Subdomain Traffic */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-[14px] mb-4">Global Subdomain Traffic</h3>
          <div className="bg-[#f0f0f4] rounded-xl h-64 relative flex items-end justify-center pb-8 pt-10 px-4 gap-2">
            {/* Mock Chart Bars */}
            <div className="w-[8%] h-[20%] bg-[#d9c9d0] rounded-t-sm"></div>
            <div className="w-[8%] h-[35%] bg-[#d9c9d0] rounded-t-sm"></div>
            <div className="w-[8%] h-[15%] bg-[#d9c9d0] rounded-t-sm"></div>
            <div className="w-[8%] h-[50%] bg-[#a5526e] rounded-t-sm"></div>
            <div className="w-[8%] h-[75%] bg-[#8D1A42] rounded-t-sm"></div>
            <div className="w-[8%] h-[40%] bg-[#d9c9d0] rounded-t-sm"></div>
            <div className="w-[8%] h-[25%] bg-[#d9c9d0] rounded-t-sm"></div>
            <div className="w-[8%] h-[30%] bg-[#d9c9d0] rounded-t-sm"></div>
            
            <p className="absolute bottom-3 text-[12px] text-slate-500">Hourly Monitoring Intensity</p>
          </div>
        </div>

        {/* Recent Moderation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-[14px] mb-6">Recent Moderation</h3>
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">INV-9822 Banned</p>
                <p className="text-[12px] text-slate-500 mt-0.5">Policy violation: Phishing</p>
                <p className="text-[11px] text-slate-400 mt-1">2 mins ago</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">INV-9821 Verified</p>
                <p className="text-[12px] text-slate-500 mt-0.5 text-blue-600">Manual review completed</p>
                <p className="text-[11px] text-slate-400 mt-1">15 mins ago</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">Settings Changed</p>
                <p className="text-[12px] text-slate-500 mt-0.5">Threshold lowered by 5%</p>
                <p className="text-[11px] text-slate-400 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
