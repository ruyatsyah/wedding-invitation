'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const NAV_LINKS = [
  { name: 'Beranda',    id: 'beranda' },
  { name: 'Tema',       id: 'tema' },
  { name: 'Fitur',      id: 'fitur' },
  { name: 'Harga',      id: 'harga' },
  { name: 'Download',   id: 'download' },
  { name: 'Blog',       id: 'blog' },
  { name: 'FAQ',        id: 'faq' },
  { name: 'Layar Tamu', id: 'layar-tamu' },
];

const Header = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/landing';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (isLandingPage) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-[#FCF8F9]/95 backdrop-blur-sm px-6 md:px-12 py-4 flex items-center justify-between border-b border-rose-100/60 sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <div className="flex-1 flex justify-start">
        <Link href="/landing" className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10">
          <svg className="absolute left-0 text-pink-400 opacity-80" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <svg className="absolute right-0 text-[#8e1b42]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 leading-tight">Kabar Bahagia</span>
          <span className="text-[9px] text-slate-400 tracking-wider">online wedding invitation</span>
        </div>
      </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        {NAV_LINKS.map((link) =>
          isLandingPage ? (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm text-slate-600 hover:text-[#8e1b42] transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ) : (
            <Link
              key={link.id}
              href={`/landing#${link.id}`}
              className="text-sm text-slate-600 hover:text-[#8e1b42] transition-colors"
            >
              {link.name}
            </Link>
          )
        )}
      </nav>

      {/* Right Buttons */}
      <div className="flex-1 flex justify-end items-center gap-3">
        <Link
          href="/login"
          className="bg-[#8e1b42] hover:bg-[#731433] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all shadow-sm hidden sm:block"
        >
          Login
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1 cursor-pointer p-2"
          aria-label="Menu"
        >
          <span className={`w-5 h-0.5 bg-slate-700 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-slate-700 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-slate-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-rose-100 shadow-lg z-50 lg:hidden">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map((link) =>
              isLandingPage ? (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-sm text-slate-600 hover:text-[#8e1b42] py-3 px-4 rounded-lg hover:bg-rose-50 transition-colors text-left cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.id}
                  href={`/landing#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-600 hover:text-[#8e1b42] py-3 px-4 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
            <Link
              href="/login"
              className="mt-2 bg-[#8e1b42] text-white text-sm font-semibold px-4 py-3 rounded-lg transition-all text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
