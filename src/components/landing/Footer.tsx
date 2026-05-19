import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    if (typeof window !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NAV = [
    { label: 'Beranda',     id: 'beranda' },
    { label: 'Tema Desain', id: 'tema' },
    { label: 'Fitur',       id: 'fitur' },
    { label: 'Harga',       id: 'harga' },
    { label: 'Blog',        id: 'blog' },
    { label: 'FAQ',         id: 'faq' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Banner */}
      <div className="bg-[#8e1b42] py-14">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Siap Membuat Undangan Pernikahan Digital?</h3>
          <p className="text-rose-100 text-sm leading-relaxed">
            Mulai gratis hari ini. Tidak perlu kartu kredit, tidak ada biaya tersembunyi.
          </p>
          <Link
            href="/admin"
            className="inline-block px-8 py-3.5 bg-white text-[#8e1b42] text-sm font-bold rounded-xl hover:bg-rose-50 transition-all shadow-lg"
          >
            Buat Undangan Sekarang →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-rose-400 text-xl">♥</span>
              <span className="font-extrabold text-xl tracking-tight">Wevitation</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Platform undangan pernikahan digital terpercaya di Indonesia. Buat, bagikan, dan kelola undangan impian Anda dengan mudah.
            </p>
            <div className="flex gap-2 pt-1">
              {['IG', 'FB', 'YT', 'WA'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 hover:text-white transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Navigasi</h4>
            <ul className="space-y-2.5">
              {NAV.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Kontak</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>📧 halo@wevitation.com</li>
              <li>📱 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
            <Link
              href="/admin"
              className="inline-block mt-2 px-5 py-2.5 bg-[#8e1b42] hover:bg-[#731433] text-white text-xs font-semibold rounded-lg transition-all"
            >
              Buka Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {year} Wevitation. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
