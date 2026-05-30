import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onLoginOpen?: () => void;
}

export default function Footer({ onLoginOpen }: FooterProps) {
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
    { label: 'Testimoni',   id: 'testimoni' },
    { label: 'FAQ',         id: 'faq' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Banner */}
      <div className="bg-[#000000] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Siap Membuat Undangan Pernikahan Digital?</h3>
          <p className="text-neutral-100 text-sm leading-relaxed">
            Mulai gratis hari ini. Tidak perlu kartu kredit, tidak ada biaya tersembunyi.
          </p>
          <button
            onClick={() => onLoginOpen && onLoginOpen()}
            className="inline-block px-8 py-3.5 bg-white text-[#000000] text-sm font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-lg cursor-pointer"
          >
            Buat Undangan Sekarang →
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 text-xl">♥</span>
              <span className="font-extrabold text-xl tracking-tight">Kabar Bahagia</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Platform undangan pernikahan digital terpercaya di Indonesia. Buat, bagikan, dan kelola undangan impian Anda dengan mudah.
            </p>
            <div className="flex gap-2 pt-1">
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all" aria-label="TikTok">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-1.89.28-3.84 1.41-5.36 1.35-1.8 3.55-2.9 5.81-2.91V13c-1.25.04-2.48.56-3.36 1.5-1.02 1.12-1.35 2.76-.84 4.19.45 1.25 1.56 2.27 2.86 2.58 1.34.31 2.8-.07 3.82-1.01.88-.82 1.35-2.02 1.38-3.26.04-5.63.02-11.27.02-16.91l-.01-.07z" />
                </svg>
              </a>
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
              <li>📧 halo@kabarbahagia.com</li>
              <li>📱 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
            <Link
              href="/admin"
              className="inline-block mt-2 px-5 py-2.5 bg-[#000000] hover:bg-[#171717] text-white text-xs font-semibold rounded-lg transition-all"
            >
              Buka Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {year} Kabar Bahagia. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
