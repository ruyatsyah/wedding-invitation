'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, FileText, HelpCircle, Plus, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/client' },
  { icon: BookOpen, label: 'Template Catalog', href: '/client/catalog' },
  { icon: FileText, label: 'Undangan Saya', href: '/client/undangan' },
  { icon: HelpCircle, label: 'Help Center', href: '/client/help' },
];

interface ClientSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ClientSidebar({ isOpen = false, onClose }: ClientSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/landing' });
  };

  const sidebarContent = (
    <div className="flex flex-col min-h-full w-full">
      <div className="flex-1">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/client" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-7 h-7">
              <svg className="absolute left-0 text-pink-400 opacity-80" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <svg className="absolute right-0 text-[#8D1A42]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 leading-tight">Kabar Bahagia</span>
              <span className="text-[9px] text-slate-400 tracking-wider">wedding invitation</span>
            </div>
          </Link>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/client' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FDECEE] text-[#8D1A42]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#8D1A42]' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 space-y-2 border-t border-slate-200">
        <Link
          href="/client/catalog"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 bg-[#8D1A42] hover:bg-[#721535] text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buat Undangan Baru
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed top-0 left-0 bottom-0 z-40 w-64 h-screen bg-[#FCFBFC] border-r border-slate-200 hidden md:flex flex-col overflow-y-auto">
        {sidebarContent}
      </aside>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" />
      )}
      <aside className={`fixed top-0 bottom-0 left-0 w-64 z-50 md:hidden bg-[#FCFBFC] flex-col overflow-y-auto transform transition-transform duration-300 ease-in-out border-r border-slate-200 ${isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'}`}>
        {sidebarContent}
      </aside>
    </>
  );
}
