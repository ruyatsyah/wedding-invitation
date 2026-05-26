'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const PLANS = [
  {
    id: 'bronze',
    name: 'Bronze',
    tagline: 'Coba dulu gratis',
    price: 'Rp 0',
    period: '3 hari',
    popular: false,
    features: ['3 Tema Standar', 'Galeri 3 Foto', 'Buku Tamu Digital', 'RSVP Kehadiran', 'Masa Aktif 3 Hari'],
  },
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Untuk pasangan romantis',
    price: 'Rp 49.000',
    period: '1 bulan',
    popular: false,
    features: ['Semua Tema Premium', 'Galeri 10 Foto', 'Custom Backsound', 'Integrasi Google Maps', 'Download Data Tamu', 'Masa Aktif 1 Bulan'],
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Paling lengkap & populer',
    price: 'Rp 99.000',
    period: '6 bulan',
    popular: true,
    features: ['Semua Fitur Silver', 'Galeri & Video Unlimited', 'Angpao Digital', 'WhatsApp Blast API', 'Tamu Unlimited', 'Layar Tamu Proyektor', 'Masa Aktif 6 Bulan'],
  },
];

function OnboardingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || '';

  const [step, setStep] = useState(1);
  const [coupleName, setCoupleName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName || !customUrl) {
      setErrorMsg('Mohon lengkapi semua field form.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSelectPackage = async (planId: string) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupleName, customUrl, plan: planId }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Gagal menyimpan data.');
      }

      router.push('/client');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
      setIsLoading(false);
      setStep(1); // Go back to step 1 to show error
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 py-16 px-4">
      {/* Navbar / Logo Header */}
      <div className="max-w-4xl mx-auto flex justify-center mb-12">
        <Link href="/" className="inline-block">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">Kabar Bahagia</h1>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {step === 1 && (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-neutral-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-extrabold text-[#000000] mb-2 text-center">Mulai Undangan Anda</h2>
            <p className="text-neutral-500 text-sm text-center mb-8">
              Masukkan nama panggilan dan tentukan alamat website undangan (URL) Anda.
            </p>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg border border-red-100 mb-6 text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleNextStep} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Nama Panggilan Mempelai</label>
                <input 
                  type="text" 
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  placeholder="Contoh: Romi & Shinta" 
                  className="w-full bg-neutral-50 text-base text-neutral-900 px-4 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">Custom URL / Link Undangan</label>
                <div className="flex items-center">
                  <span className="bg-neutral-100 border border-neutral-200 border-r-0 rounded-l-xl px-4 py-3 text-neutral-500 text-sm select-none">
                    kabarbaik.co/
                  </span>
                  <input 
                    type="text" 
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="romishinta" 
                    className="w-full bg-white text-base text-neutral-900 px-4 py-3 rounded-r-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                  />
                </div>
                <p className="text-xs text-neutral-400 mt-2">Hanya gunakan huruf kecil, angka, dan strip (-).</p>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#000000] hover:bg-[#171717] text-white text-base font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4"
              >
                Lanjutkan →
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] tracking-tight mb-3">Pilih Paket Undangan</h2>
              <p className="text-neutral-500 text-base max-w-xl mx-auto">
                Pilih paket yang sesuai kebutuhan. Anda dapat memilih tema undangan di langkah selanjutnya pada dashboard Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-8 flex flex-col h-full transition-transform hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-[#000000] text-white shadow-2xl ring-2 ring-[#000000]'
                      : 'bg-white border border-neutral-200 shadow-sm'
                  }`}
                >
                  <div className="flex-1 flex flex-col justify-center items-center text-center py-6">
                    <h3 className={`text-3xl font-extrabold mb-3 ${plan.popular ? 'text-white' : 'text-[#000000]'}`}>
                      {plan.name}
                    </h3>
                    <div className={`text-xl font-bold ${plan.popular ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {plan.price}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPackage(plan.id)}
                    disabled={isLoading}
                    className={`mt-8 w-full py-3.5 rounded-xl text-center text-sm font-bold transition-all block cursor-pointer disabled:opacity-50 ${
                      plan.popular
                        ? 'bg-white text-[#000000] hover:bg-neutral-100'
                        : 'bg-[#000000] text-white hover:bg-[#171717] shadow-lg'
                    }`}
                  >
                    {isLoading ? 'Memproses...' : `Pilih ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-neutral-500 hover:text-[#000000] transition-colors"
                type="button"
              >
                ← Kembali ke pengisian nama
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingFlow />
    </Suspense>
  );
}
