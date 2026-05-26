import React from 'react';
import { UserPlus, Monitor, Link2, Copy, ToggleRight } from 'lucide-react';

interface EditHeaderProps {
  coupleName: string;
  customUrl: string;
  status: string;
  accessCode: string;
  stats: {
    tamu: number;
    hadir: number;
    ucapan: number;
  };
  onToggleStatus: () => void;
}

export default function EditHeader({ 
  coupleName, customUrl, status, accessCode, stats, onToggleStatus 
}: EditHeaderProps) {
  const isActive = status === 'active';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden mt-6">
      {/* Top Black Section */}
      <div className="bg-[#000000] text-white p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl md:text-2xl font-bold">{coupleName || 'Nama Pasangan'}</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase">
              {isActive ? 'Aktif' : 'Non-Aktif'}
            </span>
            <button 
              onClick={onToggleStatus}
              className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                isActive ? 'bg-emerald-500 justify-end' : 'bg-neutral-600 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-300 text-sm">
          <Link2 className="w-4 h-4" />
          <span className="truncate">https://kabarbaik.co/{customUrl || 'customurl'}</span>
          <button className="hover:text-white transition-colors" title="Copy Link">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white p-4">
        <div className="flex justify-between md:justify-around items-center border border-neutral-200 rounded-xl p-4 shadow-sm mb-4">
          <div className="text-center flex-1 border-r border-neutral-100">
            <p className="text-2xl font-bold text-neutral-900">{stats.tamu}</p>
            <p className="text-xs text-neutral-500 font-medium">Tamu</p>
          </div>
          <div className="text-center flex-1 border-r border-neutral-100">
            <p className="text-2xl font-bold text-neutral-900">{stats.hadir}</p>
            <p className="text-xs text-neutral-500 font-medium">Akan Hadir</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-neutral-900">{stats.ucapan}</p>
            <p className="text-xs text-neutral-500 font-medium">Ucapan</p>
          </div>
        </div>

        {/* Tambah Pengelola */}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 text-neutral-600 font-semibold text-sm hover:bg-neutral-50 transition-colors">
          <UserPlus className="w-4 h-4" />
          Tambah Pengelola
        </button>
      </div>

      {/* Kode Akses */}
      <div className="bg-[#FAFAFA] border-t border-neutral-200 p-6 flex flex-col items-center justify-center">
        <p className="text-xs text-neutral-500 mb-1">Kode Akses Undangan</p>
        <p className="text-2xl font-bold tracking-widest text-neutral-900 mb-4">{accessCode}</p>
        
        <button className="w-full md:w-auto bg-[#171717] hover:bg-[#000000] text-white px-8 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
          <Monitor className="w-4 h-4" />
          Buka Layar Penerima Tamu
        </button>
      </div>
    </div>
  );
}
