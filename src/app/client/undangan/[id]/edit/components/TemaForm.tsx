'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, Palette, Check } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface TemaFormProps {
  projectId: string;
  initialThemeId?: string;
  onBack: () => void;
}

interface Template {
  _id: string;
  templateName: string;
  thumbnailUrl: string;
  price: number;
}

export default function TemaForm({ projectId, initialThemeId, onBack }: TemaFormProps) {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(initialThemeId || '');
  const [saveMsg, setSaveMsg] = useState('');

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data as Template[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId: selectedId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      setSaveMsg('Tema berhasil disimpan!');
      setTimeout(() => setSaveMsg(''), 3000);
    },
    onError: () => {
      setSaveMsg('Gagal menyimpan.');
      setTimeout(() => setSaveMsg(''), 3000);
    },
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${saveMsg.includes('berhasil') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
              {saveMsg}
            </span>
          )}
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending || !selectedId}
            className="flex items-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
        <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Pilih Tema</h2>
          <p className="text-xs text-neutral-500">Pilih desain undangan yang sesuai dengan keinginan Anda</p>
        </div>
      </div>

      {/* Template Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 text-sm">Belum ada tema tersedia.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {templates.map((t) => (
            <button
              key={t._id}
              onClick={() => setSelectedId(t._id)}
              className={`relative group text-left rounded-2xl overflow-hidden border-2 transition-all focus:outline-none ${
                selectedId === t._id ? 'border-neutral-900 shadow-lg scale-[1.02]' : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="aspect-[3/4] bg-neutral-100">
                {t.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.thumbnailUrl} alt={t.templateName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">No preview</div>
                )}
              </div>
              <div className="p-3 bg-white border-t border-neutral-100">
                <p className="text-xs font-bold text-neutral-800 truncate">{t.templateName}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t.price === 0 ? 'Gratis' : `Rp ${t.price.toLocaleString('id-ID')}`}
                </p>
              </div>
              {selectedId === t._id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
