'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { User, Mail, Shield, Save, Edit, Loader2, X, Eye, EyeOff, Gem } from 'lucide-react';

export default function ClientProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [isLoading, setIsLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  const hasPassword = (user as any)?.hasPassword;

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
  });

  let userTier = 'BRONZE';
  if ((user as any)?.role === 'admin') {
    userTier = 'GOLD';
  } else if (projects.some((p: any) => p.plan?.toLowerCase().includes('gold'))) {
    userTier = 'GOLD';
  } else if (projects.some((p: any) => p.plan?.toLowerCase().includes('silver'))) {
    userTier = 'SILVER';
  }

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        await update({ name });
        setIsEditing(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user?.name ?? '');
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok');
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError('Password minimal 8 karakter');
      return;
    }

    if (hasPassword && !oldPassword) {
      setPasswordError('Password lama wajib diisi');
      return;
    }

    setIsPasswordLoading(true);
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || 'Gagal mengubah password');
      } else {
        setPasswordSuccess('Password berhasil diubah!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        await update({ hasPassword: true });
      }
    } catch (error) {
      setPasswordError('Terjadi kesalahan pada server');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#FAFAFA] min-h-full">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Profil</h1>
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
                  alt={user?.name ?? 'User'}
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
            <div className="flex flex-col items-start md:items-end gap-3">
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Shield className="w-3.5 h-3.5" />
                  Akun Terverifikasi
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  userTier === 'GOLD' 
                    ? 'bg-amber-100 text-amber-700 border-amber-200' 
                    : userTier === 'SILVER' 
                      ? 'bg-slate-100 text-slate-700 border-slate-200' 
                      : 'bg-[#8F6B52]/10 text-[#8F6B52] border-[#8F6B52]/20'
                }`}>
                  <Gem className="w-3.5 h-3.5" />
                  {userTier} TIER
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Informasi Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing || isLoading}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#000000]/10 disabled:opacity-70 disabled:cursor-not-allowed"
                />
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

            {isEditing && (
              <div className="pt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-neutral-100 text-neutral-700 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button 
                  type="button" 
                  onClick={handleSave}
                  disabled={isLoading || name.trim() === ''}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#000000] text-white rounded-xl text-sm font-semibold hover:bg-[#171717] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Keamanan Akun</h3>
            
            {!hasPassword && (
              <div className="mb-6 bg-blue-50 border border-blue-100 text-blue-700 text-sm px-4 py-3 rounded-xl">
                Anda masuk menggunakan Google. Silakan buat kata sandi baru untuk akun Anda.
              </div>
            )}
            
            {passwordError && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="mb-6 bg-green-50 border border-green-100 text-green-600 text-sm px-4 py-3 rounded-xl">
                {passwordSuccess}
              </div>
            )}

            <form onSubmit={handlePasswordSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 max-w-md">
                {hasPassword && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Kata Sandi Lama</label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-2.5 pr-11 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#000000]/10"
                        placeholder="Masukkan kata sandi saat ini"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                      >
                        {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Kata Sandi Baru</label>
                  <div className="relative">
                    <input 
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 pr-11 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#000000]/10"
                      placeholder="Minimal 8 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPassword.length > 0 && newPassword.length < 8 && (
                    <p className="text-xs text-red-500">Password minimal 8 karakter</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Konfirmasi Kata Sandi</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 pr-11 bg-neutral-50 border rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 transition-colors ${
                        confirmPassword.length > 0
                          ? confirmPassword === newPassword
                            ? 'border-emerald-400 focus:ring-emerald-500/20'
                            : 'border-red-400 focus:ring-red-500/20'
                          : 'border-neutral-200 focus:ring-[#000000]/10'
                      }`}
                      placeholder="Ulangi kata sandi baru"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    confirmPassword === newPassword
                      ? <p className="text-xs text-emerald-600 flex items-center gap-1"><span>✓</span> Kata sandi cocok</p>
                      : <p className="text-xs text-red-500 flex items-center gap-1"><span>✗</span> Kata sandi tidak cocok</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isPasswordLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 8 || (hasPassword && !oldPassword)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#000000] text-white rounded-xl text-sm font-semibold hover:bg-[#171717] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPasswordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isPasswordLoading ? 'Menyimpan...' : (hasPassword ? 'Ubah Kata Sandi' : 'Buat Kata Sandi')}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
