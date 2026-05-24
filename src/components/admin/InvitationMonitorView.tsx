'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Eye, Ban, RefreshCw, ExternalLink, ChevronLeft, ChevronRight, Trash2, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';

interface Project {
  _id: string;
  coupleName: string;
  customUrl: string;
  clientName: string;
  status: 'active' | 'pending' | 'expired';
  priceSnapshot: number;
  createdAt: string;
  userId?: { _id: string; name: string; email: string; image?: string };
  themeId?: { templateName: string; thumbnailUrl: string };
}

interface ApiResponse {
  success: boolean;
  data: Project[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
  stats: { totalAll: number; totalActive: number; totalExpired: number };
}

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired / Banned' },
];

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700', 'bg-rose-100 text-rose-700',
  'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700', 'bg-sky-100 text-sky-700',
];
function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

// ── Confirm Delete Modal ──────────────────────────────────────────────────────
function ConfirmDeleteModal({
  project,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  project: Project;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-bold text-slate-800">Hapus Undangan</h2>
          </div>
          <button onClick={onCancel} disabled={isDeleting} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 disabled:opacity-50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Preview */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {project.themeId?.thumbnailUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.themeId.thumbnailUrl} alt="tema" className="w-12 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <p className="font-bold text-slate-800 truncate">{project.coupleName || '—'}</p>
              <p className="text-xs text-[#8D1A42] font-mono mt-0.5">kabarbaik.co/{project.customUrl}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Client: {project.userId?.name || project.clientName || 'Unknown'}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Apakah Anda yakin ingin menghapus undangan{' '}
            <span className="font-semibold text-slate-800">"{project.coupleName}"</span>?
            Tindakan ini <span className="text-rose-600 font-semibold">tidak dapat dibatalkan</span>.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Semua data undangan termasuk informasi mempelai, tamu, dan ucapan akan dihapus permanen.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Ya, Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvitationMonitorView() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const LIMIT = 10;

  const { data, isLoading, isFetching } = useQuery<ApiResponse>({
    queryKey: ['admin-projects', search, statusFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams({ search, status: statusFilter, page: String(page), limit: String(LIMIT) });
      const res = await fetch(`/api/admin/projects?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setProjectToDelete(null);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const projects = data?.data ?? [];
  const stats = data?.stats;
  const pagination = data?.pagination;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#fafafc] min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#8D1A42]">Invitation Monitor</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola dan pantau semua undangan yang dibuat oleh client.</p>
        </div>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-projects'] })}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">Total Undangan</p>
          <p className="text-3xl font-bold text-slate-800">{isLoading ? '—' : stats?.totalAll ?? 0}</p>
          <p className="text-xs text-slate-400 mt-1">Semua project terdaftar</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">Undangan Aktif</p>
          <p className="text-3xl font-bold text-emerald-600">{isLoading ? '—' : stats?.totalActive ?? 0}</p>
          <p className="text-xs text-slate-400 mt-1">Sedang live & dapat diakses</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">Expired / Banned</p>
          <p className="text-3xl font-bold text-rose-500">{isLoading ? '—' : stats?.totalExpired ?? 0}</p>
          <p className="text-xs text-slate-400 mt-1">Tidak aktif atau dinonaktifkan</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari nama, URL, atau client..."
              className="w-full bg-slate-50 text-sm text-slate-700 pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] transition-all"
            />
          </form>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 cursor-pointer"
          >
            {STATUS_FILTER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Mempelai / URL</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Tema</th>
                <th className="px-6 py-3">Tanggal Buat</th>
                <th className="px-6 py-3">Harga</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-slate-100 rounded w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400 text-sm">
                    {search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada undangan.'}
                  </td>
                </tr>
              ) : (
                projects.map((project) => {
                  const ownerName = project.userId?.name || project.clientName || 'Unknown';
                  const ownerEmail = project.userId?.email || '';
                  const isExpired = project.status === 'expired';

                  return (
                    <tr key={project._id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Mempelai / URL */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{project.coupleName || '—'}</p>
                        <a
                          href={`/${project.customUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-[#8D1A42] hover:underline flex items-center gap-1 mt-0.5"
                        >
                          kabarbaik.co/{project.customUrl}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          {project.userId?.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.userId.image}
                              alt={ownerName}
                              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${avatarColor(ownerName)}`}>
                              {getInitials(ownerName)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{ownerName}</p>
                            <p className="text-[11px] text-slate-400 truncate">{ownerEmail}</p>
                          </div>
                        </div>
                      </td>
                      {/* Tema */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {project.themeId?.thumbnailUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.themeId.thumbnailUrl}
                              alt={project.themeId.templateName}
                              className="w-8 h-10 rounded object-cover border border-slate-200 flex-shrink-0"
                            />
                          )}
                          <span className="text-xs text-slate-600 truncate max-w-[100px]">
                            {project.themeId?.templateName || '—'}
                          </span>
                        </div>
                      </td>

                      {/* Tanggal */}
                      <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">
                        {formatDate(project.createdAt)}
                      </td>

                      {/* Harga */}
                      <td className="px-6 py-4 text-slate-700 text-xs font-medium whitespace-nowrap">
                        {formatPrice(project.priceSnapshot)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                          project.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : project.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-rose-100 text-rose-600'
                        }`}>
                          {project.status === 'expired' ? 'Banned/Expired' : project.status}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/${project.customUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-400 hover:text-[#8D1A42] transition-colors"
                            title="Lihat Undangan"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {isExpired ? (
                            <button
                              onClick={() => updateStatusMutation.mutate({ id: project._id, status: 'active' })}
                              disabled={updateStatusMutation.isPending}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg transition-colors disabled:opacity-50"
                              title="Aktifkan kembali"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Aktifkan
                            </button>
                          ) : (
                            <button
                              onClick={() => updateStatusMutation.mutate({ id: project._id, status: 'expired' })}
                              disabled={updateStatusMutation.isPending}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-semibold rounded-lg transition-colors disabled:opacity-50"
                              title="Ban / Nonaktifkan"
                            >
                              <Ban className="w-3 h-3" />
                              Ban
                            </button>
                          )}

                          <button
                            onClick={() => setProjectToDelete(project)}
                            disabled={deleteMutation.isPending}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Hapus Undangan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Menampilkan {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, pagination.total)} dari {pagination.total} undangan
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-[#8D1A42] border-[#8D1A42] text-white'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {projectToDelete && (
        <ConfirmDeleteModal
          project={projectToDelete}
          onConfirm={() => deleteMutation.mutate(projectToDelete._id)}
          onCancel={() => setProjectToDelete(null)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
