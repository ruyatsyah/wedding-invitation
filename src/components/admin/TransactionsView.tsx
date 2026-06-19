'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  _id: string;
  coupleName: string;
  clientName: string;
  customUrl: string;
  status: 'pending' | 'active' | 'expired';
  priceSnapshot: number;
  plan?: string;
  activatedAt?: string;
  expiresAt?: string;
  createdAt: string;
  userId?: { _id: string; name: string; email: string };
  themeId?: { _id: string; templateName: string };
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface Stats {
  totalAll: number;
  totalActive: number;
  totalExpired: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getPackage(planName: string = 'Bronze'): { label: string; color: string; bg: string } {
  const normalized = planName.toLowerCase();
  if (normalized === 'silver') return { label: 'Silver', color: '#475569', bg: '#f1f5f9' };
  if (normalized === 'gold')   return { label: 'Gold',   color: '#854d0e', bg: '#fef9c3' };
  return                              { label: 'Bronze', color: '#92400e', bg: '#fef3c7' };
}

function getStatusBadge(status: string) {
  if (status === 'active' || status === 'pending')   return { label: 'Success',   color: '#065f46', bg: '#d1fae5' };
  if (status === 'expired')                          return { label: 'Expired',   color: '#dc2626', bg: '#fee2e2' };
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}



function initials(name?: string) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = ['#6366f1','#0891b2','#0d9488','#7c3aed','#db2777','#ea580c','#16a34a'];
function avatarColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

const STATUS_TABS = [
  { key: 'all',     label: 'Semua' },
  { key: 'pending', label: 'Failed' },
  { key: 'active',  label: 'Success' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function TransactionsView() {
  const queryClient = useQueryClient();
  const [activeStatus, setActiveStatus] = useState('all');
  const [search, setSearch]             = useState('');
  const [page, setPage]                 = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects', activeStatus, search, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        status: activeStatus,
        search,
        page: String(page),
        limit: '10',
      });
      const res = await fetch(`/api/admin/projects?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json as { data: Project[]; pagination: Pagination; stats: Stats };
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  const projects: Project[]   = data?.data ?? [];
  const pagination            = data?.pagination;
  const stats                 = data?.stats;

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#fafafc] min-h-screen">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Invoice & Transaksi</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Kelola semua transaksi dan status pembayaran pelanggan.</p>
        </div>
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Cari nama, user, url..."
            className="w-full bg-white border border-slate-200 text-[13px] text-slate-700 pl-9 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42]/40 transition-all placeholder-slate-400"
          />
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Transaksi', value: stats?.totalAll ?? '-',    icon: '📋', color: '#8D1A42' },
          { label: 'Aktif',           value: stats?.totalActive ?? '-', icon: '✅', color: '#059669' },
          { label: 'Pending',         value: (stats ? stats.totalAll - stats.totalActive - stats.totalExpired : '-'), icon: '⏳', color: '#d97706' },
          { label: 'Expired',         value: stats?.totalExpired ?? '-', icon: '❌', color: '#dc2626' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div className="text-2xl">{s.icon}</div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-extrabold text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Filter Tabs */}
        <div className="px-5 pt-4 pb-0 border-b border-slate-100">
          <div className="flex items-center gap-1">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveStatus(tab.key); setPage(1); }}
                className={`px-4 py-2 text-[13px] font-semibold rounded-t-lg border-b-2 transition-colors ${
                  activeStatus === tab.key
                    ? 'border-[#8D1A42] text-[#8D1A42] bg-rose-50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5">Transaction ID</th>
                <th className="py-3 px-5">User</th>
                <th className="py-3 px-5">Paket</th>
                <th className="py-3 px-5">Tanggal Buat</th>
                <th className="py-3 px-5">Amount</th>
                <th className="py-3 px-5">Method</th>
                <th className="py-3 px-5 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">

              {isLoading && (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 9 }).map((__, j) => (
                      <td key={j} className="py-4 px-5">
                        <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              )}

              {!isLoading && projects.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-slate-400 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Tidak ada transaksi ditemukan.</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && projects.map(proj => {
                const pkg    = getPackage(proj.plan);
                const badge  = getStatusBadge(proj.status);
                const userId = proj.userId?._id ?? proj._id;
                const bg     = avatarColor(userId);
                const shortId = proj._id.slice(-8).toUpperCase();

                return (
                  <tr key={proj._id} className="hover:bg-slate-50/60 transition-colors">

                    {/* Transaction ID */}
                    <td className="py-4 px-5 font-mono font-semibold text-slate-700 text-[12px] whitespace-nowrap">
                      #{shortId}
                    </td>

                    {/* User */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ backgroundColor: bg }}
                        >
                          {initials(proj.userId?.name ?? proj.clientName)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-[13px] leading-tight">
                            {proj.userId?.name ?? proj.clientName}
                          </p>
                          <p className="text-[11px] text-slate-400">{proj.userId?.email ?? proj.coupleName}</p>
                        </div>
                      </div>
                    </td>

                    {/* Paket */}
                    <td className="py-4 px-5">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                        style={{ color: pkg.color, backgroundColor: pkg.bg }}
                      >
                        {pkg.label === 'Gold'   && '🥇'}
                        {pkg.label === 'Silver' && '🥈'}
                        {pkg.label === 'Bronze' && '🥉'}
                        {pkg.label}
                      </span>
                    </td>

                    {/* Tanggal Buat */}
                    <td className="py-4 px-5 text-[12px] text-slate-600">
                      {proj.createdAt ? new Date(proj.createdAt).toLocaleDateString('id-ID', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }) : '-'}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-5 font-semibold text-slate-800 whitespace-nowrap">
                      {proj.priceSnapshot > 0 ? formatRp(proj.priceSnapshot) : (
                        <span className="text-emerald-600 font-bold text-[12px]">GRATIS</span>
                      )}
                    </td>

                    {/* Method */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-[12px] text-slate-600 font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Transfer Bank
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 text-left">
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: badge.color, backgroundColor: badge.bg }}
                      >
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[12px] text-slate-500">
              Menampilkan {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} transaksi
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs disabled:opacity-40"
              >‹</button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === pagination.totalPages || Math.abs(n - page) <= 1)
                .map((n, idx, arr) => (
                  <React.Fragment key={n}>
                    {idx > 0 && arr[idx - 1] !== n - 1 && (
                      <span className="w-7 h-7 flex items-center justify-center text-slate-400 text-xs">…</span>
                    )}
                    <button
                      onClick={() => setPage(n)}
                      className={`w-7 h-7 flex items-center justify-center rounded border text-xs transition-colors ${
                        n === page
                          ? 'border-[#8D1A42] bg-[#8D1A42] text-white shadow-sm'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50 bg-white'
                      }`}
                    >{n}</button>
                  </React.Fragment>
                ))}
              <button
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs disabled:opacity-40"
              >›</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
