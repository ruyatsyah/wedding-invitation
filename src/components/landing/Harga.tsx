import React from 'react';
import Link from 'next/link';

interface Plan {
  name: string;
  price: string;
  period: string;
  isPopular: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    name: 'Bronze (Trial)',
    price: 'Rp 0',
    period: '3 Hari',
    isPopular: false,
    features: [
      'Pilihan 3 Tema Standar',
      'Galeri Foto (Maks 3)',
      'Buku Tamu / Wish List',
      'RSVP Kehadiran Standar',
      'Masa Aktif 3 Hari',
    ],
  },
  {
    name: 'Silver Package',
    price: 'Rp 49.000',
    period: '1 Bulan',
    isPopular: false,
    features: [
      'Semua Pilihan Tema Desain',
      'Galeri Foto (Maks 10)',
      'Custom Backsound Musik',
      'Integrasi Google Maps',
      'Download Data Tamu',
      'Masa Aktif 1 Bulan',
    ],
  },
  {
    name: 'Gold Package',
    price: 'Rp 99.000',
    period: '6 Bulan',
    isPopular: true,
    features: [
      'Semua Fitur Silver Package',
      'Galeri Foto & Video Tanpa Batas',
      'Angpao & Hadiah Digital',
      'Kirim Undangan WhatsApp API',
      'Tamu VIP / Rombongan Unlimited',
      'Masa Aktif 6 Bulan',
    ],
  },
];

export default function Harga() {
  return (
    <section id="harga" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Pilihan Paket Harga Terbaik</h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Pilih paket harga yang pas dan sesuai dengan kebutuhan pernikahan impian Anda. Pembayaran transparan, aman, dan tanpa biaya tambahan tersembunyi.
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-8 border flex flex-col justify-between text-left transition-all ${
                plan.isPopular
                  ? 'border-[#8e1b42] shadow-xl relative scale-105 md:scale-105 z-10'
                  : 'border-slate-100 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#8e1b42] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Paling Populer ⭐
                </span>
              )}

              <div>
                <h4 className="font-bold text-slate-800 text-lg mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-3xl font-extrabold text-slate-800">{plan.price}</span>
                  <span className="text-slate-400 text-xs font-semibold">/ {plan.period}</span>
                </div>
                <hr className="border-slate-100 my-6" />
                <ul className="space-y-3.5 text-xs text-slate-600">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="text-[#8e1b42] font-semibold">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/admin"
                className={`w-full py-3.5 rounded-xl text-center text-xs font-semibold mt-8 block transition-all ${
                  plan.isPopular
                    ? 'bg-[#8e1b42] hover:bg-[#731433] text-white shadow-md shadow-pink-900/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Pilih Paket Ini
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
