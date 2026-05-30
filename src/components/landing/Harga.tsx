'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

interface Package {
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

export default function Harga() {
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages', 'landing'],
    queryFn: async () => {
      const res = await fetch('/api/packages');
      const data = await res.json();
      if (!data.success) return [];
      return data.data as Package[];
    }
  });

  return (
    <section id="harga" className="py-24 bg-slate-50/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#000000]">Harga & Paket</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Transparan, Tanpa Biaya Tersembunyi</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Pilih paket yang sesuai kebutuhan. Bayar sekali, aktif sesuai masa berlaku.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <svg className="animate-spin w-8 h-8 text-[#000000]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            Belum ada paket harga yang tersedia.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {packages.map((plan) => (
              <div
                key={plan._id}
                className={`rounded-2xl p-8 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? 'bg-[#000000] text-white shadow-xl shadow-neutral-900/20 ring-2 ring-[#000000] hover:ring-[#1a1a1a]'
                    : 'bg-white border border-slate-100 shadow-sm hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full mb-4">
                    ⭐ Paling Populer
                  </span>
                )}
                <p className={`text-xs font-medium mb-1 ${plan.popular ? 'text-neutral-200' : 'text-slate-400'}`}>
                  {plan.tagline}
                </p>
                <h3 className={`text-2xl font-extrabold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex flex-col justify-center mt-3 mb-6 min-h-[4rem]">
                  {plan.originalPrice && (
                    <span className="text-sm font-semibold line-through text-slate-400/80 mb-1">
                      {plan.originalPrice}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs ${plan.popular ? 'text-neutral-200' : 'text-slate-400'}`}>
                      / {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <span className={`text-xs font-bold ${plan.popular ? 'text-neutral-200' : 'text-[#000000]'}`}>✓</span>
                      <span className={plan.popular ? 'text-neutral-50' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/register?plan=${plan.name.toLowerCase()}`}
                  className={`mt-8 w-full py-3 rounded-xl text-center text-sm font-semibold transition-all block ${
                    plan.popular
                      ? 'bg-white text-[#000000] hover:bg-neutral-50'
                      : 'bg-[#000000] text-white hover:bg-[#171717] shadow-md shadow-neutral-900/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
