'use client';

import React from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

interface Project {
  _id: string;
  coupleName: string;
  customUrl: string;
  status: string;
  createdAt: string;
  themeId: {
    _id: string;
    templateName: string;
    thumbnailUrl: string;
  };
}

export default function UndanganSayaPage() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch');
      return data.data;
    },
  });

  const activeCount = projects.filter(p => p.status === 'active').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Total Undangan</p>
              <h2 className="text-3xl font-bold text-[#8D1A42]">{projects.length}</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500">Semua proyek tersimpan</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Undangan Aktif</p>
              <h2 className="text-3xl font-bold text-slate-800">{activeCount}</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500">Publikasi sedang berjalan</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between h-32 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1 uppercase">Kredit Tersisa</p>
              <h2 className="text-3xl font-bold text-slate-800">850</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500">Premium account status</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-center h-32 shadow-sm">
          <Link href="/client/catalog" className="flex items-center gap-2 bg-[#8D1A42] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#721535] transition-colors shadow-md shadow-[#8D1A42]/10">
            <Plus className="w-4 h-4" /> Buat Undangan Baru
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <FileText className="w-5 h-5 text-[#8D1A42]" />
            Daftar Undangan Anda
          </div>
          <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-700 outline-none cursor-pointer">
            <option>Semua Waktu</option>
            <option>Bulan Ini</option>
            <option>Tahun Ini</option>
          </select>
        </div>
        
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="space-y-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-100 animate-pulse">
                  <div className="w-12 h-16 rounded-md bg-slate-100 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-slate-100 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/4" />
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-20 hidden md:block" />
                  <div className="h-6 bg-slate-100 rounded-full w-16 hidden md:block" />
                  <div className="flex gap-2 ml-auto">
                    <div className="h-8 bg-slate-100 rounded-lg w-20" />
                    <div className="h-8 bg-slate-100 rounded-lg w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
               <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-slate-800 font-medium">Belum ada undangan</p>
              <p className="text-slate-500 text-sm mt-1 mb-4">Anda belum membuat undangan apapun.</p>
              <Link href="/client/catalog" className="px-4 py-2 bg-[#8D1A42] text-white text-xs font-semibold rounded-lg hover:bg-[#721535] transition-colors">
                Jelajahi Tema Sekarang
              </Link>
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 w-1/3">Detail Undangan</th>
                  <th className="px-6 py-4 w-1/5">Tanggal Dibuat</th>
                  <th className="px-6 py-4 w-1/5">Status</th>
                  <th className="px-6 py-4 w-auto text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 rounded-md flex-shrink-0 border border-slate-200 overflow-hidden bg-slate-100 relative">
                          {project.themeId?.thumbnailUrl && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={project.themeId.thumbnailUrl} alt="Tema" className="w-full h-full object-cover" loading="lazy" />
                          )}
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold mb-0.5">{project.coupleName}</p>
                          <a 
                            href={`/${project.customUrl}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-xs text-[#8D1A42] hover:underline flex items-center gap-1"
                          >
                            kabarbaik.co/{project.customUrl}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(project.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        project.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        project.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/client/undangan/${project._id}/edit`} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                          Edit Konten
                        </Link>
                        <Link 
                          href={`/${project.customUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-[#8D1A42] text-white text-xs font-semibold rounded-lg hover:bg-[#721535] transition-colors shadow-sm shadow-[#8D1A42]/10"
                        >
                          Buka Undangan
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {projects.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <p className="text-sm text-slate-500">Menampilkan {projects.length} undangan</p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 border border-slate-200 rounded text-sm font-medium text-slate-400 cursor-not-allowed bg-white">Prev</button>
              <button className="w-8 h-8 rounded bg-[#8D1A42] text-white font-medium text-sm flex items-center justify-center shadow-sm">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded text-sm font-medium text-slate-600 hover:bg-white bg-transparent">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
