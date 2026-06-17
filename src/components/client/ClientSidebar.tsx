'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, FileText, HelpCircle, Plus } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/client' },
  { icon: BookOpen, label: 'Template Catalog', href: '/client/catalog' },
  { icon: FileText, label: 'Undangan Saya', href: '/client/undangan' },
  { icon: HelpCircle, label: 'Help Center', href: '/client/help' },
];

export default function ClientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#FCFBFC] border-r border-slate-200 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="h-16 flex items-center px-6">
          <Link href="/client" className="text-xl font-bold text-[#8D1A42]">
            Vestainvite
          </Link>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/client' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
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

      <div className="p-4 border-t border-slate-200">
        <button className="w-full flex items-center justify-center gap-2 bg-[#8D1A42] hover:bg-[#721535] text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Create New Invite
        </button>
      </div>
    </aside>
  );
}
