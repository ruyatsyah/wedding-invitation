'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, Heart, Plus, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface LoveStory {
  date: string;
  title: string;
  story: string;
}

interface KisahCintaFormProps {
  projectId: string;
  initialLoveStories: LoveStory[];
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function KisahCintaForm({ projectId, initialLoveStories, onBack }: KisahCintaFormProps) {
  const queryClient = useQueryClient();
  const [loveStories, setLoveStories] = useState<LoveStory[]>(initialLoveStories || []);

  const handleAddStory = () => {
    setLoveStories([...loveStories, { date: '', title: '', story: '' }]);
  };

  const handleRemoveStory = (index: number) => {
    const newArr = [...loveStories];
    newArr.splice(index, 1);
    setLoveStories(newArr);
  };

  const handleChange = (index: number, field: keyof LoveStory, value: string) => {
    const newArr = [...loveStories];
    newArr[index][field] = value;
    setLoveStories(newArr);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loveStories: loveStories,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Kisah cinta berhasil disimpan!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Gagal menyimpan kisah cinta.');
    },
  });

  return (
    <div className="space-y-6">
      {/* Header & Section Title */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
        <div className="flex items-center gap-3 text-right">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Kisah Cinta</h2>
            <p className="text-xs text-neutral-500">Ceritakan perjalanan cinta Anda</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loveStories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 text-center shadow-sm">
            <p className="text-sm text-neutral-400 mb-4">Belum ada kisah cinta yang ditambahkan.</p>
            <button
              onClick={handleAddStory}
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Cerita
            </button>
          </div>
        ) : (
          loveStories.map((story, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4 relative group">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-neutral-700">Cerita {idx + 1}</h3>
                <button
                  onClick={() => handleRemoveStory(idx)}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus Cerita"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Tanggal/Waktu</label>
                  <input
                    className={inputCls}
                    value={story.date}
                    onChange={(e) => handleChange(idx, 'date', e.target.value)}
                    placeholder="Contoh: Januari 2020"
                  />
                </div>
                <div>
                  <label className={labelCls}>Judul</label>
                  <input
                    className={inputCls}
                    value={story.title}
                    onChange={(e) => handleChange(idx, 'title', e.target.value)}
                    placeholder="Contoh: Pertama Bertemu"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Cerita</label>
                  <textarea
                    className={`${inputCls} min-h-[100px] resize-y`}
                    value={story.story}
                    onChange={(e) => handleChange(idx, 'story', e.target.value)}
                    placeholder="Ceritakan momen tersebut secara singkat..."
                  />
                </div>
              </div>
            </div>
          ))
        )}

        {loveStories.length > 0 && (
          <button
            onClick={handleAddStory}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 py-3 rounded-2xl font-bold text-sm transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Cerita Lain
          </button>
        )}
      </div>

      {/* Save Footer */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#171717] disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors shadow-sm cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Kisah Cinta'}
      </button>
    </div>
  );
}
