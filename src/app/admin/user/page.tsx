import dynamic from 'next/dynamic';

const UserManagementView = dynamic(() => import('@/components/admin/UserManagementView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat User Management...</p>
    </div>
  ),
});

export default function UserManagementPage() {
  return <UserManagementView />;
}
