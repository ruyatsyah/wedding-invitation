import React from 'react';

const FEATURES = [
  { icon: '✅', title: 'Konfirmasi RSVP Instan',      desc: 'Tamu konfirmasi kehadiran dan jumlah rombongan langsung dari undangan. Dashboard real-time.' },
  { icon: '📖', title: 'Buku Tamu Digital',            desc: 'Ucapan dan doa restu tamu tersimpan permanen dan bisa ditampilkan di halaman undangan.' },
  { icon: '🎵', title: 'Backsound Romantis',           desc: 'Pilih lagu latar favorit yang mengalun otomatis saat undangan dibuka oleh tamu.' },
  { icon: '🖼️', title: 'Galeri Foto & Cerita',         desc: 'Bagikan momen pre-wedding dan kisah perjalanan cinta Anda dalam tampilan galeri elegan.' },
  { icon: '📍', title: 'Petunjuk Lokasi Maps',         desc: 'Tamu cukup satu klik untuk mendapat rute navigasi menuju lokasi akad dan resepsi.' },
  { icon: '💰', title: 'Angpao & Hadiah Digital',      desc: 'Tamu bisa kirim kado atau amplop digital langsung dari halaman undangan tanpa repot.' },
  { icon: '⏱️', title: 'Countdown Hari Pernikahan',    desc: 'Hitung mundur hari, jam, dan menit menuju momen sakral pernikahan Anda.' },
  { icon: '📱', title: 'Tampilan Mobile-First',        desc: 'Desain responsif yang sempurna di segala ukuran layar, dari HP hingga desktop.' },
  { icon: '🔒', title: 'Data Aman & Terlindungi',     desc: 'Database MongoDB Atlas terenkripsi dengan perlindungan tingkat enterprise.' },
];

export default function Fitur() {
  return (
    <section id="fitur" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">Fitur Platform</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Lengkap untuk Hari Bahagia Anda</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Semua yang Anda butuhkan untuk membagikan undangan pernikahan secara digital, dalam satu platform.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-100 hover:border-rose-100 hover:shadow-md transition-all bg-white group"
            >
              <div className="w-11 h-11 bg-rose-50 group-hover:bg-rose-100 rounded-xl flex items-center justify-center text-xl mb-4 transition-colors">
                {f.icon}
              </div>
              <h4 className="font-semibold text-slate-800 mb-2 text-sm">{f.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
