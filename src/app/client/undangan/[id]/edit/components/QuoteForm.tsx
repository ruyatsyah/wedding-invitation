'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Quote } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface QuoteFormProps {
  projectId: string;
  initialData: {
    quoteText: string;
    quoteSource: string;
  };
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function QuoteForm({ projectId, initialData, onBack }: QuoteFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    quoteText: '',
    quoteSource: ''
  });

  useEffect(() => {
    setForm({
      quoteText: initialData.quoteText || '',
      quoteSource: initialData.quoteSource || ''
    });
  }, [initialData]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Data quote berhasil disimpan!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Gagal menyimpan. Coba lagi.');
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="flex items-center gap-3 text-right">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Quote / Kutipan</h2>
            <p className="text-xs text-neutral-500">Kutipan cinta atau ayat suci</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Quote className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelCls}>Isi Kutipan</label>
          <textarea
            className={`${inputCls} min-h-[120px] resize-y`}
            placeholder="Contoh: Dan di antara tanda-tanda kekuasaan-Nya..."
            value={form.quoteText}
            onChange={e => setForm(f => ({ ...f, quoteText: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelCls}>Sumber / Penulis</label>
          <input
            className={inputCls}
            placeholder="Contoh: QS. Ar-Rum: 21"
            value={form.quoteSource}
            onChange={e => setForm(f => ({ ...f, quoteSource: e.target.value }))}
          />
        </div>
      </div>

      {/* Save */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Quote'}
      </button>
    </div>
  );
}
