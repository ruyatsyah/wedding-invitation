'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function ClientProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#FAFAFA] min-h-full">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Edit Profil</h1>
        <p className="text-sm text-neutral-500 mt-1">Kelola informasi pribadi dan pengaturan akun Anda.</p>
      </header>

      <div className="max-w-3xl grid grid-cols-1 gap-8">
        {/* Profile Card */}
        <section className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-neutral-100">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-200 border-4 border-white shadow-sm flex items-center justify-center flex-shrink-0">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? 'User'}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-10 h-10 text-neutral-400" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-neutral-900">{user?.name ?? 'Nama Pengguna'}</h2>
              <p className="text-neutral-500 flex items-center gap-1.5 mt-1">
                <Mail className="w-4 h-4" />
                {user?.email ?? 'email@example.com'}
              </p>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Shield className="w-3.5 h-3.5" />
                Akun Terverifikasi
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Informasi Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Nama Lengkap</label>
                <input 
                  type="text" 
                  defaultValue={user?.name ?? ''} 
                  disabled
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#000000]/10 disabled:opacity-70 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-neutral-500">Saat ini nama terhubung dengan akun Google Anda.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email ?? ''} 
                  disabled
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#000000]/10 disabled:opacity-70 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-neutral-500">Email tidak dapat diubah karena menggunakan login Google.</p>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="button" 
                className="flex items-center gap-2 px-6 py-2.5 bg-[#000000] text-white rounded-xl text-sm font-semibold hover:bg-[#171717] transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
