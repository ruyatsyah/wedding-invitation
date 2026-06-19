'use client';

import React from 'react';
import { ArrowLeft, MailCheck, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface RsvpFormProps {
  projectId: string;
  onBack: () => void;
}

export default function RsvpForm({ projectId, onBack }: RsvpFormProps) {
  const { data: guests = [], isLoading } = useQuery({
    queryKey: ['guests', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/guests?projectId=${projectId}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    }
  });

  const attending = guests.filter((g: any) => g.rsvpStatus === 'ATTENDING');
  const declined = guests.filter((g: any) => g.rsvpStatus === 'DECLINED');
  const pending = guests.filter((g: any) => g.rsvpStatus === 'PENDING');
  
  const totalPax = attending.reduce((acc: number, curr: any) => acc + (curr.pax || 0), 0);

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
            <h2 className="text-lg font-bold text-neutral-900">RSVP & Kehadiran</h2>
            <p className="text-xs text-neutral-500">Pantau konfirmasi kehadiran tamu Anda</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <MailCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            <CheckCircle className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Hadir</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-900">{attending.length}</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-rose-700 mb-2">
            <XCircle className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Tidak Hadir</h3>
          </div>
          <p className="text-2xl font-bold text-rose-900">{declined.length}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-amber-700 mb-2">
            <Clock className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-amber-900">{pending.length}</p>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-neutral-700 mb-2">
            <Users className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Total Pax</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{totalPax}</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
          <h3 className="text-sm font-bold text-neutral-700">Daftar Konfirmasi</h3>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-sm text-neutral-400">Memuat data...</div>
        ) : guests.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-400">Belum ada data tamu.</div>
        ) : (
          <div className="divide-y divide-neutral-100 max-h-[400px] overflow-y-auto">
            {guests.map((g: any, i: number) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                <div>
                  <p className="font-bold text-sm text-neutral-800">{g.name}</p>
                  {g.phone && <p className="text-xs text-neutral-500 font-mono mt-0.5">{g.phone}</p>}
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div className="text-xs font-bold text-neutral-600">
                    {g.pax > 0 && <span>{g.pax} Pax</span>}
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                    g.rsvpStatus === 'ATTENDING' ? 'bg-emerald-100 text-emerald-700' :
                    g.rsvpStatus === 'DECLINED' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {g.rsvpStatus === 'ATTENDING' ? 'Hadir' : g.rsvpStatus === 'DECLINED' ? 'Tidak Hadir' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
