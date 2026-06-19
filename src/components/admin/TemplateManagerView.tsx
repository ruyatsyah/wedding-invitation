'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, X, AlertTriangle } from 'lucide-react';

interface Template {
  _id: string;
  templateName: string;
  price: number;
  discount: number;
  thumbnailUrl: string;
  sourceCodeUrl: string;
  enableWaBlast: boolean;
  guestListOnly: boolean;
  dailyLimit: number;
  publishImmediately: boolean;
  showOnLanding: boolean;
  createdAt: string;
}

// ── Confirm Delete Modal ────────────────────────────────────────────────────
function ConfirmDeleteModal({
  template,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  template: Template;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-bold text-slate-800">Hapus Template</h2>
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Template preview */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={template.thumbnailUrl}
              alt={template.templateName}
              className="w-14 h-18 object-cover rounded-lg border border-slate-200 flex-shrink-0"
              style={{ height: '4.5rem' }}
            />
            <div className="min-w-0">
              <p className="font-bold text-slate-800 truncate">{template.templateName}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {template.publishImmediately ? '✅ Published' : '📝 Draft'}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Apakah Anda yakin ingin menghapus template{' '}
            <span className="font-semibold text-slate-800">"{template.templateName}"</span>?
            Tindakan ini <span className="text-rose-600 font-semibold">tidak dapat dibatalkan</span> dan
            template akan dihapus secara permanen.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Undangan yang sudah menggunakan template ini tidak akan terpengaruh, namun template tidak akan tersedia untuk pembuatan undangan baru.
            </p>
          </div>
        </div>

        {/* Footer */}
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
                Ya, Hapus Template
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function TemplateManagerView() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);

  const { data: templates = [], isLoading, error, refetch } = useQuery({
    queryKey: ['templates', 'admin'],
    queryFn: async () => {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal memuat data template.');
      return data.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/templates?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menghapus template.');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      setTemplateToDelete(null);
    },
  });

  const toggleLandingMutation = useMutation({
    mutationFn: async ({ id, showOnLanding }: { id: string, showOnLanding: boolean }) => {
      const res = await fetch(`/api/templates?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showOnLanding })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal update status.');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  const filtered = templates.filter((t) =>
    t.templateName.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = templates.filter((t) => t.publishImmediately).length;
  const draftCount = templates.filter((t) => !t.publishImmediately).length;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari template..."
            className="w-full bg-[#f1f3f6] text-[13px] text-slate-700 pl-10 pr-4 py-2 rounded-full outline-none focus:ring-1 focus:ring-[#8D1A42]/20 border border-transparent focus:border-[#8D1A42]/30 transition-all placeholder-slate-400"
          />
        </div>
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
        >
          <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </header>

      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#8D1A42' }}>Template Repository</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola dan kustomisasi aset undangan digital Anda.</p>
        </div>
        <Link
          href="/admin/tema/add"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
          style={{ backgroundColor: '#8D1A42' }}
        >
          <span>+</span> Add Template
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">TOTAL TEMPLATES</p>
          <span className="text-3xl font-extrabold text-slate-800">{templates.length}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">AKTIF / PUBLISHED</p>
          <span className="text-3xl font-extrabold" style={{ color: '#8D1A42' }}>{activeCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-3">DRAFT</p>
          <span className="text-3xl font-extrabold text-slate-500">{draftCount}</span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-slate-100" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-100 rounded w-2/3" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="flex gap-3 pt-2">
                  <div className="h-9 bg-slate-100 rounded-lg flex-1" />
                  <div className="h-9 w-9 bg-slate-100 rounded-lg" />
                  <div className="h-9 w-9 bg-slate-100 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-5 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{(error as Error).message}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <svg className="w-14 h-14 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <div className="text-center">
            <p className="font-semibold text-slate-700">
              {search ? `Tidak ada template untuk "${search}"` : 'Belum ada template'}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {search ? 'Coba kata kunci lain.' : 'Klik "+ Add Template" untuk membuat template pertama Anda.'}
            </p>
          </div>
          {!search && (
            <Link
              href="/admin/tema/add"
              className="mt-2 px-5 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: '#8D1A42' }}
            >
              + Add Template
            </Link>
          )}
        </div>
      )}

      {/* Templates Grid */}
      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <div key={template._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.thumbnailUrl}
                  alt={template.templateName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    template.publishImmediately
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}>
                    {template.publishImmediately ? 'Published' : 'Draft'}
                  </span>
                </div>
                {/* Price */}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow-sm">
                  <span className="font-bold text-sm" style={{ color: '#8D1A42' }}>
                    {template.discount > 0 ? (
                      <>
                        <span className="line-through text-slate-400 text-xs mr-1">
                          {formatPrice(template.price)}
                        </span>
                        {formatPrice(template.price * (1 - template.discount / 100))}
                      </>
                    ) : formatPrice(template.price)}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 text-[15px] mb-3 truncate">{template.templateName}</h3>

                <div className="space-y-1.5 mb-5">
                  <div className={`flex items-center gap-2 text-[13px] ${template.enableWaBlast ? 'text-slate-700' : 'text-slate-400'}`}>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span>WA Blast {template.enableWaBlast ? 'Aktif' : 'Nonaktif'}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-[13px] ${template.guestListOnly ? 'text-slate-700' : 'text-slate-400'}`}>
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{template.guestListOnly ? 'Guest List Only' : 'Guest List Management'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(template.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  {template.sourceCodeUrl.toLowerCase().endsWith('.zip') ? (
                    <div className="flex-1 py-2 border border-amber-200 rounded-lg text-sm font-semibold text-amber-600 bg-amber-50 text-center cursor-not-allowed" title="Upload ulang template ini — format ZIP lama tidak didukung">
                      ⚠ Upload Ulang
                    </div>
                  ) : (
                    <a
                      href={template.sourceCodeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors text-center"
                    >
                      Preview
                    </a>
                  )}
                  <button
                    onClick={() => toggleLandingMutation.mutate({ id: template._id, showOnLanding: !template.showOnLanding })}
                    disabled={toggleLandingMutation.isPending}
                    className={`px-3 py-2 border rounded-lg transition-colors flex items-center justify-center ${
                      template.showOnLanding
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                        : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                    }`}
                    title={template.showOnLanding ? 'Sembunyikan dari Landing' : 'Tampilkan di Landing'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {template.showOnLanding ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                      {template.showOnLanding && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                  <button
                    onClick={() => setTemplateToDelete(template)}
                    className="px-3 py-2 border border-rose-200 rounded-lg text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-colors flex items-center justify-center"
                    title="Hapus Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {templateToDelete && (
        <ConfirmDeleteModal
          template={templateToDelete}
          onConfirm={() => deleteMutation.mutate(templateToDelete._id)}
          onCancel={() => setTemplateToDelete(null)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
