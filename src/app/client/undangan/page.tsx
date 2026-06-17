'use client';

import { FileText, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const undanganData = [
  { id: 'ID: #INV-882910', name: 'Royal Gala Wedding', date: 'Oct 24, 2023', status: 'Aktif', imageClass: 'bg-rose-100' },
  { id: 'ID: #INV-882905', name: 'Tech Summit Pro', date: 'Oct 21, 2023', status: 'Draft', imageClass: 'bg-slate-800' },
];

export default function UndanganSayaPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Total Undangan</p>
              <h2 className="text-3xl font-bold text-[#8D1A42]">42</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500">Semua proyek tersimpan</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Undangan Aktif</p>
              <h2 className="text-3xl font-bold text-slate-800">12</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500">Publikasi sedang berjalan</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Kredit Tersisa</p>
              <h2 className="text-3xl font-bold text-slate-800">850</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500">Premium account status</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-center h-32">
          <button className="flex items-center gap-2 bg-[#8D1A42] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#721535] transition-colors">
            <Plus className="w-4 h-4" /> Buat Undangan Baru
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <FileText className="w-5 h-5" />
            Daftar Undangan
          </div>
          <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-700 outline-none">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 text-xs font-medium">
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 font-semibold w-1/3">Detail Template</th>
                <th className="px-6 py-4 font-semibold w-1/5">Tanggal Pembelian</th>
                <th className="px-6 py-4 font-semibold w-1/5">Status</th>
                <th className="px-6 py-4 font-semibold w-auto text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {undanganData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-14 rounded flex-shrink-0 border border-slate-200 ${item.imageClass}`}></div>
                      <div>
                        <p className="text-slate-800 font-bold mb-0.5">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/client/undangan/1/edit`} className="px-4 py-2 bg-[#8D1A42] text-white text-xs font-medium rounded hover:bg-[#721535] transition-colors">
                        Kelola Undangan
                      </Link>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded hover:bg-slate-50 transition-colors">
                        Lihat Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 1 to 10 of 42 entries</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-400 cursor-not-allowed">Previous</button>
            <button className="w-9 h-9 rounded-lg bg-[#8D1A42] text-white font-medium text-sm flex items-center justify-center">1</button>
            <button className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm flex items-center justify-center">2</button>
            <button className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm flex items-center justify-center">3</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
