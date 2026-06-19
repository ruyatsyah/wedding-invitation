'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Camera, X, Save, AtSign, Users } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface PengantinFormProps {
  projectId: string;
  initialData: {
    coupleName: string;
    groomFullName: string;
    groomParents: string;
    groomInstagram: string;
    groomPhoto: string;
    brideFullName: string;
    brideParents: string;
    brideInstagram: string;
    bridePhoto: string;
  };
  onBack: () => void;
}

function PhotoSlot({
  label, slot, currentUrl, uploading, onUpload, onRemove,
}: {
  label: string; slot: string; currentUrl: string;
  uploading: boolean; onUpload: (slot: string, file: File) => void; onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-dashed border-neutral-300 bg-neutral-50 cursor-pointer hover:border-neutral-600 transition-colors group flex items-center justify-center"
      >
        {currentUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : uploading ? (
          <svg className="animate-spin w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <div className="flex flex-col items-center gap-1 text-neutral-400">
            <Camera className="w-6 h-6" />
            <span className="text-[10px] font-semibold">Upload</span>
          </div>
        )}
        <input
          ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => { const file = e.target.files?.[0]; if (file) onUpload(slot, file); e.target.value = ''; }}
          disabled={uploading}
        />
      </div>
      <span className="text-xs font-semibold text-neutral-600">{label}</span>
    </div>
  );
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function PengantinForm({ projectId, initialData, onBack }: PengantinFormProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialData);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => { setForm(initialData); }, [initialData]);

  const set = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleUpload = async (slot: string, file: File) => {
    setUploadingSlot(slot);
    try {
      const fd = new FormData();
      fd.append('slot', slot);
      fd.append('file', file);
      const res = await fetch(`/api/projects/${projectId}/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      if (slot === 'groomPhoto') set('groomPhoto', data.url);
      else if (slot === 'bridePhoto') set('bridePhoto', data.url);
    } catch (err: unknown) {
      toast.error('Gagal upload: ' + (err instanceof Error ? err.message : 'Error'));
    } finally {
      setUploadingSlot(null);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coupleName: form.coupleName,
          groomFullName: form.groomFullName,
          groomParents: form.groomParents,
          groomInstagram: form.groomInstagram,
          brideFullName: form.brideFullName,
          brideParents: form.brideParents,
          brideInstagram: form.brideInstagram,
          groomPhoto: form.groomPhoto,
          bridePhoto: form.bridePhoto,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Data pengantin berhasil disimpan!');
    },
    onError: () => {
      toast.error('Gagal menyimpan. Coba lagi.');
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
            <h2 className="text-lg font-bold text-neutral-900">Data Pengantin</h2>
            <p className="text-xs text-neutral-500">Isi data mempelai pria dan wanita</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Nama Panggilan — full width */}
      <div className="bg-neutral-50/50 rounded-2xl border border-neutral-100 p-5">
        <h3 className="text-sm font-bold text-neutral-700 mb-4">Nama Pasangan</h3>
        <div>
          <label className={labelCls}>Nama Singkat (Tampil di Undangan)</label>
          <input
            className={inputCls}
            value={form.coupleName}
            onChange={(e) => set('coupleName', e.target.value)}
            placeholder="Contoh: Romi & Shinta"
          />
          <p className="text-[11px] text-neutral-400 mt-1.5">Nama ini yang akan muncul sebagai judul utama undangan.</p>
        </div>
      </div>

      {/* 2-Column: Pria | Wanita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Mempelai Pria */}
        <div className="bg-neutral-50/50 rounded-2xl border border-neutral-100 p-5 space-y-5">
          {/* Photo */}
          <div className="flex flex-col items-center gap-3 pb-4 border-b border-neutral-100/80">
            <PhotoSlot
              label="Mempelai Pria"
              slot="groomPhoto"
              currentUrl={form.groomPhoto}
              uploading={uploadingSlot === 'groomPhoto'}
              onUpload={handleUpload}
              onRemove={() => set('groomPhoto', '')}
            />
            <p className="text-[10px] text-neutral-400">JPG/PNG/WEBP · Maks 5MB</p>
          </div>
          {/* Fields */}
          <div>
            <label className={labelCls}>Nama Lengkap</label>
            <input className={inputCls} value={form.groomFullName} onChange={e => set('groomFullName', e.target.value)} placeholder="Ahmad Romi Hidayat" />
          </div>
          <div>
            <label className={labelCls}>Nama Orang Tua</label>
            <input className={inputCls} value={form.groomParents} onChange={e => set('groomParents', e.target.value)} placeholder="Putra ke-1 dari Bapak Hasan & Ibu Sari" />
          </div>
          <div>
            <label className={labelCls}>Instagram <span className="normal-case font-normal text-neutral-400">(Opsional)</span></label>
            <div className="flex">
              <span className="px-3 flex items-center border border-r-0 border-neutral-200 rounded-l-xl bg-neutral-100 text-neutral-500 text-sm">
                <AtSign className="w-4 h-4" />
              </span>
              <input
                className="flex-1 border border-neutral-200 rounded-r-xl px-4 py-3 outline-none focus:border-neutral-900 text-sm bg-white"
                value={form.groomInstagram}
                onChange={e => set('groomInstagram', e.target.value)}
                placeholder="username"
              />
            </div>
          </div>
        </div>

        {/* Mempelai Wanita */}
        <div className="bg-neutral-50/50 rounded-2xl border border-neutral-100 p-5 space-y-5">
          {/* Photo */}
          <div className="flex flex-col items-center gap-3 pb-4 border-b border-neutral-100/80">
            <PhotoSlot
              label="Mempelai Wanita"
              slot="bridePhoto"
              currentUrl={form.bridePhoto}
              uploading={uploadingSlot === 'bridePhoto'}
              onUpload={handleUpload}
              onRemove={() => set('bridePhoto', '')}
            />
            <p className="text-[10px] text-neutral-400">JPG/PNG/WEBP · Maks 5MB</p>
          </div>
          {/* Fields */}
          <div>
            <label className={labelCls}>Nama Lengkap</label>
            <input className={inputCls} value={form.brideFullName} onChange={e => set('brideFullName', e.target.value)} placeholder="Dewi Shinta Permata" />
          </div>
          <div>
            <label className={labelCls}>Nama Orang Tua</label>
            <input className={inputCls} value={form.brideParents} onChange={e => set('brideParents', e.target.value)} placeholder="Putri ke-2 dari Bapak Budi & Ibu Rina" />
          </div>
          <div>
            <label className={labelCls}>Instagram <span className="normal-case font-normal text-neutral-400">(Opsional)</span></label>
            <div className="flex">
              <span className="px-3 flex items-center border border-r-0 border-neutral-200 rounded-l-xl bg-neutral-100 text-neutral-500 text-sm">
                <AtSign className="w-4 h-4" />
              </span>
              <input
                className="flex-1 border border-neutral-200 rounded-r-xl px-4 py-3 outline-none focus:border-neutral-900 text-sm bg-white"
                value={form.brideInstagram}
                onChange={e => set('brideInstagram', e.target.value)}
                placeholder="username"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Save Footer */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 disabled:bg-neutral-300 text-white py-4 rounded-xl font-bold text-sm transition-colors cursor-pointer mt-4"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Data Pengantin'}
      </button>
    </div>
  );
}
