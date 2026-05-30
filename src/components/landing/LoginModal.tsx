'use client';

import { X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  callbackUrl?: string;
}

export default function LoginModal({ isOpen, onClose, callbackUrl }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    console.log('Google sign in clicked');
    setIsLoading(true);
    setError('');

    try {
      await signIn('google', {
        redirectTo: callbackUrl || '/client',
        redirect: true,
      });
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('SignIn error:', err);
      setIsLoading(false);
    }
  };

  // Force render for testing
  const shouldRender = isOpen;

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="p-8 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">
                Buat Undangan Sekarang
              </h2>
              <p className="text-sm text-slate-500">
                Masuk dengan akun Google untuk membuat undangan digital yang
                indah.
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Masuk dengan Google
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-neutral-50 text-neutral-600 text-sm p-3 rounded-lg border border-neutral-200">
                {error}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">atau</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Info */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-left">
              <p className="text-xs font-semibold text-slate-600">
                ✨ Keuntungan login dengan Google:
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>✓ Proses login yang cepat dan aman</li>
                <li>✓ Akses dashboard kapan saja</li>
                <li>✓ Kelola semua undangan Anda</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
