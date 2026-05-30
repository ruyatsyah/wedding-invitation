'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const adminUser = session?.user;
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: 'Template Manager',
      href: '/admin/tema',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Invitation Monitor',
      href: '/admin/undangan',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
        </svg>
      ),
    },
    {
      name: 'Paket Harga',
      href: '/admin/paket-harga',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'User Management',
      href: '/admin/user',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      name: 'Transactions',
      href: '/admin/invoice',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'System Settings',
      href: '/admin/setting',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between min-h-full" style={{ background: 'linear-gradient(180deg, #fefefe 0%, #faf7f8 100%)' }}>
      {/* Brand */}
      <div>
        <div className="px-6 pt-7 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-7 h-7">
                <svg className="absolute left-0 text-pink-400 opacity-80" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <svg className="absolute right-0 text-[#8D1A42]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-tight" style={{ color: '#8D1A42' }}>
                  Kabar Bahagia
                </h2>
                <p className="text-[10px] text-slate-400 font-medium">Admin Panel</p>
              </div>
            </div>
            {onClose && (
              <button onClick={onClose} className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-0.5">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: '#8D1A42',
                        color: '#ffffff',
                        boxShadow: '0 4px 12px rgba(141, 26, 66, 0.25)',
                      }
                    : {
                        color: '#64748b',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8f0f3';
                    e.currentTarget.style.color = '#8D1A42';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile + Logout at Bottom */}
      <div className="px-4 pb-5">
        <div className="border-t border-slate-100 pt-4 space-y-1">
          {/* Profile dropdown trigger */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center flex-shrink-0">
                {adminUser?.image ? (
                  <Image
                    src={adminUser.image}
                    alt={adminUser.name ?? 'Admin'}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{adminUser?.name ?? 'Admin'}</p>
                <p className="text-[11px] text-slate-400 truncate">{adminUser?.email ?? ''}</p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                <button
                  onClick={() => { setProfileOpen(false); router.push('/admin/setting'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Pengaturan
                </button>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Persistent) */}
      <aside className="w-60 hidden md:block shrink-0 h-screen fixed top-0 left-0 bottom-0 z-40 overflow-y-auto border-r border-slate-100">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-60 z-50 md:hidden transform transition-transform duration-300 ease-in-out border-r border-slate-100 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
