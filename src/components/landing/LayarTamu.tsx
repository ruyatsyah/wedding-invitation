import React from 'react';

export default function LayarTamu() {
  return (
    <section id="layar-tamu" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left text */}
        <div className="space-y-6 text-left">
          <span className="text-rose-600 text-xs font-bold uppercase tracking-wider">Fitur Layar Tamu / Projector</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
            Tampilkan Ucapan Tamu di Layar Proyektor Resepsi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hadirkan suasana pernikahan yang interaktif dan berkesan dengan menampilkan doa restu, foto-foto, serta ucapan selamat yang dikirim oleh tamu secara langsung di layar proyektor panggung pelaminan Anda secara real-time.
          </p>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="text-[#8e1b42] font-semibold">✓</span>
              QR Code scan otomatis di pintu masuk penerima tamu
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8e1b42] font-semibold">✓</span>
              Filter sensor otomatis kata-kata kasar / kurang sopan
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8e1b42] font-semibold">✓</span>
              Tampilan animasi premium yang menyatu indah dengan dekorasi panggung
            </li>
          </ul>
        </div>

        {/* Right projector illustration screen */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-pink-100/50 rounded-3xl filter blur-3xl transform -rotate-3 -z-10"></div>
          
          {/* Main big screen mockup */}
          <div className="bg-slate-900 p-4 rounded-3xl shadow-2xl border-4 border-slate-800 w-full max-w-lg aspect-video flex flex-col justify-between text-white p-6 relative overflow-hidden">
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent -z-10"></div>
            
            <header className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-[10px] tracking-widest uppercase text-pink-400 font-bold">♥ Wevitation Live Screen</span>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold animate-pulse">● LIVE STREAMING</span>
            </header>

            {/* Simulated Live wishes scrolling */}
            <div className="my-auto space-y-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/5 text-left text-xs animate-pulse" style={{ animationDuration: '4s' }}>
                <div className="flex justify-between font-bold mb-1">
                  <span>Aditya Nugraha</span>
                  <span className="text-[8px] text-slate-400">Baru saja</span>
                </div>
                <p className="text-slate-200 italic">"Selamat ya Rian & Rina! Semoga samawa selalu, bahagia lahir batin sampai maut memisahkan."</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/5 text-left text-xs">
                <div className="flex justify-between font-bold mb-1">
                  <span>Citra Kirana</span>
                  <span className="text-[8px] text-slate-400">1 menit yang lalu</span>
                </div>
                <p className="text-slate-200 italic">"Happy wedding Rian & Rina! Maaf belum bisa hadir langsung, doa terbaik dari jauh yaa!"</p>
              </div>
            </div>

            <footer className="text-[9px] text-slate-400 text-center border-t border-white/10 pt-3">
              Scan QR Code pada buku tamu fisik untuk mengirimkan ucapan Anda
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
