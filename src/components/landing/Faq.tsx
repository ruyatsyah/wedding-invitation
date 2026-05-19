import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Berapa lama masa aktif undangan digital saya?',
    answer: 'Masa aktif undangan bervariasi bergantung paket yang Anda pilih. Mulai dari 3 hari pada paket Trial (Bronze), 1 bulan pada paket Silver, hingga 6 bulan penuh pada paket Gold. Jika masa aktif habis, data Anda tetap tersimpan dan dapat diperpanjang kembali kapan saja.',
  },
  {
    question: 'Apakah saya bisa mengedit undangan setelah disebarkan?',
    answer: 'Tentu saja bisa! Anda dapat melakukan perubahan informasi acara, mengunggah foto pre-wedding tambahan, mengganti lagu backsound, maupun memperbarui rute maps kapan pun secara instan dan tanpa biaya tambahan.',
  },
  {
    question: 'Bagaimana cara membagikan undangan via WhatsApp?',
    answer: 'Wevitation menyediakan integrasi pengiriman WhatsApp API. Pada Dashboard Admin, Anda cukup memasukkan nama tamu beserta nomor WhatsApp mereka, lalu klik "Kirim WA". Aplikasi akan otomatis membuka WhatsApp dengan pesan khusus terformat rapi.',
  },
  {
    question: 'Apakah ada batasan jumlah tamu undangan?',
    answer: 'Tidak ada batasan jumlah nama tamu! Anda dapat mendaftarkan ribuan nama tamu VIP maupun rombongan secara gratis tanpa batasan kuota pada seluruh paket premium kami.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#FCF8F9]/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Menjawab rasa penasaran Anda seputar pendaftaran, fitur lengkap, masa aktif, maupun sistem pengiriman undangan digital Wevitation.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-rose-100/50 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 text-left font-bold text-slate-800 text-sm sm:text-base flex justify-between items-center outline-none cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className="text-rose-600 font-extrabold text-lg">
                  {openIdx === idx ? '−' : '+'}
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIdx === idx ? 'max-h-40 border-t border-slate-50 p-6' : 'max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
