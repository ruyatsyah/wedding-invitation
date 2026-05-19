import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path d="M7 10C7 7.8 8.8 6 11 6C12.2 6 13.3 6.5 14 7.3C14.7 6.5 15.8 6 17 6C19.2 6 21 7.8 21 10C21 14 14 20 14 20C14 20 7 14 7 10Z" fill="#f43f5e"/>
                <path d="M14 7.3C13.3 6.5 12.2 6 11 6C8.8 6 7 7.8 7 10C7 14 14 20 14 20V7.3Z" fill="#be123c"/>
              </svg>
              <span className="font-extrabold text-xl tracking-tight">Wevitation</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Platform undangan pernikahan digital terlengkap dan terpercaya di Indonesia. Dibuat dengan ❤️ untuk momen paling bahagia dalam hidupmu.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-rose-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all text-sm">f</a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-rose-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all text-sm">ig</a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-rose-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all text-sm">yt</a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                { label: 'Beranda', id: 'beranda' },
                { label: 'Pilihan Tema', id: 'tema' },
                { label: 'Fitur Platform', id: 'fitur' },
                { label: 'Harga & Paket', id: 'harga' },
                { label: 'Artikel Blog', id: 'blog' },
                { label: 'FAQ', id: 'faq' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-rose-400 transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>halo@wevitation.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>

            <div className="pt-4 space-y-2">
              <Link
                href="/admin"
                className="block w-full text-center px-4 py-2.5 bg-rose-800 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Buka Dashboard Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 Wevitation. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rose-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-rose-400 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
