import React from 'react';

export default function LayarTamu() {
  return (
    <section id="layar-tamu" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#000000]">Layar Tamu</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Tampilkan Ucapan Tamu di Layar Proyektor
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Hadirkan suasana interaktif di resepsi Anda dengan menampilkan ucapan dan doa restu tamu secara <em>real-time</em> di layar proyektor panggung. Setiap tamu merasa dihargai.
          </p>
          <ul className="space-y-3">
            {[
              'QR Code scan otomatis di pintu masuk penerima tamu',
              'Filter otomatis konten yang tidak sesuai',
              'Animasi tampilan premium yang memukau',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-50 flex items-center justify-center text-[#000000] text-xs font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Screen Mockup */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <div className="absolute inset-0 bg-neutral-50/60 rounded-3xl filter blur-3xl -z-10" />

          <div className="w-full max-w-lg bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Top bar */}
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 text-xs">♥</span>
                <span className="text-xs font-semibold text-slate-300">Kabar Bahagia Live Screen</span>
              </div>
              <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Wishes feed */}
            <div className="p-5 space-y-3">
              {[
                { name: 'Aditya Nugraha', time: 'Baru saja', msg: 'Selamat ya Rian & Rina! Semoga sakinah mawaddah warahmah selalu. 🎉', status: 'Hadir' },
                { name: 'Citra Kirana',   time: '1 mnt lalu',  msg: 'Happy wedding! Maaf belum bisa hadir langsung. Doa terbaik dari jauh! ❤️', status: 'Tidak Hadir' },
                { name: 'Budi Santoso',   time: '3 mnt lalu',  msg: 'Selamat berbahagia untuk kalian berdua. Semoga rumah tangganya penuh berkah.', status: 'Hadir' },
              ].map((wish, i) => (
                <div
                  key={i}
                  className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-left ${i === 0 ? 'ring-1 ring-neutral-400/30' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1.5 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{wish.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded flex items-center gap-1 font-medium ${
                        wish.status === 'Hadir' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {wish.status === 'Hadir' ? '✓' : '✕'} {wish.status}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-500 whitespace-nowrap mt-0.5">{wish.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">&ldquo;{wish.msg}&rdquo;</p>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="px-5 py-3 border-t border-slate-800 text-center">
              <p className="text-[9px] text-slate-500">Scan QR Code untuk mengirim ucapan Anda</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
