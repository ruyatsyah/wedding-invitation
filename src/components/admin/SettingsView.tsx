'use client';

import React from 'react';

export default function SystemSettingsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen pb-16">
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
            placeholder="Search settings or logs..."
            className="w-full bg-[#f1f3f6] text-[13px] text-slate-700 pl-10 pr-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#8D1A42]/20 border border-transparent focus:border-[#8D1A42]/30 transition-all placeholder-slate-400"
          />
        </div>

        {/* Buttons & Profile Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-5">
          <button className="relative p-1.5 text-[#8D1A42] hover:text-[#701534] transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="p-1.5 text-[#8D1A42] hover:text-[#701534] transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="-mt-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">System Settings</h1>
        <p className="text-[13.5px] text-slate-500 mt-1">Configure your management suite's core infrastructure and gateway integrations.</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* General Settings Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-800">
              <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-[15px]">General Settings</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-semibold text-slate-800 mb-2">Invitation Active Period</label>
                <div className="relative">
                  <select className="w-full bg-white border border-slate-200 text-slate-700 text-[13px] rounded-lg focus:ring-[#8D1A42] focus:border-[#8D1A42] block p-2.5 appearance-none cursor-pointer outline-none">
                    <option>1 Year Auto-lock</option>
                    <option>6 Months Auto-lock</option>
                    <option>Never Expire</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <p className="text-[11.5px] text-slate-500 mt-2 leading-relaxed">After this period, invitations will be archived and access restricted.</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-[13px] font-bold text-slate-800">Maintenance Mode</p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5">Temporarily disable front-end access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8D1A42]"></div>
                </label>
              </div>
            </div>

            <button className="w-full mt-8 py-3 text-white text-[14px] font-semibold rounded-lg shadow-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: '#6a1230' }}>
              Save Changes
            </button>
          </div>

          {/* System Health Card */}
          <div className="p-6 rounded-2xl flex items-center justify-between relative overflow-hidden text-white shadow-md" style={{ backgroundColor: '#6a1230' }}>
            <div className="absolute -right-8 -top-8 w-40 h-40 border-[20px] border-white/5 rounded-full"></div>
            <div className="absolute -right-16 -top-16 w-56 h-56 border-[20px] border-white/5 rounded-full"></div>
            
            <div className="relative z-10 space-y-1">
              <h3 className="font-bold text-[14px] mb-2">System Health</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight">99.8%</span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-white/70 uppercase">SERVER UPTIME</p>
            </div>
            <div className="relative z-10 w-12 h-12 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Payment Gateway API Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-slate-800">
                <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-bold text-[15px]">Payment Gateway API</h3>
              </div>
              <span className="px-3 py-1 bg-[#e0effc] text-[#377bb5] text-[11px] font-bold rounded-full">Secure Sync</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tripay */}
              <div className="space-y-4">
                <h4 className="text-[13px] font-bold text-[#8D1A42]">Tripay Settings</h4>
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Merchant Code</label>
                  <input type="text" defaultValue="T102934-MCH" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800" />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">API Key</label>
                  <input type="password" defaultValue="secretapikeyhere" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800 tracking-[0.2em]" />
                </div>
              </div>

              {/* Midtrans */}
              <div className="space-y-4">
                <h4 className="text-[13px] font-bold text-[#8D1A42]">Midtrans Settings</h4>
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Client Key</label>
                  <input type="text" defaultValue="SB-Mid-client-8821" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800" />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Server Key</label>
                  <input type="password" defaultValue="secretserverkey" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800 tracking-[0.2em]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SMTP Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-[15px]">SMTP Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Host</label>
                  <input type="text" defaultValue="smtp.gmail.com" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Port</label>
                    <input type="text" defaultValue="587" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Encryption</label>
                    <div className="relative">
                      <select className="w-full bg-white border border-slate-200 text-slate-700 text-[13px] rounded-lg focus:ring-[#8D1A42] focus:border-[#8D1A42] block px-3 py-2.5 appearance-none cursor-pointer outline-none">
                        <option>TLS</option>
                        <option>SSL</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WA Gateway */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="font-bold text-[15px]">WA Gateway</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">Server Provider</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-slate-200 text-slate-700 text-[13px] rounded-lg focus:ring-[#8D1A42] focus:border-[#8D1A42] block px-3 py-2.5 appearance-none cursor-pointer outline-none">
                      <option>Fonnte</option>
                      <option>Wablas</option>
                      <option>Watzap</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">API Key / Token</label>
                  <input type="password" defaultValue="secrettokenhere" className="w-full text-[13px] border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800 tracking-[0.2em]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WA Blast Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-800">
            <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="font-bold text-[15px]">WA Blast Logs & Security Monitor</h3>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-[#8D1A42] rounded-lg text-sm font-semibold transition-all hover:bg-slate-50 shadow-sm">
              Export CSV
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#6a1230' }}>
              Refresh Logs
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[12px] font-bold text-slate-600">
                <th className="py-4 px-6 font-sans">Timestamp</th>
                <th className="py-4 px-6 font-sans">Recipient</th>
                <th className="py-4 px-6 font-sans">Message Content Preview</th>
                <th className="py-4 px-6 font-sans">Security Status</th>
                <th className="py-4 px-6 text-center font-sans">Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-slate-500 font-medium">
                  <p>Oct 24,</p>
                  <p>14:20:11</p>
                </td>
                <td className="py-4 px-6 font-bold text-slate-800">
                  +62 812-3456-XXXX
                </td>
                <td className="py-4 px-6 text-slate-600 italic">
                  "Your invitation for the Smith-Doe wedding is now ready..."
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eaf7f2] text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    CLEAN
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-slate-500 font-medium">
                  <p>Oct 24,</p>
                  <p>14:18:45</p>
                </td>
                <td className="py-4 px-6 font-bold text-slate-800">
                  +62 899-7721-XXXX
                </td>
                <td className="py-4 px-6 text-slate-600 italic">
                  "Invoice #INV-2023-991 has been generated and is..."
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eaf7f2] text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    CLEAN
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-slate-500 font-medium">
                  <p>Oct 24,</p>
                  <p>13:05:02</p>
                </td>
                <td className="py-4 px-6 font-bold text-slate-800">
                  +62 856-1122-XXXX
                </td>
                <td className="py-4 px-6 text-slate-600 italic">
                  "Alert: Unusual login detected from new IP address..."
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#fff6e6] text-[#b47a16] text-[10px] font-bold rounded uppercase tracking-wider border border-[#ffedcf]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    FLAG
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-slate-500 font-medium">
                  <p>Oct 24,</p>
                  <p>12:44:19</p>
                </td>
                <td className="py-4 px-6 font-bold text-slate-800">
                  +62 877-3344-XXXX
                </td>
                <td className="py-4 px-6 text-slate-600 italic">
                  "Welcome to Invito! Click here to verify your account..."
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eaf7f2] text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    CLEAN
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-[#f8f9fc]">
          <p className="text-[12px] text-slate-500 font-medium ml-2">Showing 4 of 2,842 logs</p>
          <div className="flex items-center gap-3 text-slate-800 text-[13px] font-medium mr-2">
            <button className="text-slate-400 hover:text-slate-800 transition-colors p-1 font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span>Page 1 of 711</span>
            <button className="text-slate-800 hover:text-slate-500 transition-colors p-1 font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
