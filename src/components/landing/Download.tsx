import React from 'react';

export default function Download() {
  return (
    <section id="download" className="py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* App card mockup */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-pink-100/50 rounded-3xl filter blur-3xl -z-10" />
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 max-w-sm w-full space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#8e1b42] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-900/20">
                ♥
              </div>
              <div>
                <p className="font-bold text-slate-800">Wevitation App</p>
                <p className="text-xs text-slate-400">Wedding Invitation Platform</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">RSVP Masuk Hari Ini</span>
                <span className="font-bold text-[#8e1b42]">+24 tamu</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-[#8e1b42] h-1.5 rounded-full w-3/4" />
              </div>
              <p className="text-[10px] text-slate-400">75 dari 100 undangan dibuka</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-emerald-700">48</p>
                <p className="text-[9px] text-emerald-600 font-medium">Konfirmasi Hadir</p>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 text-center">
                <p className="text-xl font-extrabold text-rose-700">3</p>
                <p className="text-[9px] text-rose-600 font-medium">Menolak Hadir</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors">
                📲 Google Play
              </button>
              <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors">
                🍎 App Store
              </button>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">Aplikasi Mobile</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pantau Tamu Undangan dari Smartphone
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Kelola daftar tamu, pantau RSVP secara instan, dan baca ucapan tamu langsung dari genggaman tangan Anda. Notifikasi otomatis setiap ada tamu yang konfirmasi.
          </p>
          <ul className="space-y-3">
            {[
              'Push notification instan setiap ada RSVP masuk',
              'Kirim undangan WhatsApp tanpa batas kuota',
              'Edit info undangan kapan saja dari HP',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center text-[#8e1b42] text-xs font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
