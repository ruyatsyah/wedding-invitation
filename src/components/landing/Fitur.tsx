import React from 'react';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: '💬',
    title: 'Konfirmasi Kehadiran (RSVP)',
    desc: 'Tamu dapat melakukan konfirmasi kehadiran secara instan, lengkap dengan jumlah rombongan (pax) yang langsung terupdate di dashboard.',
  },
  {
    icon: '📖',
    title: 'Buku Tamu Digital',
    desc: 'Terima ucapan, doa restu tulus, dan harapan terbaik dari seluruh keluarga serta sahabat dekat secara langsung di halaman undangan.',
  },
  {
    icon: '🎵',
    title: 'Musik Latar (Backsound)',
    desc: 'Putar alunan instrumen akustik romantis yang menenangkan hati secara otomatis saat tamu membuka lembar undangan digital.',
  },
  {
    icon: '🖼️',
    title: 'Galeri Foto & Cerita',
    desc: 'Bagikan momen berharga foto pre-wedding, video lamaran, beserta tulisan kisah perjalanan cinta Anda yang menyentuh hati.',
  },
  {
    icon: '📍',
    title: 'Petunjuk Lokasi (Maps)',
    desc: 'Integrasi maps interaktif dengan rute presisi agar tamu tidak tersesat menuju lokasi acara akad nikah maupun resepsi Anda.',
  },
  {
    icon: '💰',
    title: 'Hadiah / Angpao Digital',
    desc: 'Mudahkan tamu untuk mengirimkan kado amplop digital maupun kado barang secara langsung lewat e-wallet atau transfer rekening.',
  },
  {
    icon: '⏰',
    title: 'Countdown Hari Bahagia',
    desc: 'Hitung mundur hari, jam, dan menit yang mendebarkan menuju detik-detik sakral akad nikah pernikahan Anda berdua.',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    desc: 'Layout responsif super elegan yang dirancang khusus agar tampil memukau di seluruh perangkat layar smartphone, tablet, maupun desktop.',
  },
  {
    icon: '🔒',
    title: 'Keamanan Data Terjaga',
    desc: 'Koneksi database MongoDB Atlas dengan perlindungan Mongoose memastikan seluruh data RSVP dan buku tamu Anda aman terlindungi.',
  },
];

export default function Fitur() {
  return (
    <section id="fitur" className="py-24 bg-[#FCF8F9]/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Fitur Lengkap Undangan Digital Anda</h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Dilengkapi dengan beragam fitur premium canggih terlengkap untuk melengkapi kelancaran dan kemudahan penyebaran hari bahagia Anda.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-rose-100/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left space-y-4"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-800 rounded-2xl flex items-center justify-center font-bold text-xl">
                {feat.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-base">{feat.title}</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
