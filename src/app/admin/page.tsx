import dynamic from 'next/dynamic';

const DashboardView = dynamic(() => import('@/components/admin/DashboardView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Admin Dashboard...</p>
    </div>
  ),
});

export default function AdminPage() {
  return <DashboardView />;
}
