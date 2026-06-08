'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Plan {
  _id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  period: string;
  popular: boolean;
  features: string[];
  cta: string;
  sortOrder: number;
}

// Helper: parse harga string jadi angka (e.g. "Rp 49.000" -> 49000)
function parseNumericPrice(price: string): number {
  if (!price) return 0;
  const cleaned = price.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

function OnboardingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || '';

  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [coupleName, setCoupleName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch packages from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/packages');
        const data = await res.json();
        if (data.success) {
          setPlans(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch packages:', err);
      } finally {
        setIsLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  // Auto-select plan from URL query param after plans are loaded
  useEffect(() => {
    if (!initialPlan || plans.length === 0) return;
    // Match by name (case-insensitive) or _id
    const plan = plans.find(
      (p) => p.name.toLowerCase() === initialPlan.toLowerCase() || p._id === initialPlan
    );
    if (plan) {
      setSelectedPlanId(plan._id);
      setSelectedPlan(plan);
      setStep(parseNumericPrice(plan.price) > 0 ? 3 : 2);
    }
  }, [initialPlan, plans]);

  const handleSelectPackage = (plan: Plan) => {
    setSelectedPlanId(plan._id);
    setSelectedPlan(plan);
    setStep(parseNumericPrice(plan.price) > 0 ? 3 : 2);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName || !customUrl) {
      setErrorMsg('Mohon lengkapi semua field form.');
      return;
    }
    setErrorMsg('');
    submitOnboarding();
  };

  const submitOnboarding = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const payload: any = {
        coupleName,
        customUrl,
        plan: selectedPlan?.name?.toLowerCase() || selectedPlanId,
        planId: selectedPlanId,
      };
      if (paymentMethod) payload.paymentMethod = paymentMethod;

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Gagal menyimpan data.');
      }

      router.push('/client/undangan');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName || !customUrl) {
      setErrorMsg('Mohon lengkapi nama dan URL undangan.');
      return;
    }
    if (!paymentMethod) {
      setErrorMsg('Mohon pilih metode pembayaran.');
      return;
    }
    setErrorMsg('');
    submitOnboarding();
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
        {/* Step 1: Pilih Paket */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#000000] tracking-tight mb-3">Pilih Paket Undangan</h2>
              <p className="text-neutral-500 text-base max-w-xl mx-auto">
                Pilih paket yang sesuai kebutuhan. Anda dapat memilih tema undangan di langkah selanjutnya pada dashboard Anda.
              </p>
            </div>

            {isLoadingPlans ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl p-8 bg-white border border-neutral-200 shadow-sm animate-pulse">
                    <div className="h-8 bg-neutral-100 rounded w-1/2 mx-auto mb-4" />
                    <div className="h-6 bg-neutral-100 rounded w-1/3 mx-auto mb-8" />
                    <div className="h-12 bg-neutral-100 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : plans.length === 0 ? (
              <div className="text-center py-16 text-neutral-400">
                <p>Belum ada paket yang tersedia. Silakan hubungi admin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan) => (
                  <div
                    key={plan._id}
                    className={`rounded-2xl p-8 flex flex-col h-full transition-transform hover:-translate-y-1 ${
                      plan.popular
                        ? 'bg-[#000000] text-white shadow-2xl ring-2 ring-[#000000]'
                        : 'bg-white border border-neutral-200 shadow-sm'
                    }`}
                  >
                    {plan.popular && (
                      <div className="text-center mb-3">
                        <span className="bg-white text-[#000000] text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ Populer
                        </span>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center items-center text-center py-6">
                      <h3 className={`text-3xl font-extrabold mb-2 ${plan.popular ? 'text-white' : 'text-[#000000]'}`}>
                        {plan.name}
                      </h3>
                      {plan.tagline && (
                        <p className={`text-sm mb-3 ${plan.popular ? 'text-neutral-300' : 'text-neutral-400'}`}>
                          {plan.tagline}
                        </p>
                      )}
                      <div className={`text-xl font-bold ${plan.popular ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {plan.price}
                      </div>
                      {plan.originalPrice && (
                        <div className={`text-sm line-through mt-1 ${plan.popular ? 'text-neutral-500' : 'text-neutral-300'}`}>
                          {plan.originalPrice}
                        </div>
                      )}
                      <div className={`text-xs mt-1 ${plan.popular ? 'text-neutral-400' : 'text-neutral-400'}`}>
                        / {plan.period}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPackage(plan)}
                      className={`mt-8 w-full py-3.5 rounded-xl text-center text-sm font-bold transition-all block cursor-pointer ${
                        plan.popular
                          ? 'bg-white text-[#000000] hover:bg-neutral-100'
                          : 'bg-[#000000] text-white hover:bg-[#171717] shadow-lg'
                      }`}
                    >
                      {plan.cta || `Pilih ${plan.name}`}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Form Detail Undangan (paket gratis) */}
        {step === 2 && (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-neutral-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-extrabold text-[#000000] mb-2 text-center">Detail Undangan</h2>
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
                disabled={isLoading}
                className="w-full bg-[#000000] hover:bg-[#171717] disabled:opacity-70 text-white text-base font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4"
              >
                {isLoading ? 'Menyimpan...' : 'Selesai & Buka Dashboard'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-neutral-500 hover:text-[#000000] transition-colors"
                type="button"
              >
                ← Kembali pilih paket
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Form Pembayaran (paket berbayar) */}
        {step === 3 && (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-neutral-100 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-extrabold text-[#000000] mb-2 text-center">Form Pembayaran</h2>
            <p className="text-neutral-500 text-sm text-center mb-8">
              Lengkapi detail undangan dan pilih metode pembayaran untuk paket <strong>{selectedPlan?.name}</strong>.
            </p>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg border border-red-100 mb-6 text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
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
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <label className="block text-sm font-semibold text-neutral-800 mb-3">Pilih Metode Pembayaran</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Transfer BCA', 'Transfer Mandiri', 'QRIS', 'E-Wallet (OVO/Dana)'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        paymentMethod === method
                          ? 'border-[#000000] bg-neutral-50 ring-1 ring-[#000000]'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium text-neutral-800">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mt-6 flex justify-between items-center">
                <span className="text-sm font-semibold text-neutral-600">Total Tagihan:</span>
                <span className="text-xl font-extrabold text-[#000000]">
                  {selectedPlan?.price}
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#000000] hover:bg-[#171717] disabled:opacity-70 text-white text-base font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4"
              >
                {isLoading ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setStep(1)}
                className="text-sm font-semibold text-neutral-500 hover:text-[#000000] transition-colors"
                type="button"
              >
                ← Kembali pilih paket
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
