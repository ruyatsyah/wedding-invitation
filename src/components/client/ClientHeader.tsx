'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, LogOut, Settings, ChevronDown, Gem } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface ClientHeaderProps {
  onMenuClick?: () => void;
}

export default function ClientHeader({ onMenuClick }: ClientHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
  });

  let userTier = 'BRONZE';
  if ((user as any)?.role === 'admin') {
    userTier = 'GOLD';
  } else if (projects.some((p: any) => p.plan?.toLowerCase().includes('gold'))) {
    userTier = 'GOLD';
  } else if (projects.some((p: any) => p.plan?.toLowerCase().includes('silver'))) {
    userTier = 'SILVER';
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  let pageTitle = 'My Invitations';
  if (pathname.includes('/catalog')) pageTitle = 'Template Catalog';
  if (pathname.includes('/undangan')) pageTitle = 'Undangan Saya';

  if (pathname.includes('/edit')) return null;

  return (
    <header className="h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 -ml-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-semibold text-[#000000] truncate max-w-[120px] sm:max-w-none">{pageTitle}</h2>
          {isLoading ? (
            <span className="inline-flex w-[60px] h-[22px] rounded-full bg-neutral-200 animate-pulse"></span>
          ) : (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
              userTier === 'GOLD' 
                ? 'bg-amber-100 text-amber-700 border-amber-200' 
                : userTier === 'SILVER' 
                  ? 'bg-slate-100 text-slate-700 border-slate-200' 
                  : 'bg-[#8F6B52]/10 text-[#8F6B52] border-[#8F6B52]/20'
            }`}>
              <Gem className="w-2.5 h-2.5" />
              {userTier}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/10 w-48 md:w-56 text-neutral-700 placeholder-neutral-400"
          />
        </div>

        {/* Bell */}
        <button className="text-neutral-400 hover:text-neutral-700 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#000000] rounded-full border border-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {status === 'loading' ? (
            <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse flex-shrink-0" />
              <div className="text-left hidden sm:block">
                <div className="w-20 h-4 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-3 border-l border-neutral-200 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center flex-shrink-0">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? 'User'}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-4 h-4 text-neutral-500" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-neutral-900 leading-tight max-w-[100px] truncate">{user?.name ?? 'Client'}</p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform hidden sm:block ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-neutral-100">
                <p className="text-sm font-semibold text-neutral-900 truncate">{user?.name ?? 'Client'}</p>
                <p className="text-xs text-neutral-500 truncate mt-0.5">{user?.email ?? ''}</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={() => { setDropdownOpen(false); router.push('/client/profile'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-neutral-400" />
                  Edit Profil
                </button>
              </div>

              <div className="border-t border-neutral-100 py-1">
                <button
                  onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: '/landing' }); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
