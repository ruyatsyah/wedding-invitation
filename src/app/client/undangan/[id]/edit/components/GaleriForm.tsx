'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Images } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PhotoUploadSlot from './PhotoUploadSlot';
import toast from 'react-hot-toast';

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
      toast.success('Galeri berhasil disimpan!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Gagal menyimpan galeri.');
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
            <h2 className="text-lg font-bold text-neutral-900">Galeri Foto</h2>
            <p className="text-xs text-neutral-500">Upload hingga {MAX_PHOTOS} foto kenangan untuk undangan</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Images className="w-5 h-5" />
          </div>
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
