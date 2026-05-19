import React from 'react';

export default function Download() {
  return (
    <section id="download" className="py-24 bg-[#FCF8F9]/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Mockups side */}
        <div className="relative flex justify-center order-2 lg:order-1">
          <div className="absolute inset-0 bg-pink-100/60 rounded-3xl filter blur-3xl transform rotate-3 -z-10"></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl max-w-sm w-full flex items-center justify-between gap-6">
            <div className="space-y-4">
              <span className="text-rose-500 font-bold text-xl">📲</span>
              <h4 className="font-extrabold text-slate-800 text-sm">Unduh di PlayStore</h4>
              <p className="text-slate-500 text-[10px] leading-relaxed">Pantau RSVP & Buku Tamu pernikahan Anda secara real-time langsung melalui smartphone.</p>
              <div className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold">
                GET IT ON Google Play
              </div>
            </div>
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
              <span className="text-slate-300 text-xs">QR Code</span>
            </div>
          </div>
        </div>

        {/* Text Details side */}
        <div className="space-y-6 text-left order-1 lg:order-2">
          <span className="text-rose-600 text-xs font-bold uppercase tracking-wider">Aplikasi Mobile Wevitation</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
            Pantau Kehadiran Tamu Undangan Lebih Praktis
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kelola daftar tamu undangan, pantau konfirmasi kehadiran RSVP secara instan, serta baca doa dan ucapan restu yang masuk dari tamu secara real-time melalui smartphone Anda lewat aplikasi resmi Wevitation.
          </p>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="text-[#8e1b42] font-semibold">✓</span>
              Push Notification instan setiap ada tamu RSVP
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8e1b42] font-semibold">✓</span>
              Kirim undangan via WhatsApp tanpa batas kuota
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8e1b42] font-semibold">✓</span>
              Edit info mempelai & galeri foto kapan saja gratis
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
