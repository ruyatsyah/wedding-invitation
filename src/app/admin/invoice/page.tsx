import dynamic from 'next/dynamic';

const TransactionsView = dynamic(() => import('@/components/admin/TransactionsView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Transactions...</p>
    </div>
  ),
});

export default function TransactionsPage() {
  return <TransactionsView />;
}
