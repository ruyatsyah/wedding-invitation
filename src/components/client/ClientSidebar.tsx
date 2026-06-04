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
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export default function ClientSidebar({ isOpen = false, onClose, isMinimized = false, onToggleMinimize }: ClientSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' });
  };

  const sidebarContent = (isMobile: boolean) => (
    <div className="flex flex-col min-h-full w-full">
      <div className="flex-1">
        {/* Logo */}
        <div className={`h-16 flex items-center ${(!isMobile && isMinimized) ? 'justify-center' : 'justify-between px-6'} border-b border-neutral-100`}>
          <Link href="/client" className="flex items-center gap-2">
            {(!isMinimized || isMobile) ? (
              <h1 className="text-base font-bold text-[#000000] leading-tight tracking-tight whitespace-nowrap">Kabar Bahagia</h1>
            ) : (
              <h1 className="text-xl font-bold text-[#000000] leading-tight tracking-tight">KB</h1>
            )}
          </Link>
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Toggle Minimize Button Removed */}

        {/* Navigation */}
        <nav className={`px-4 space-y-1 ${(!isMobile && onToggleMinimize) ? 'mt-2' : 'mt-4'}`}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/client' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                title={(!isMobile && isMinimized) ? item.label : undefined}
                className={`flex items-center ${(!isMobile && isMinimized) ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#000000] text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                {(!isMinimized || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className={`p-4 space-y-2 border-t border-neutral-100 ${!isMobile && isMinimized ? 'px-2' : ''}`}>
        <Link
          href="/client/catalog"
          onClick={isMobile ? onClose : undefined}
          title={(!isMobile && isMinimized) ? "Buat Undangan Baru" : undefined}
          className={`w-full flex items-center justify-center ${(!isMobile && isMinimized) ? 'px-0' : 'gap-2 px-4'} bg-[#000000] hover:bg-[#171717] text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-black/10`}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {(!isMinimized || isMobile) && <span className="whitespace-nowrap">Buat Undangan</span>}
        </Link>
        <button
          onClick={handleSignOut}
          title={(!isMobile && isMinimized) ? "Keluar" : undefined}
          className={`w-full flex items-center justify-center ${(!isMobile && isMinimized) ? 'px-0' : 'gap-2 px-4'} text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 py-2.5 rounded-xl text-sm font-medium transition-colors`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {(!isMinimized || isMobile) && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`fixed top-0 left-0 bottom-0 z-40 h-screen bg-white border-r border-neutral-100 hidden md:flex flex-col overflow-y-visible transition-all duration-300 ${isMinimized ? 'w-20' : 'w-64'}`}>
        {sidebarContent(false)}
      </aside>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" />
      )}
      <aside className={`fixed top-0 bottom-0 left-0 w-64 z-50 md:hidden bg-white flex-col overflow-y-auto transform transition-transform duration-300 ease-in-out border-r border-neutral-100 ${isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'}`}>
        {sidebarContent(true)}
      </aside>
    </>
  );
}
