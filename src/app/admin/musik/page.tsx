'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Music, Upload, Trash2, Play, Pause } from 'lucide-react';

export default function AdminMusikPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-music'],
    queryFn: async () => {
      const res = await fetch('/api/admin/music');
      if (!res.ok) throw new Error('Gagal memuat musik');
      return res.json();
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!title || !file) throw new Error('Judul dan file wajib diisi');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const res = await fetch('/api/admin/music', {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Gagal upload');
      return resData;
    },
    onSuccess: () => {
      toast.success('Musik berhasil ditambahkan');
      setTitle('');
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ['admin-music'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Gagal menambahkan musik');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/music/${id}`, { method: 'DELETE' });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Gagal menghapus');
      return resData;
    },
    onSuccess: () => {
      toast.success('Musik dihapus');
      queryClient.invalidateQueries({ queryKey: ['admin-music'] });
      if (playingId) {
        audioRef.current?.pause();
        setPlayingId(null);
      }
    },
    onError: (err: any) => {
      toast.error(err.message || 'Gagal menghapus musik');
    }
  });

  const togglePlay = (id: string, url: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setPlayingId(id);
      }
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    uploadMutation.mutate();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <Music className="w-6 h-6 text-[#8D1A42]" />
          Manajemen Musik Latar
        </h1>
        <p className="text-neutral-500 mt-1">Kelola daftar musik latar yang bisa dipilih oleh klien untuk undangan mereka.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-bold mb-4">Upload Musik Baru</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">Judul Musik</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2 outline-none focus:border-[#8D1A42]"
                  placeholder="Misal: A Thousand Years"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">File Audio (MP3)</label>
                <input
                  type="file"
                  accept="audio/mp3,audio/mpeg"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#f8f0f3] file:text-[#8D1A42] hover:file:bg-[#f0e0e6] cursor-pointer"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={uploadMutation.isPending}
                className="w-full bg-[#8D1A42] hover:bg-[#701534] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploadMutation.isPending ? 'Mengunggah...' : 'Upload Musik'}
              </button>
            </form>
          </div>
        </div>

        {/* Music List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">Daftar Musik Tersedia</h2>
            </div>
            
            <div className="p-0">
              {isLoading ? (
                <div className="p-8 text-center text-neutral-500">Memuat data...</div>
              ) : data?.data?.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">Belum ada musik yang diunggah.</div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {data?.data?.map((m: any) => (
                    <li key={m._id} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => togglePlay(m._id, m.url)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${playingId === m._id ? 'bg-[#8D1A42] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                        >
                          {playingId === m._id ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                        </button>
                        <div>
                          <p className="font-semibold text-neutral-900">{m.title}</p>
                          <p className="text-xs text-neutral-500">Ditambahkan pada {new Date(m.createdAt).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus musik ini?')) {
                            deleteMutation.mutate(m._id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} className="hidden" />
    </div>
  );
}
