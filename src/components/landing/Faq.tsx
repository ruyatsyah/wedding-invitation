'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Berapa lama masa aktif undangan digital saya?',
    a: 'Masa aktif tergantung paket: 3 hari (Bronze Trial), 1 bulan (Silver), hingga 6 bulan (Gold). Data Anda tetap aman setelah masa aktif habis dan dapat diperpanjang kapan saja.',
  },
  {
    q: 'Apakah saya bisa mengedit undangan setelah disebarkan?',
    a: 'Ya! Anda bisa mengedit informasi acara, foto, lagu backsound, dan rute maps kapan saja tanpa biaya tambahan melalui Dashboard Admin.',
  },
  {
    q: 'Bagaimana cara kirim undangan via WhatsApp?',
    a: 'Di Dashboard Admin, masukkan nama dan nomor WA tamu, lalu klik "Kirim WA". Aplikasi akan otomatis membuka WhatsApp dengan pesan undangan terformat beserta link personal tamu.',
  },
  {
    q: 'Apakah ada batasan jumlah tamu?',
    a: 'Tidak ada! Anda bisa mendaftarkan tamu sebanyak apapun tanpa batasan di semua paket premium kami.',
  },
  {
    q: 'Apakah data tamu aman tersimpan?',
    a: 'Ya. Seluruh data tersimpan di MongoDB Atlas dengan enkripsi tingkat enterprise. Kami tidak menjual atau membagikan data Anda kepada pihak ketiga.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50/60">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Pertanyaan yang Sering Ditanyakan</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-slate-800 hover:text-[#8e1b42] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className={`ml-4 flex-shrink-0 text-[#8e1b42] text-lg font-light transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open === i ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
