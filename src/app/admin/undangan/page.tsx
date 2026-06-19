import dynamic from 'next/dynamic';

const InvitationMonitorView = dynamic(() => import('@/components/admin/InvitationMonitorView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Invitation Monitor...</p>
    </div>
  ),
});

export default function InvitationMonitorPage() {
  return <InvitationMonitorView />;
}
