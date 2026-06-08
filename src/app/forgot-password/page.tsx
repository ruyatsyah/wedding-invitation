'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email wajib diisi.');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Terjadi kesalahan');
      } else {
        setMessage(data.message || 'Jika email terdaftar, tautan reset telah dikirim.');
        setEmail('');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full filter blur-[140px] opacity-60 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full filter blur-[120px] opacity-50 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
          <div className="px-8 pt-8 pb-2 text-center">
            <h2 className="text-2xl font-extrabold text-[#000000]">Lupa Password</h2>
            <p className="text-neutral-500 text-sm mt-1">Masukkan email untuk mereset password Anda</p>
          </div>

          <div className="px-8 py-8 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                {error}
              </div>
            )}
            
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all placeholder-neutral-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#000000] hover:bg-[#171717] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10 mt-2 cursor-pointer"
              >
                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
                {isLoading ? 'Memproses...' : 'Kirim Tautan Reset'}
              </button>
            </form>

            <div className="flex justify-center mt-6">
              <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-[#000000] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
