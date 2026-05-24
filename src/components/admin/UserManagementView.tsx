'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Search, RefreshCw, ChevronLeft, ChevronRight,
  UserPlus, Ban, ShieldCheck, Trash2, Eye, X, Users
} from 'lucide-react';
import Image from 'next/image';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  provider: string;
  image?: string;
  banned?: boolean;
  createdAt: string;
  projectCount: number;
}

interface ApiResponse {
  success: boolean;
  data: User[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
  stats: { totalUsers: number; totalClients: number; totalAdmins: number; totalBanned: number };
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700', 'bg-rose-100 text-rose-700',
  'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700', 'bg-sky-100 text-sky-700',
];
function avatarColor(name: string) { return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]; }
function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

// ── Add User Modal ──────────────────────────────────────────────────────────
function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); setLoading(false); return; }
      onSuccess();
      onClose();
    } catch {
      setError('Terjadi kesalahan server.');
      setLoading(false);
    }
  };

  const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] bg-slate-50';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Tambah User Baru</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-2.5 rounded-lg">{error}</div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Nama Lengkap</label>
            <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nama lengkap" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
            <input className={inputCls} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@domain.com" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Password</label>
            <input className={inputCls} type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Minimal 6 karakter" required minLength={6} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role</label>
            <select className={inputCls} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Batal</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#8D1A42] hover:bg-[#721535] disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
              {loading ? 'Menyimpan...' : 'Tambah User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Detail Modal ────────────────────────────────────────────────────────────
function DetailModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Detail User</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center">
              {user.image ? (
                <Image src={user.image} alt={user.name} width={64} height={64} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className={`w-full h-full flex items-center justify-center text-xl font-bold ${avatarColor(user.name)}`}>
                  {getInitials(user.name)}
                </span>
              )}
            </div>
            <div>
              <p className="font-bold text-slate-800 text-lg">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role</p>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {user.role}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${user.banned ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {user.banned ? 'Banned' : 'Active'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Provider</p>
              <p className="font-semibold text-slate-700 capitalize">{user.provider || 'credentials'}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Undangan</p>
              <p className="font-semibold text-slate-700">{user.projectCount} project</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bergabung</p>
              <p className="font-semibold text-slate-700">
                {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function UserManagementView() {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const LIMIT = 10;

  const { data, isLoading, isFetching } = useQuery<ApiResponse>({
    queryKey: ['admin-users', search, roleFilter, statusFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams({ search, role: roleFilter, status: statusFilter, page: String(page), limit: String(LIMIT) });
      const res = await fetch(`/api/admin/users?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json;
    },
  });

  const mutate = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deleteMutate = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSearch(searchInput); setPage(1); };

  const users = data?.data ?? [];
  const stats = data?.stats;
  const pagination = data?.pagination;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#fafafc] min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#8D1A42]">User Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola semua pengguna terdaftar di platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-users'] })}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8D1A42] hover:bg-[#721535] text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Tambah User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total User', value: stats?.totalUsers, color: 'text-slate-800' },
          { label: 'Client', value: stats?.totalClients, color: 'text-blue-600' },
          { label: 'Admin', value: stats?.totalAdmins, color: 'text-purple-600' },
          { label: 'Banned', value: stats?.totalBanned, color: 'text-rose-500' },
        ].map(s => (
          <div key={s.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{isLoading ? '—' : s.value ?? 0}</p>
          </div>
        ))}
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
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Cari nama atau email..."
              className="w-full bg-slate-50 text-sm text-slate-700 pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42]"
            />
          </form>
          <div className="flex items-center gap-2">
            <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
              className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 cursor-pointer">
              <option value="all">Semua Role</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#8D1A42]/20 cursor-pointer">
              <option value="all">Semua Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Undangan</th>
                <th className="px-6 py-3">Bergabung</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-3/4" /></td>
                    ))}
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">{search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada user.'}</p>
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className={`hover:bg-slate-50/50 transition-colors ${user.banned ? 'bg-rose-50/20' : ''}`}>

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {user.image ? (
                            <Image src={user.image} alt={user.name} width={36} height={36} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                          ) : (
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${avatarColor(user.name)}`}>
                              {getInitials(user.name)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Provider */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-500 capitalize flex items-center gap-1.5">
                        {user.provider === 'google' ? (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          </svg>
                        ) : '🔑'}
                        {user.provider || 'credentials'}
                      </span>
                    </td>

                    {/* Projects */}
                    <td className="px-6 py-4 text-slate-600 text-xs">{user.projectCount} undangan</td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">{formatDate(user.createdAt)}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.banned ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.banned ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        {user.banned ? 'Banned' : 'Active'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setDetailUser(user)}
                          className="p-1.5 text-slate-400 hover:text-[#8D1A42] hover:bg-rose-50 rounded-lg transition-colors"
                          title="Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {user.banned ? (
                          <button
                            onClick={() => mutate.mutate({ id: user._id, action: 'unban' })}
                            disabled={mutate.isPending}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg transition-colors disabled:opacity-50"
                            title="Aktifkan"
                          >
                            <ShieldCheck className="w-3 h-3" />
                            Aktifkan
                          </button>
                        ) : (
                          <button
                            onClick={() => mutate.mutate({ id: user._id, action: 'ban' })}
                            disabled={mutate.isPending}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-semibold rounded-lg transition-colors disabled:opacity-50"
                            title="Ban"
                          >
                            <Ban className="w-3 h-3" />
                            Ban
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (confirm(`Hapus user "${user.name}"? Tindakan ini tidak bisa dibatalkan.`)) {
                              deleteMutate.mutate(user._id);
                            }
                          }}
                          disabled={deleteMutate.isPending}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Menampilkan {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, pagination.total)} dari {pagination.total} user
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors ${page === p ? 'bg-[#8D1A42] border-[#8D1A42] text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['admin-users'] })}
        />
      )}
      {detailUser && <DetailModal user={detailUser} onClose={() => setDetailUser(null)} />}
    </div>
  );
}
