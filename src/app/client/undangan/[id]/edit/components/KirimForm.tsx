'use client';

import React, { useState } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Guest {
  name: string;
  noWa: string;
  isSent?: boolean;
}

interface KirimFormProps {
  projectId: string;
  customUrl: string;
  initialGuests: Guest[];
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function KirimForm({ projectId, customUrl, initialGuests, onBack }: KirimFormProps) {
  const queryClient = useQueryClient();
  const [guests, setGuests] = useState<Guest[]>(initialGuests || []);
  const [template, setTemplate] = useState(`Halo [Nama Tamu],\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.\n\nBerikut link undangan kami:\n[Link Undangan]\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di acara pernikahan kami.\n\nTerima kasih.`);

  const updateProjectMutation = useMutation({
    mutationFn: async (updatedGuests: Guest[]) => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests: updatedGuests }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan status kirim');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });

  const handleKirimWa = (idx: number, guest: Guest) => {
    if (!guest.noWa) return;

    const text = template
      .replace(/\[Nama Tamu\]/g, guest.name)
      .replace(/\[Link Undangan\]/g, `https://kabarbaik.co/${customUrl}?to=${encodeURIComponent(guest.name)}`);
    
    const waUrl = `https://wa.me/${guest.noWa.replace(/^0/, '62').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    // Mark as sent locally and in db
    const newGuests = [...guests];
    newGuests[idx].isSent = true;
    setGuests(newGuests);
    updateProjectMutation.mutate(newGuests);
  };

  return (
    <div className="space-y-6 pb-10">
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
            <h2 className="text-lg font-bold text-neutral-900">Kirim Undangan (WA Blast)</h2>
            <p className="text-xs text-neutral-500">Kirim pesan undangan ke daftar tamu Anda secara instan</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Input */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-neutral-700">Template Pesan</h3>
          <div>
            <textarea
              className={`${inputCls} min-h-[250px] resize-y`}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              id="waTemplate"
            />
            <p className="text-[11px] text-neutral-500 mt-3 leading-relaxed">
              Variabel yang tersedia: <br/>
              <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-900 font-mono font-bold">[Nama Tamu]</code>, <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-900 font-mono font-bold">[Link Undangan]</code>
            </p>
          </div>
        </div>

        {/* Guest List Sending */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
            <h3 className="text-sm font-bold text-neutral-700">Status Pengiriman ({guests.length} Tamu)</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] divide-y divide-neutral-100">
            {guests.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">Daftar Tamu masih kosong. Silakan isi di menu Buku Tamu.</p>
            ) : (
              guests.map((guest, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-neutral-800">{guest.name}</p>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">{guest.noWa || 'No WA belum diisi'}</p>
                  </div>
                  <button
                    disabled={!guest.noWa}
                    onClick={() => handleKirimWa(idx, guest)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm ${
                      !guest.noWa ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none' :
                      guest.isSent ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200' : 'bg-neutral-900 text-white hover:bg-black'
                    }`}
                  >
                    <Send className="w-3 h-3" /> {guest.isSent ? 'Kirim Ulang' : 'Kirim WA'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
