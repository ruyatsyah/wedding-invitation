'use client';

import React, { useState } from 'react';
import { Search, Gem, Globe, Settings2, Users } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

interface Project {
  _id: string;
  coupleName: string;
  customUrl: string;
  status: string;
  createdAt: string;
}

export default function UndanganSayaPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch');
      return data.data;
    },
  });

  const filteredProjects = projects.filter((p: Project) =>
    p.coupleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.customUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search Invitation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 text-sm text-neutral-700 outline-none placeholder-neutral-400"
        />
      </div>

      {/* Upgrade Banner */}
      <div className="bg-[#F0EBE6] rounded-xl border border-[#E3D9D0] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-[#6D5443] text-sm">
          Kamu masih pakai akun gratisan!
        </span>
        <button className="bg-[#8F6B52] hover:bg-[#7D5D47] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 text-sm transition-colors shadow-sm">
          <Gem className="w-4 h-4" />
          Upgrade Akun
        </button>
      </div>

      {/* Invitations List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center gap-4 animate-pulse shadow-sm">
              <div className="w-16 h-16 bg-neutral-100 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-100 rounded w-1/3" />
                <div className="h-3 bg-neutral-100 rounded w-1/4" />
              </div>
            </div>
          ))
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center shadow-sm">
            <p className="text-neutral-500 font-medium">Tidak ada undangan ditemukan.</p>
          </div>
        ) : (
          filteredProjects.map((project: Project) => (
            <div key={project._id} className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div className="w-16 h-16 bg-[#F9EEF2] rounded-xl flex items-center justify-center text-[#8D1A42] flex-shrink-0">
                  <Users className="w-8 h-8" />
                </div>
                
                {/* Info */}
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">{project.coupleName}</h3>
                  <p className="text-neutral-400 text-sm mt-0.5">-</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/${project.customUrl}`}
                  target="_blank"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#8F6B52] hover:bg-[#7D5D47] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  <Globe className="w-4 h-4" />
                  Lihat Web
                </Link>
                <Link
                  href={`/client/undangan/${project._id}/edit`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#8D1A42] hover:bg-[#721535] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  <Settings2 className="w-4 h-4" />
                  Kelola
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
