'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Images } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PhotoUploadSlot from './PhotoUploadSlot';

interface GaleriFormProps {
  projectId: string;
  initialGallery: string[];
  onBack: () => void;
}

const MAX_PHOTOS = 5;

export default function GaleriForm({ projectId, initialGallery, onBack }: GaleriFormProps) {
  const queryClient = useQueryClient();
  const [gallery, setGallery] = useState<string[]>(() => {
    const arr = [...(initialGallery || [])];
    while (arr.length < MAX_PHOTOS) arr.push('');
    return arr.slice(0, MAX_PHOTOS);
  });
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    const arr = [...(initialGallery || [])];
    while (arr.length < MAX_PHOTOS) arr.push('');
    setGallery(arr.slice(0, MAX_PHOTOS));
  }, [initialGallery]);

  const handleUpload = async (index: number, file: File) => {
    setUploadingSlot(index);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slot', `gallery_${index}`);
      const res = await fetch(`/api/projects/${projectId}/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      const url = data.url || data.data?.url;
      const newGallery = [...gallery];
      newGallery[index] = url;
      setGallery(newGallery);
      // auto-save gallery to db
      await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: newGallery.filter(Boolean) }),
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleRemove = async (index: number) => {
    const newGallery = [...gallery];
    newGallery[index] = '';
    setGallery(newGallery);
    await fetch(`/api/projects/${projectId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gallery: newGallery.filter(Boolean) }),
    });
    queryClient.invalidateQueries({ queryKey: ['project', projectId] });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: gallery.filter(Boolean) }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
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
          <Images className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Galeri Foto</h2>
          <p className="text-xs text-neutral-500">Upload hingga {MAX_PHOTOS} foto kenangan untuk undangan</p>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {gallery.map((url, idx) => (
            <PhotoUploadSlot
              key={idx}
              label={`Foto ${idx + 1}`}
              slot={`gallery_${idx}`}
              currentUrl={url}
              isUploading={uploadingSlot === idx}
              onUpload={(_, file) => handleUpload(idx, file)}
              onRemove={() => handleRemove(idx)}
              shape="square"
              className="h-32 sm:h-36"
            />
          ))}
        </div>
        <p className="text-[11px] text-neutral-400 mt-4 text-center">Format JPG, PNG, WEBP • Maks. 5MB per foto</p>
      </div>
    </div>
  );
}
