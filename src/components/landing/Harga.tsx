import React from 'react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Bronze',
    tagline: 'Coba dulu gratis',
    price: 'Rp 0',
    period: '3 hari',
    popular: false,
    features: ['3 Tema Standar', 'Galeri 3 Foto', 'Buku Tamu Digital', 'RSVP Kehadiran', 'Masa Aktif 3 Hari'],
    cta: 'Coba Gratis',
  },
  {
    name: 'Silver',
    tagline: 'Untuk pasangan romantis',
    price: 'Rp 49.000',
    period: '1 bulan',
    popular: false,
    features: ['Semua Tema Premium', 'Galeri 10 Foto', 'Custom Backsound', 'Integrasi Google Maps', 'Download Data Tamu', 'Masa Aktif 1 Bulan'],
    cta: 'Pilih Silver',
  },
  {
    name: 'Gold',
    tagline: 'Paling lengkap & populer',
    price: 'Rp 99.000',
    period: '6 bulan',
    popular: true,
    features: ['Semua Fitur Silver', 'Galeri & Video Unlimited', 'Angpao Digital', 'WhatsApp Blast API', 'Tamu Unlimited', 'Layar Tamu Proyektor', 'Masa Aktif 6 Bulan'],
    cta: 'Pilih Gold',
  },
];

export default function Harga() {
  return (
    <section id="harga" className="py-24 bg-slate-50/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">Harga & Paket</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Transparan, Tanpa Biaya Tersembunyi</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Pilih paket yang sesuai kebutuhan. Bayar sekali, aktif sesuai masa berlaku.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col h-full ${
                plan.popular
                  ? 'bg-[#8e1b42] text-white shadow-xl shadow-rose-900/20 ring-2 ring-[#8e1b42]'
                  : 'bg-white border border-slate-100 shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full mb-4">
                  ⭐ Paling Populer
                </span>
              )}
              <p className={`text-xs font-medium mb-1 ${plan.popular ? 'text-rose-200' : 'text-slate-400'}`}>
                {plan.tagline}
              </p>
              <h3 className={`text-2xl font-extrabold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mt-3 mb-6">
                <span className={`text-3xl font-extrabold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-xs ${plan.popular ? 'text-rose-200' : 'text-slate-400'}`}>
                  / {plan.period}
                </span>
              </div>

              <ul className="space-y-3 text-sm flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold ${plan.popular ? 'text-rose-200' : 'text-[#8e1b42]'}`}>✓</span>
                    <span className={plan.popular ? 'text-rose-50' : 'text-slate-600'}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/admin"
                className={`mt-8 w-full py-3 rounded-xl text-center text-sm font-semibold transition-all block ${
                  plan.popular
                    ? 'bg-white text-[#8e1b42] hover:bg-rose-50'
                    : 'bg-[#8e1b42] text-white hover:bg-[#731433] shadow-md shadow-rose-900/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
