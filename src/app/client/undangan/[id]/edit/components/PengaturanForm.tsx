'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Settings, Link as LinkIcon, ToggleLeft, ToggleRight } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface PengaturanFormProps {
  projectId: string;
  initialData: {
    customUrl: string;
    enableRsvp: boolean;
    enableGuestbook: boolean;
    bgMusic: string;
  };
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

function Toggle({ enabled, onToggle, label, description }: { enabled: boolean; onToggle: () => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-neutral-800">{label}</p>
        {description && <p className="text-xs text-neutral-400 mt-0.5">{description}</p>}
      </div>
      <button onClick={onToggle} className="flex-shrink-0 ml-4 transition-colors">
        {enabled
          ? <ToggleRight className="w-8 h-8 text-neutral-900" />
          : <ToggleLeft className="w-8 h-8 text-neutral-300" />
        }
      </button>
    </div>
  );
}

export default function PengaturanForm({ projectId, initialData, onBack }: PengaturanFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialData);
  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enableRsvp: form.enableRsvp,
          enableGuestbook: form.enableGuestbook,
          bgMusic: form.bgMusic,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Pengaturan berhasil disimpan!');
    },
    onError: () => {
      toast.error('Gagal menyimpan pengaturan.');
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
            <h2 className="text-lg font-bold text-neutral-900">Pengaturan</h2>
            <p className="text-xs text-neutral-500">Konfigurasi fitur dan informasi tambahan undangan</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* URL (Read Only) */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
          <LinkIcon className="w-4 h-4" /> Tautan Undangan
        </h3>
        <div>
          <label className={labelCls}>Custom URL</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400 whitespace-nowrap">kabarbaik.co/</span>
            <input
              className={`${inputCls} bg-neutral-50 text-neutral-500 cursor-not-allowed`}
              value={form.customUrl}
              readOnly
              title="URL tidak bisa diubah untuk menghindari tautan undangan rusak."
            />
          </div>
          <p className="text-[11px] text-neutral-400 mt-1.5">URL tidak dapat diubah agar tautan undangan yang sudah disebar tetap berfungsi.</p>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-700 mb-2">Fitur Undangan</h3>
        <div className="divide-y divide-neutral-100">
          <Toggle
            enabled={form.enableRsvp}
            onToggle={() => set('enableRsvp', !form.enableRsvp)}
            label="Konfirmasi Kehadiran (RSVP)"
            description="Tamu dapat mengonfirmasi kehadiran mereka"
          />
          <Toggle
            enabled={form.enableGuestbook}
            onToggle={() => set('enableGuestbook', !form.enableGuestbook)}
            label="Buku Tamu & Ucapan"
            description="Tamu dapat meninggalkan pesan dan doa"
          />
        </div>
      </div>



      {/* Save Footer */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Pengaturan'}
      </button>
    </div>
  );
}
