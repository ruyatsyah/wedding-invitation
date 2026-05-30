'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { signIn } from 'next-auth/react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'bronze';

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isNameInvalid = nama.length > 0 && !/^[A-Za-z\s]+$/.test(nama);
  const isPasswordInvalid = password.length > 0 && password.length < 8;
  const isConfirmPasswordInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !password || !confirmPassword) {
      setError('Semua kolom wajib diisi.');
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(nama)) {
      setError('Nama hanya boleh menggunakan huruf dan spasi.');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nama, email, password, plan }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Gagal mendaftar.');
      }

      const loginResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        throw new Error('Pendaftaran berhasil, tetapi gagal masuk secara otomatis. Silakan login manual.');
      }

      router.push(`/onboarding?plan=${plan}`);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signIn('google', {
        callbackUrl: `/onboarding?plan=${plan}`,
      });
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 rounded-full filter blur-[140px] opacity-60 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full filter blur-[120px] opacity-50 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
          {/* Card Header — no color background, plain text */}
          <div className="px-8 pt-8 pb-2 text-center">
            <h2 className="text-2xl font-extrabold text-[#000000]">Daftar Akun Baru</h2>
            <p className="text-neutral-500 text-sm mt-1">Buat akun gratis untuk memulai</p>
          </div>

          <div className="px-8 py-8 space-y-5">
            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isNameInvalid ? 'text-red-400' : 'text-neutral-400'}`} />
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Anda"
                    className={`w-full pl-10 pr-4 py-3 bg-neutral-50 border rounded-xl text-sm text-neutral-900 outline-none transition-all placeholder-neutral-400 ${
                      isNameInvalid 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-neutral-200 focus:ring-2 focus:ring-black/10 focus:border-black'
                    }`}
                  />
                </div>
                {isNameInvalid && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">Nama hanya boleh menggunakan huruf dan spasi.</p>
                )}
              </div>

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

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isPasswordInvalid ? 'text-red-400' : 'text-neutral-400'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-3 bg-neutral-50 border rounded-xl text-sm text-neutral-900 outline-none transition-all placeholder-neutral-400 ${
                      isPasswordInvalid 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-neutral-200 focus:ring-2 focus:ring-black/10 focus:border-black'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {isPasswordInvalid && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">Password minimal 8 karakter.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Konfirmasi Password</label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isConfirmPasswordInvalid ? 'text-red-400' : 'text-neutral-400'}`} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-3 bg-neutral-50 border rounded-xl text-sm text-neutral-900 outline-none transition-all placeholder-neutral-400 ${
                      isConfirmPasswordInvalid 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500' 
                        : 'border-neutral-200 focus:ring-2 focus:ring-black/10 focus:border-black'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {isConfirmPasswordInvalid && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">Password dan Konfirmasi Password tidak cocok.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#000000] hover:bg-[#171717] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10 mt-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400">atau</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Daftar dengan Google
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-neutral-500 pt-1">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-[#000000] font-bold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
