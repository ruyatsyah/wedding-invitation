import React from 'react';

const TESTIMONIALS = [
  {
    name: "Rina & Dimas",
    role: "Menikah Jan 2024",
    text: "Sangat membantu! Tamu undangan memuji desainnya yang elegan dan fitur RSVP-nya membuat rekap kehadiran jauh lebih mudah.",
    rating: 5,
  },
  {
    name: "Sarah & Kevin",
    role: "Menikah Mar 2024",
    text: "Fitur Auto WA Blast benar-benar menyelamatkan waktu kami. Tinggal klik, undangan tersebar ke ratusan kontak sekaligus.",
    rating: 5,
  },
  {
    name: "Alya & Budi",
    role: "Menikah Mei 2024",
    text: "Harga sangat terjangkau dibandingkan fitur yang didapat. Layar tamu live screen bikin resepsi kami jadi lebih interaktif!",
    rating: 5,
  },
  {
    name: "Dinda & Reza",
    role: "Menikah Jul 2024",
    text: "Pilihan tema yang ditawarkan sangat modern dan kekinian. Kami tidak perlu pusing mikirin desain, semuanya sudah siap pakai dan mudah dikustomisasi.",
    rating: 5,
  },
  {
    name: "Nisa & Ilham",
    role: "Menikah Agu 2024",
    text: "Customer service-nya sangat responsif. Ada kendala sedikit saat mengatur lokasi Google Maps, tapi langsung dibantu sampai tuntas.",
    rating: 5,
  },
  {
    name: "Putri & Ardi",
    role: "Menikah Sep 2024",
    text: "Membantu banget untuk mengatur acara dari jarak jauh. Mengumpulkan RSVP dan amplop digital jadi sangat praktis dan aman.",
    rating: 5,
  },
];

export default function Testimoni() {
  return (
    <section id="testimoni" className="py-24 bg-neutral-50 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-12">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#000000]">Testimoni</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata Mereka?
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Ribuan pasangan telah mempercayakan momen bahagia mereka kepada Kabar Bahagia.
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-neutral-900/5 border border-neutral-100 hover:-translate-y-1 transition-transform snap-center flex-shrink-0 w-[300px] sm:w-[350px] text-left"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                <p className="text-[10px] text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Style for hiding scrollbar in webkit browsers */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
