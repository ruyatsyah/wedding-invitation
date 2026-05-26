'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, CalendarDays, MapPin, Video } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AcaraFormProps {
  projectId: string;
  initialData: {
    eventDate: string;
    eventTime: string;
    eventTimezone: string;
    venue: string;
    mapsUrl: string;
    youtubeUrl: string;
  };
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function AcaraForm({ projectId, initialData, onBack }: AcaraFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialData);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => { setForm(initialData); }, [initialData]);

  const set = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

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
          <CalendarDays className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Detail Acara</h2>
          <p className="text-xs text-neutral-500">Atur tanggal, waktu, dan lokasi pernikahan</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" /> Waktu Acara
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Tanggal</label>
            <input type="date" className={inputCls} value={form.eventDate} onChange={e => set('eventDate', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Jam</label>
            <input type="time" className={inputCls} value={form.eventTime} onChange={e => set('eventTime', e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Zona Waktu</label>
          <select className={inputCls} value={form.eventTimezone} onChange={e => set('eventTimezone', e.target.value)}>
            <option value="WIB (GMT+7)">WIB (GMT+7)</option>
            <option value="WITA (GMT+8)">WITA (GMT+8)</option>
            <option value="WIT (GMT+9)">WIT (GMT+9)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Lokasi & Venue
        </h3>
        <div>
          <label className={labelCls}>Nama & Alamat Venue</label>
          <textarea
            className={`${inputCls} min-h-[90px] resize-y`}
            placeholder="Contoh: Gedung Graha Pancasila, Jl. Merdeka No. 1, Jakarta Selatan"
            value={form.venue}
            onChange={e => set('venue', e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Link Google Maps</label>
          <input
            className={inputCls}
            placeholder="https://maps.google.com/..."
            value={form.mapsUrl}
            onChange={e => set('mapsUrl', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
          <Video className="w-4 h-4" /> Video / Livestream
        </h3>
        <div>
          <label className={labelCls}>Link YouTube / Livestream</label>
          <input
            className={inputCls}
            placeholder="https://youtube.com/watch?v=..."
            value={form.youtubeUrl}
            onChange={e => set('youtubeUrl', e.target.value)}
          />
          <p className="text-[11px] text-neutral-400 mt-1.5">Opsional. Akan ditampilkan sebagai tombol nonton di undangan.</p>
        </div>
      </div>

      {/* Save Footer */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Detail Acara'}
      </button>
    </div>
  );
}
