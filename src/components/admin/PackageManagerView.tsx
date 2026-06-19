'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

interface Package {
  _id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  period: string;
  popular: boolean;
  features: string[];
  cta: string;
  sortOrder: number;
}

export default function PackageManagerView() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    price: '',
    originalPrice: '',
    period: '',
    popular: false,
    features: '',
    cta: '',
    sortOrder: 0,
  });

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await fetch('/api/packages');
      const data = await res.json();
      return data.data as Package[];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (pkg: Partial<Package>) => {
      const method = pkg._id ? 'PUT' : 'POST';
      const url = pkg._id ? `/api/packages?id=${pkg._id}` : '/api/packages';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pkg),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      setIsModalOpen(false);
      setEditingPackage(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/packages?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      tagline: pkg.tagline,
      price: pkg.price,
      originalPrice: pkg.originalPrice || '',
      period: pkg.period,
      popular: pkg.popular,
      features: pkg.features.join('\n'),
      cta: pkg.cta,
      sortOrder: pkg.sortOrder,
    });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      tagline: '',
      price: '',
      originalPrice: '',
      period: '',
      popular: false,
      features: '',
      cta: '',
      sortOrder: packages.length,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      _id: editingPackage?._id,
      ...formData,
      features: formData.features.split('\n').map(f => f.trim()).filter(f => f),
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#fafafc] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#8D1A42]">Paket Harga</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola paket harga yang ditampilkan di landing page.</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#8D1A42] text-white rounded-lg hover:bg-[#721535] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Paket
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg._id} className={`bg-white rounded-2xl p-6 border ${pkg.popular ? 'border-[#8D1A42] shadow-md' : 'border-slate-200 shadow-sm'} relative flex flex-col`}>
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8D1A42] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Paling Populer
                </span>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800">{pkg.name}</h3>
                <p className="text-sm text-slate-500">{pkg.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {pkg.originalPrice && (
                    <span className="text-sm line-through text-slate-400 mr-1">{pkg.originalPrice}</span>
                  )}
                  <span className="text-2xl font-extrabold text-slate-900">{pkg.price}</span>
                  <span className="text-xs text-slate-500">/ {pkg.period}</span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-slate-600 flex-1 mb-6">
                {pkg.features.map((feat, i) => {
                  const isExcluded = feat.startsWith('-');
                  const cleanFeat = isExcluded ? feat.substring(1).trim() : feat.replace(/^\+/, '').trim();
                  return (
                    <li key={i} className="flex items-center gap-2">
                      {isExcluded ? (
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      <span className={isExcluded ? 'text-slate-400 line-through' : ''}>{cleanFeat}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Paket"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Yakin ingin menghapus paket ${pkg.name}?`)) {
                      deleteMutation.mutate(pkg._id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Hapus Paket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Edit/Create */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {editingPackage ? 'Edit Paket Harga' : 'Tambah Paket Harga'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Paket</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                    placeholder="Contoh: Bronze"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                  <input
                    required
                    type="text"
                    value={formData.tagline}
                    onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                    placeholder="Contoh: Coba dulu gratis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Harga Tampil</label>
                  <input
                    required
                    type="text"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                    placeholder="Contoh: Rp 0, Rp 49.000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Harga Coret / Diskon (Opsional)</label>
                  <input
                    type="text"
                    value={formData.originalPrice}
                    onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                    placeholder="Contoh: Rp 99.000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Masa Aktif / Periode</label>
                  <input
                    required
                    type="text"
                    value={formData.period}
                    onChange={e => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                    placeholder="Contoh: 3 hari, 1 bulan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teks Tombol (CTA)</label>
                  <input
                    required
                    type="text"
                    value={formData.cta}
                    onChange={e => setFormData({ ...formData, cta: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                    placeholder="Contoh: Coba Gratis, Pilih Silver"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Urutan Tampil (Sort Order)</label>
                  <input
                    required
                    type="number"
                    value={formData.sortOrder}
                    onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Fitur <span className="font-normal text-slate-500">(1 baris = 1 fitur. Awali dengan "-" untuk fitur yang disilang)</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.features}
                  onChange={e => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#8D1A42]/20 focus:border-[#8D1A42] outline-none"
                  placeholder="3 Tema Standar&#10;- Galeri Video&#10;- Layar Tamu Proyektor"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={e => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-[#8D1A42] rounded border-slate-300 focus:ring-[#8D1A42]"
                />
                <label htmlFor="popular" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Tandai sebagai "Paling Populer"
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#8D1A42] hover:bg-[#721535] rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
