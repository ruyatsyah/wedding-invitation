'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Settings, Wallet, Music, Link as LinkIcon, ToggleLeft, ToggleRight } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PengaturanFormProps {
  projectId: string;
  initialData: {
    customUrl: string;
    enableRsvp: boolean;
    enableGuestbook: boolean;
    bankName: string;
    bankAccount: string;
    bankHolder: string;
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
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => { setForm(initialData); }, [initialData]);

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
          bankName: form.bankName,
          bankAccount: form.bankAccount,
          bankHolder: form.bankHolder,
          bgMusic: form.bgMusic,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      setSaveMsg('Tersimpan!');
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
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${saveMsg === 'Tersimpan!' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
              {saveMsg}
            </span>
          )}
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
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
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Pengaturan</h2>
          <p className="text-xs text-neutral-500">Konfigurasi fitur dan informasi tambahan undangan</p>
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

      {/* Rekening / Gift */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
          <Wallet className="w-4 h-4" /> Amplop Digital / Rekening
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nama Bank</label>
            <input className={inputCls} placeholder="Contoh: BCA, Mandiri, BNI" value={form.bankName} onChange={e => set('bankName', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Nomor Rekening</label>
            <input className={inputCls} placeholder="Contoh: 1234567890" value={form.bankAccount} onChange={e => set('bankAccount', e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Nama Pemilik Rekening</label>
          <input className={inputCls} placeholder="Contoh: Ahmad Fulan" value={form.bankHolder} onChange={e => set('bankHolder', e.target.value)} />
        </div>
      </div>

      {/* Background Music */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
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
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Pengaturan'}
      </button>
    </div>
  );
}
