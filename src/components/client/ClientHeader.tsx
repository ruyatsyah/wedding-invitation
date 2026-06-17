'use client';

import { Search, Bell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function ClientHeader() {
  const pathname = usePathname();

  // Simple title mapping based on pathname
  let pageTitle = 'My Invitations';
  if (pathname.includes('/catalog')) pageTitle = 'Template Catalog';
  if (pathname.includes('/undangan')) pageTitle = 'Undangan Saya';

  if (pathname.includes('/edit')) {
    return null;
  }

  return (
    <header className="h-16 bg-[#FCFBFC] border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
      <h2 className="text-lg font-semibold text-slate-800">{pageTitle}</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={pageTitle === 'Template Catalog' ? 'Search templates...' : 'Search events...'}
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8D1A42]/20 w-64"
          />
        </div>

        <button className="text-slate-500 hover:text-slate-700 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">Alex Rivera</p>
            <p className="text-xs text-slate-500">Premium</p>
          </div>
          <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
