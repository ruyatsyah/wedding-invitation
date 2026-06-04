'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, BookOpen, Plus, Trash2, Users, Download, Upload } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

interface Guest {
  name: string;
  noWa: string;
  isSent?: boolean;
}

interface BukuTamuFormProps {
  projectId: string;
  initialGuests: Guest[];
  onBack: () => void;
}

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

export default function BukuTamuForm({ projectId, initialGuests, onBack }: BukuTamuFormProps) {
  const queryClient = useQueryClient();
  const [guests, setGuests] = useState<Guest[]>(initialGuests || []);
  // Local state for new guest input
  const [newName, setNewName] = useState('');
  const [newWa, setNewWa] = useState('');

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newWa.trim()) return;

    setGuests([...guests, { name: newName.trim(), noWa: newWa.trim(), isSent: false }]);
    setNewName('');
    setNewWa('');
  };

  const handleRemoveGuest = (index: number) => {
    const newArr = [...guests];
    newArr.splice(index, 1);
    setGuests(newArr);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guests: guests,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Daftar tamu berhasil disimpan!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Gagal menyimpan daftar tamu.');
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
            <h2 className="text-lg font-bold text-neutral-900">Buku Tamu</h2>
            <p className="text-xs text-neutral-500">Kelola daftar tamu yang akan diundang</p>
          </div>
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Add Guest Form */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-neutral-700 mb-3">Tambah Tamu Baru</h3>
        <form onSubmit={handleAddGuest} className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <div className="w-full sm:flex-1">
            <label className={labelCls}>Nama Tamu</label>
            <input
              className={inputCls}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
            />
          </div>
          <div className="w-full sm:flex-1">
            <label className={labelCls}>Nomor WhatsApp</label>
            <input
              className={inputCls}
              value={newWa}
              onChange={(e) => setNewWa(e.target.value)}
              placeholder="Contoh: 081234567890"
            />
          </div>
          <button
            type="submit"
            disabled={!newName.trim() || !newWa.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black disabled:bg-neutral-300 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </form>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-neutral-50/50 gap-4">
          <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Daftar Tamu ({guests.length})
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                const ws = XLSX.utils.aoa_to_sheet([
                  ["Template Tamu Undangan", null, null],
                  ["No", "Nama", "HP/Whatsapp"],
                  [1, "Budi", "0891234567"],
                  [2, "Siti", "0821345678"]
                ]);
                ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Guest List");
                XLSX.writeFile(wb, "Template_Guest_List.xlsx");
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-xs font-bold hover:bg-neutral-50 transition-colors"
            >
              <Download className="w-4 h-4" /> Template Excel
            </button>
            <label className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer transition-colors">
              <Upload className="w-4 h-4" /> Upload Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const data = new Uint8Array(event.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json<any>(sheet, { range: 1 });
                    const newGuests = json.map(r => {
                      const name = r["Nama"] || r["nama"];
                      const wa = r["HP/Whatsapp"] || r["hp"] || r["whatsapp"] || r["wa"];
                      return { name: String(name || '').trim(), noWa: String(wa || '').trim(), isSent: false };
                    }).filter(g => g.name);
                    setGuests(prev => [...prev, ...newGuests]);
                  };
                  reader.readAsArrayBuffer(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
        
        {guests.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-neutral-400">Belum ada tamu yang ditambahkan.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 max-h-[400px] overflow-y-auto">
            {guests.map((guest, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group">
                <div>
                  <p className="text-sm font-bold text-neutral-800">{guest.name}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">{guest.noWa}</p>
                </div>
                <div className="flex items-center gap-3">
                  {guest.isSent ? (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      Terkirim
                    </span>
                  ) : (
                    <span className="bg-neutral-100 text-neutral-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      Belum
                    </span>
                  )}
                  <button
                    onClick={() => handleRemoveGuest(idx)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Tamu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Footer */}
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#171717] disabled:bg-neutral-300 text-white py-4 rounded-2xl font-bold text-sm transition-colors shadow-sm cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Daftar Tamu'}
      </button>
    </div>
  );
}
