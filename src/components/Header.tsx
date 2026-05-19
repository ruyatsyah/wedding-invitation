import Link from "next/link";
import React from "react";

const Header = () => {
  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tema", href: "/tema" },
    { name: "Fitur", href: "/fitur" },
    { name: "Harga", href: "/harga" },
    { name: "Download", href: "/download" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Layar Tamu", href: "/layar-tamu" },
  ];

  return (
    <header className="w-full bg-[#FCF8F9] px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10">
          {/* Heart 1 */}
          <svg
            className="absolute left-0 text-pink-400 opacity-80"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {/* Heart 2 */}
          <svg
            className="absolute right-0 text-[#8e1b42]"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900 leading-tight">Wevitation</span>
          <span className="text-[9px] text-gray-500 tracking-wider">online wedding invitation</span>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm text-gray-600 hover:text-[#8e1b42] transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Login Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="bg-[#8e1b42] hover:bg-[#731433] text-white text-sm font-medium px-6 py-2 rounded-md transition-colors shadow-sm"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
