'use client';

import React from 'react';

export default function TransactionsPage() {
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
            placeholder="Search transactions, users, or invoices..."
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
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 -mt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Financial Ledger</h1>
          <p className="text-[13px] text-slate-500 mt-1">Real-time payment monitoring and administrative reconciliation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-all shadow-sm hover:bg-slate-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer" style={{ backgroundColor: '#8D1A42' }}>
            <span>+</span> Manual Entry
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Volume */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">DAILY VOLUME</p>
            <div className="text-[#8D1A42]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[26px] font-extrabold text-slate-800">$12,480.00</p>
            <p className="text-[12px] font-medium text-emerald-600 mt-1">+14.2% from yesterday</p>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">PENDING REVIEW</p>
            <div className="text-[#8D1A42]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[26px] font-extrabold text-slate-800">24</p>
            <p className="text-[12px] font-medium text-slate-500 mt-1">Requires manual approval</p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">SUCCESS RATE</p>
            <div className="text-[#8D1A42]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[26px] font-extrabold text-slate-800">99.2%</p>
            <p className="text-[12px] font-medium text-slate-500 mt-1">Across 1,200 events</p>
          </div>
        </div>

        {/* Empty Placeholder */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between hidden lg:block opacity-50">
        </div>
      </div>

      {/* Transactions Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Filter Top Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500 font-medium">Filter by:</span>
            <div className="flex bg-slate-50 p-1 rounded-lg gap-1 border border-slate-100">
              <button className="px-4 py-1.5 bg-white text-slate-800 font-semibold rounded-md shadow-sm text-xs">All</button>
              <button className="px-4 py-1.5 text-slate-500 font-medium hover:text-slate-700 rounded-md text-xs transition-colors">Pending</button>
              <button className="px-4 py-1.5 text-slate-500 font-medium hover:text-slate-700 rounded-md text-xs transition-colors">Completed</button>
              <button className="px-4 py-1.5 text-slate-500 font-medium hover:text-slate-700 rounded-md text-xs transition-colors">Cancelled</button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Last 30 Days
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[12px] font-bold text-slate-500">
                <th className="py-4 px-6 font-sans font-medium text-slate-400">Transaction ID</th>
                <th className="py-4 px-6 font-sans font-medium text-slate-400">User / Organizer</th>
                <th className="py-4 px-6 font-sans font-medium text-slate-400">Amount</th>
                <th className="py-4 px-6 font-sans font-medium text-slate-400">Method</th>
                <th className="py-4 px-6 font-sans font-medium text-slate-400">Status</th>
                <th className="py-4 px-6 text-right font-sans font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13.5px] text-slate-700">
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap">
                  #TXN-89421
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">EL</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-[13px]">Elena Lofton</p>
                      <p className="text-[12px] text-slate-500">Premium Wedding Package</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-800">
                  $1,200.00
                </td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-[12px] text-slate-600 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11M8 14v4m4-4v4m4-4v4" />
                    </svg>
                    Wire Transfer
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex px-2.5 py-0.5 bg-[#fef5e7] text-[#c98e29] text-[10px] font-bold rounded-full uppercase tracking-wider">
                    PENDING
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="px-4 py-1.5 text-white text-[11px] font-bold rounded-md transition-colors" style={{ backgroundColor: '#8D1A42' }}>
                      Approve<br/>Payment
                    </button>
                    <button className="text-slate-400 hover:text-slate-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap">
                  #TXN-89390
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[10px] font-bold shrink-0">MR</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-[13px]">Marcus Rivera</p>
                      <p className="text-[12px] text-slate-500">Corporate Gala Credit</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-800">
                  $450.00
                </td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-[12px] text-slate-600 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Visa •• 4242
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    COMPLETED
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#8D1A42]/30 text-[#8D1A42] text-[11px] font-bold rounded-md hover:bg-rose-50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Invoice
                    </button>
                    <button className="text-slate-400 hover:text-slate-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors opacity-70 bg-slate-50/30">
                <td className="py-4 px-6 font-semibold text-slate-500 whitespace-nowrap line-through decoration-slate-300">
                  #TXN-89385
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[10px] font-bold shrink-0">SJ</div>
                    <div>
                      <p className="font-semibold text-slate-600 text-[13px] line-through decoration-slate-300">Sarah Jenkins</p>
                      <p className="text-[12px] text-slate-400">Standard RSVP Add-on</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-500 line-through decoration-slate-300">
                  $25.00
                </td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 rounded text-[12px] text-slate-500 font-medium">
                    <span className="text-[10px] font-bold border border-slate-300 rounded px-1">P</span>
                    PayPal
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex px-2.5 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider line-through decoration-slate-300">
                    CANCELLED
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-[11px] font-bold rounded-md hover:bg-slate-100 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Void
                    </button>
                    <button className="text-slate-300 hover:text-slate-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/50 transition-colors border-b border-transparent">
                <td className="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap">
                  #TXN-89372
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold shrink-0">DK</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-[13px]">David Kim</p>
                      <p className="text-[12px] text-slate-500">Annual Subscription</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-800">
                  $2,400.00
                </td>
                <td className="py-4 px-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-[12px] text-slate-600 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Amex •• 1004
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    COMPLETED
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end items-center gap-3">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#8D1A42]/30 text-[#8D1A42] text-[11px] font-bold rounded-md hover:bg-rose-50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Invoice
                    </button>
                    <button className="text-slate-400 hover:text-slate-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[12px] text-slate-500 font-medium">Showing 1 to 4 of 1,248 transactions</p>
          <div className="flex gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs bg-white cursor-pointer">‹</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#8D1A42] bg-[#8D1A42] text-white text-xs cursor-pointer shadow-sm">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs bg-white cursor-pointer">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs bg-white cursor-pointer">3</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs bg-white cursor-pointer">›</button>
          </div>
        </div>
      </div>

      {/* Bottom Charts & Protection Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Trends */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 text-[14px]">Transaction Trends</h3>
            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8D1A42]"></div>
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                Volume
              </span>
            </div>
          </div>
          
          <div className="bg-[#fcfafc] rounded-xl h-[220px] relative flex items-end justify-between pb-0 pt-10 px-6 gap-3 border border-slate-50 overflow-hidden">
            {/* Mock Chart Bars */}
            <div className="w-full flex justify-between items-end h-full relative z-10 gap-2">
              <div className="w-full bg-[#d0b8c0] rounded-t-sm h-[35%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#d0b8c0] rounded-t-sm h-[50%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#d0b8c0] rounded-t-sm h-[40%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#d0b8c0] rounded-t-sm h-[65%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#6a1230] rounded-t-sm h-[80%] opacity-100 shadow-lg"></div>
              <div className="w-full bg-[#d0b8c0] rounded-t-sm h-[55%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#d0b8c0] rounded-t-sm h-[45%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#6a1230] rounded-t-sm h-[90%] opacity-100 shadow-lg"></div>
              <div className="w-full bg-[#b895a2] rounded-t-sm h-[65%] opacity-90 hover:opacity-100 transition-opacity"></div>
              <div className="w-full bg-[#b895a2] rounded-t-sm h-[70%] opacity-90 hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <p className="text-[13px] font-bold text-slate-300 tracking-wider">Analytical Chart Visualization</p>
            </div>
          </div>
        </div>

        {/* Fraud Protection Active */}
        <div className="rounded-2xl shadow-md flex flex-col relative overflow-hidden" style={{ backgroundColor: '#8D1A42' }}>
          <div className="absolute top-4 right-4 text-white/10 pointer-events-none w-32 h-32">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
          
          <div className="p-6 pb-2 relative z-10 flex-1">
            <h3 className="font-bold text-white text-[16px] mb-3">Fraud Protection Active</h3>
            <p className="text-[13px] text-rose-100 leading-relaxed mb-6">
              The InvitoShield engine has flagged 3 transactions for suspicious IP activity in the last hour.
            </p>
          </div>

          <div className="px-6 pb-6 relative z-10">
            <div className="space-y-0 text-white text-[13px] font-medium border-t border-rose-800/50">
              <div className="flex justify-between items-center py-3 border-b border-rose-800/50">
                <span>Flagged Alerts</span>
                <span className="font-bold text-[15px]">03</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-rose-800/50">
                <span>Auto-Blocked</span>
                <span className="font-bold text-[15px]">01</span>
              </div>
            </div>
            <button className="w-full mt-5 py-2.5 bg-white text-[#8D1A42] text-[14px] font-bold rounded-lg shadow-sm hover:bg-rose-50 transition-colors">
              Review Security Hub
            </button>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="mt-8 pt-4 pb-12 flex flex-col sm:flex-row items-center justify-between text-[11.5px] text-slate-500 font-medium">
        <p>© 2024 InvitoAdmin Suite. All transactions encrypted with AES-256.</p>
        <div className="flex items-center gap-6 mt-3 sm:mt-0">
          <a href="#" className="hover:text-slate-800 transition-colors">Financial Compliance</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Data Protection</a>
          <a href="#" className="hover:text-slate-800 transition-colors">API Documentation</a>
        </div>
      </footer>
    </div>
  );
}
