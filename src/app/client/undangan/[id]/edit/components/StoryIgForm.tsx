'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface StoryIgFormProps {
  projectId: string;
  initialData: {
    igStoryUrl: string;
  };
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function StoryIgForm({ projectId, initialData, onBack }: StoryIgFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    igStoryUrl: ''
  });

  useEffect(() => {
    setForm({
      igStoryUrl: initialData.igStoryUrl || ''
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
      toast.success('Filter Story IG berhasil disimpan!');
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
            <h2 className="text-lg font-bold text-neutral-900">Story IG</h2>
            <p className="text-xs text-neutral-500">Tautan filter Instagram</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelCls}>Tautan Filter Instagram (URL)</label>
          <input
            className={inputCls}
            placeholder="https://www.instagram.com/ar/..."
            value={form.igStoryUrl}
            onChange={e => setForm({ igStoryUrl: e.target.value })}
          />
          <p className="text-xs text-neutral-400 mt-2">
            Masukkan link filter Instagram yang sudah Anda buat agar tamu undangan bisa menggunakannya saat acara.
          </p>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Tautan'}
      </button>
    </div>
  );
}
