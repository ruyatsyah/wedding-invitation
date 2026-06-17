'use client';

import React from 'react';
import Link from 'next/link';

export default function AddTemplatePage() {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen pb-20">
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
            placeholder="Search templates, users, or transactions..."
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

          <button className="flex items-center gap-2 p-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-sm font-medium">
            <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Admin Console
          </button>
        </div>
      </header>

      {/* Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold mb-1 text-slate-500">
            <Link href="/admin/tema" className="hover:text-slate-700 transition-colors">Template Manager</Link>
            <span className="text-slate-300">›</span>
            <span className="text-slate-800">Add New Template</span>
          </div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900 mt-1">Create Digital Template</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/tema" className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 shadow-sm text-center">
            Cancel
          </Link>
          <button className="px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#8D1A42' }}>
            Save Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Information Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-[16px] text-slate-900">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Template Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Royal Wedding Minimalist" 
                  className="w-full text-[13px] border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#8D1A42] bg-white text-slate-800 placeholder-slate-400" 
                />
                <p className="text-[11.5px] text-slate-500 mt-2">Keep it short and descriptive.</p>
              </div>
              
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Unit Price (IDR)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-slate-500 text-[13px] font-medium">Rp</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="0" 
                    className="w-full text-[13px] border border-slate-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#8D1A42] bg-white text-slate-800 placeholder-slate-400" 
                  />
                </div>
                <p className="text-[11.5px] text-slate-500 mt-2">Standard market price for this template.</p>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Discount (%)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0" 
                    className="w-full text-[13px] border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-[#8D1A42] bg-white text-slate-800 placeholder-slate-400" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-slate-500 text-[13px] font-medium">%</span>
                  </div>
                </div>
                <p className="text-[11.5px] text-slate-500 mt-2">Optional discount percentage.</p>
              </div>
            </div>
          </div>

          {/* Asset Upload Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h3 className="font-bold text-[16px] text-slate-900">Asset Upload</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Template Source Code */}
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Template Source Code</label>
                <div className="border-2 border-dashed border-rose-200 bg-rose-50/30 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-rose-50/50 transition-colors h-40">
                  <svg className="w-8 h-8 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="text-[13px] text-slate-700 font-medium">
                    Drop <span className="font-bold">ZIP/HTML</span> here
                  </p>
                  <p className="text-[13px] text-slate-700 font-medium mt-0.5">
                    or <span className="text-[#8D1A42] font-bold">browse files</span>
                  </p>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Thumbnail Image</label>
                <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors h-40">
                  <svg className="w-8 h-8 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[13px] text-slate-700 font-bold">Upload Preview</p>
                  <p className="text-[11.5px] text-slate-500 mt-1">1200 × 800px recommended</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Configuration Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900">
                <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="font-bold text-[16px]">Feature Configuration <span className="text-slate-400 font-normal text-[12px] ml-1">(Super Admin Only)</span></h3>
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-md">Locked for Editors</span>
            </div>

            <div className="space-y-4">
              {/* Enable WA Blast */}
              <div className="flex items-center justify-between p-5 rounded-xl bg-slate-50/50 border border-slate-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-800">Enable WA Blast Feature (Premium)</h4>
                    <p className="text-[12px] text-slate-500 mt-1 leading-relaxed max-w-md">Allow users to send bulk automated WhatsApp invitations directly from this template.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d49db1]"></div>
                </label>
              </div>

              {/* Guest List Only */}
              <div className="flex items-center justify-between p-5 rounded-xl bg-slate-50/50 border border-slate-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-800">Guest List Only (Standard)</h4>
                    <p className="text-[12px] text-slate-500 mt-1 leading-relaxed max-w-md">Restrict this template to basic digital invitation features without complex integrations.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d49db1]"></div>
                </label>
              </div>

              {/* Daily Limit */}
              <div className="pt-4">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Daily Message Limit/Quota</label>
                <div className="relative max-w-xs">
                  <input 
                    type="text" 
                    defaultValue="100" 
                    className="w-full text-[13px] border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#8D1A42] bg-white text-slate-800" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-slate-500 text-[12px] font-medium">msgs/day</span>
                  </div>
                </div>
                <p className="text-[11.5px] text-slate-500 mt-2 max-w-sm leading-relaxed">Security measure to prevent spam and server overload.</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Status & Visibility Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <h3 className="font-bold text-[16px] text-slate-900">Status & Visibility</h3>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Publish Immediately</h4>
                <p className="text-[11.5px] text-slate-500 mt-0.5">Set to Active to show in store.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8D1A42]"></div>
              </label>
            </div>

            <div className="bg-[#fcfafc] border border-[#f5ebf0] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3 text-[#8D1A42]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-[10px] font-bold tracking-widest uppercase">CURRENT STATE</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <h4 className="text-[20px] font-bold text-[#8D1A42]">Active</h4>
              </div>
              <p className="text-[12px] text-slate-500 leading-relaxed mt-2">Visible to all clients and resellers in the digital catalog.</p>
            </div>
          </div>

          {/* Template Preview Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <svg className="w-5 h-5 text-[#8D1A42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-bold text-[16px] text-slate-900">Template Preview</h3>
            </div>

            <div className="rounded-xl overflow-hidden bg-slate-100 relative h-[200px] flex items-center justify-center border border-slate-200">
              {/* Mockup laptop background */}
              <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full bg-slate-300 relative flex flex-col items-center justify-end pb-4">
                   <div className="w-[80%] h-[75%] bg-slate-800 rounded-t-lg border-8 border-slate-800 relative shadow-inner">
                      <div className="w-full h-full bg-slate-100"></div>
                   </div>
                   <div className="w-[95%] h-[4%] bg-slate-400 rounded-b-md shadow-md"></div>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-slate-600 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-sm border border-slate-200/50">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[13px] font-semibold">No image uploaded yet</p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-500 font-medium">Last Modified</span>
                <span className="text-slate-800 font-bold">Not yet saved</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-500 font-medium">Storage Used</span>
                <span className="text-slate-800 font-bold">0 KB</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
