import dynamic from 'next/dynamic';

const SettingsView = dynamic(() => import('@/components/admin/SettingsView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Settings...</p>
    </div>
  ),
});

export default function SettingsPage() {
  return <SettingsView />;
}
