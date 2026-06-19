'use client';

import React from 'react';
import { ArrowLeft, MessageSquare, Trash2, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance: string;
  createdAt: string;
}

interface UcapanFormProps {
  projectId: string;
  onBack: () => void;
}

export default function UcapanForm({ projectId, onBack }: UcapanFormProps) {
  const queryClient = useQueryClient();

  const { data: wishes = [], isLoading } = useQuery({
    queryKey: ['wishes', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/wishes?projectId=${projectId}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/wishes/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishes', projectId] });
      toast.success('Ucapan berhasil dihapus.');
    },
    onError: () => {
      toast.error('Gagal menghapus ucapan.');
    },
  });

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  return (
    <div className="space-y-6">
      {/* Header & Section Title */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="flex items-center gap-3 text-right">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Ucapan & Doa</h2>
            <p className="text-xs text-neutral-500">Kelola pesan dan doa dari para tamu undangan</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Wishes List */}
      <div className="bg-neutral-50/50 rounded-2xl border border-neutral-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Daftar Ucapan ({wishes.length})
          </h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <svg className="animate-spin w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl border border-dashed border-neutral-200">
            <p className="text-sm text-neutral-400">Belum ada ucapan yang masuk.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {wishes.map((wish: Wish) => (
              <div key={wish._id} className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm relative group">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm">{wish.name}</h4>
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        wish.attendance === 'Hadir' ? 'bg-emerald-100 text-emerald-700' :
                        wish.attendance === 'Tidak Hadir' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {wish.attendance}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-neutral-400">
                        <Clock className="w-3 h-3" /> {formatDate(wish.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed italic">
                      &quot;{wish.message}&quot;
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      if(window.confirm('Yakin ingin menghapus ucapan ini?')) {
                        deleteMutation.mutate(wish._id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                    title="Hapus Ucapan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
