'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TemaPage() {
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
            placeholder="Search templates..."
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

          <button className="flex items-center gap-2 p-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Profile
          </button>
        </div>
      </header>

      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#8D1A42' }}>Template Repository</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and customize your digital invitation assets.</p>
        </div>
        <Link href="/admin/tema/add" className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#8D1A42' }}>
          <span>+</span> Add Template
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Templates */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">TOTAL TEMPLATES</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-800">24</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
              +3 this month
            </span>
          </div>
        </div>

        {/* Active Designs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">ACTIVE DESIGNS</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-[#8D1A42]">18</span>
          </div>
          <div className="absolute right-5 bottom-5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ borderColor: '#8D1A42', color: '#8D1A42' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Avg Performance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">AVG. PERFORMANCE</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-800">86%</span>
            <span className="text-sm font-semibold text-emerald-600">Optimal</span>
          </div>
        </div>

        {/* Revenue Share */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">REVENUE SHARE</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-800">$12.4k</span>
          </div>
          <div className="absolute right-5 bottom-5 text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Template 1 */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-48 relative overflow-hidden bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/landing/hero-1.png" alt="Royal Maroon Classic" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow-sm">
              <span className="font-bold text-sm" style={{ color: '#8D1A42' }}>$45.00</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-[15px]">Royal Maroon Classic</h3>
              {/* Toggle Switch */}
              <div className="w-10 h-5 bg-[#8D1A42] rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>WA Blast Enabled (Premium)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Guest List Management</span>
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Edit Details
              </button>
              <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Template 2 */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-48 relative overflow-hidden bg-[#e0d6cd]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/landing/hero-2.png" alt="Minimal Eucalyptus" className="w-full h-full object-contain p-4" />
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow-sm">
              <span className="font-bold text-sm" style={{ color: '#8D1A42' }}>$29.00</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-[15px]">Minimal Eucalyptus</h3>
              {/* Toggle Switch */}
              <div className="w-10 h-5 bg-[#8D1A42] rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>WA Blast Disabled</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Guest List Only</span>
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Edit Details
              </button>
              <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Template 3 */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="h-48 relative overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/landing/hero-3.png" alt="Tech Anniversary" className="w-full h-full object-cover opacity-90" />
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow-sm">
              <span className="font-bold text-sm" style={{ color: '#8D1A42' }}>$35.00</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-[15px]">Tech Anniversary</h3>
              {/* Toggle Switch Off */}
              <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm border border-slate-100"></div>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>WA Blast Enabled</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[13px]">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Guest List Management</span>
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Edit Details
              </button>
              <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Archived Templates */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-slate-800 text-[15px]">Archived Templates</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
              Previous
            </button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md transition-colors" style={{ backgroundColor: '#f9eaee', color: '#8D1A42' }}>
              Next
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6 font-sans">PREVIEW</th>
                <th className="py-3 px-6 font-sans">TEMPLATE NAME</th>
                <th className="py-3 px-6 font-sans">PRICE</th>
                <th className="py-3 px-6 font-sans">STATUS</th>
                <th className="py-3 px-6 text-right font-sans">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/landing/hero-4.png" alt="Preview" className="w-full h-full object-cover opacity-70" />
                  </div>
                </td>
                <td className="py-4 px-6 font-medium text-slate-800">
                  Summer Breeze Party
                </td>
                <td className="py-4 px-6 text-slate-600">
                  $15.00
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-md uppercase">
                    Archived
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-sm font-bold transition-colors hover:opacity-80" style={{ color: '#8D1A42' }}>
                    Restore
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-amber-900 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/landing/hero-1.png" alt="Preview" className="w-full h-full object-cover opacity-70" />
                  </div>
                </td>
                <td className="py-4 px-6 font-medium text-slate-800">
                  Halloween Haunt 2023
                </td>
                <td className="py-4 px-6 text-slate-600">
                  $12.00
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-md uppercase">
                    Archived
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-sm font-bold transition-colors hover:opacity-80" style={{ color: '#8D1A42' }}>
                    Restore
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
