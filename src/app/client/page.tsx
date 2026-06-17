'use client';

import { BarChart3, CalendarDays, Package, Settings, ExternalLink, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function ClientDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Welcome back, Alex</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your digital invitations and track real-time engagement.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#8D1A42] hover:bg-[#721535] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Beli Template Baru
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider mb-1">TOTAL VISITORS</p>
              <h2 className="text-2xl font-bold text-slate-800">12,840</h2>
            </div>
            <BarChart3 className="w-6 h-6 text-[#8D1A42]" />
          </div>
          <p className="text-xs text-emerald-600 font-medium">↗ +12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider mb-1">ACTIVE EVENTS</p>
              <h2 className="text-2xl font-bold text-slate-800">08</h2>
            </div>
            <CalendarDays className="w-6 h-6 text-[#8D1A42]" />
          </div>
          <p className="text-xs text-slate-500">Currently published live</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider mb-1">CREDITS REMAINING</p>
              <h2 className="text-2xl font-bold text-slate-800">04</h2>
            </div>
            <Package className="w-6 h-6 text-[#8D1A42]" />
          </div>
          <p className="text-xs text-slate-500">Template slots available</p>
        </div>
      </div>

      {/* Invitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 - Published */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-40 bg-slate-200 relative">
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-semibold text-slate-800">Published</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">wedding.alexandmaria.com</h3>
            <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Dec 12, 2024
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Visitors</p>
                <p className="text-sm font-bold text-slate-800">2,482</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#8D1A42] rounded-lg text-white hover:bg-[#721535]">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Draft */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-40 bg-slate-200 relative grayscale">
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-500"></div>
              <span className="text-[10px] font-semibold text-slate-800">Draft</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">jubilee.rivera30.com</h3>
            <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Mar 05, 2025
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Visitors</p>
                <p className="text-sm font-bold text-slate-800">0</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 border border-[#8D1A42] text-[#8D1A42] rounded-lg text-xs font-semibold hover:bg-[#FDECEE]">
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Expired */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-40 bg-slate-200 relative grayscale">
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-[10px] font-semibold text-slate-800">Expired</span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">tech.summit2023.com</h3>
            <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Nov 15, 2023
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Visitors</p>
                <p className="text-sm font-bold text-slate-800">5,102</p>
              </div>
              <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50">
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* New Invitation Card */}
        <div className="rounded-xl border-2 border-dashed border-[#8D1A42]/30 bg-[#FDECEE]/30 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-[#FDECEE]/50 transition-colors">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8D1A42] shadow-sm mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-2">Launch New Invitation</h3>
          <p className="text-xs text-slate-500 max-w-[150px]">Choose from over 50+ premium curated templates</p>
        </div>
      </div>

      {/* Trending Premium Templates */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Trending Premium Templates</h2>
          <a href="/client/catalog" className="text-sm font-medium text-[#8D1A42] hover:underline">View Catalog</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'Midnight Royale', price: 'Rp 150k', sales: '428', tag: 'PREMIUM SERIES' },
            { name: 'Summit Pro', price: 'Rp 225k', sales: '312', tag: 'ENTERPRISE SERIES' },
            { name: 'Neon Party', price: 'Rp 150k', sales: '189', tag: 'CREATIVE SERIES' },
            { name: 'Elysian Night', price: 'Rp 150k', sales: '256', tag: 'DESIGNER SERIES' },
          ].map((tpl, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-40 bg-slate-800 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="p-4 relative bg-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-bold tracking-wider text-[#8D1A42] bg-[#FDECEE] px-2 py-1 rounded">
                    {tpl.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <ShoppingCart className="w-3 h-3" />
                    {tpl.sales} Sales
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-800">{tpl.name}</h3>
                <p className="text-sm font-bold text-[#8D1A42] mt-1">{tpl.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
