'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Music } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface MusikFormProps {
  projectId: string;
  initialData: {
    bgMusic: string;
  };
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function MusikForm({ projectId, initialData, onBack }: MusikFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialData);

  useEffect(() => { setForm(initialData); }, [initialData]);

  const set = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bgMusic: form.bgMusic,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Musik latar berhasil disimpan!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Gagal menyimpan musik latar.');
    },
  });

  return (
    <div className="space-y-6">
      {/* Header & Section Title */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="flex items-center gap-3 text-right">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Musik Latar</h2>
            <p className="text-xs text-neutral-500">Atur musik latar yang diputar saat undangan dibuka</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Music className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Background Music */}
      <div className="bg-neutral-50/50 rounded-2xl border border-neutral-100 p-5">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2 mb-4">
          <Music className="w-4 h-4" /> Musik Latar
        </h3>
        <div>
          <label className={labelCls}>Link Audio / YouTube</label>
          <input
            className={inputCls}
            placeholder="https://www.youtube.com/watch?v=... atau link MP3"
            value={form.bgMusic}
            onChange={e => set('bgMusic', e.target.value)}
          />
          <p className="text-[11px] text-neutral-400 mt-1.5">Masukkan link YouTube atau URL file MP3 untuk musik latar undangan.</p>
        </div>
      </div>

      {/* Save Footer */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-xl font-bold text-sm transition-colors cursor-pointer mt-4"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Musik Latar'}
      </button>
    </div>
  );
}
