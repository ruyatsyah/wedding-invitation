import dynamic from 'next/dynamic';

const AddTemplateView = dynamic(() => import('@/components/admin/AddTemplateView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Form Template...</p>
    </div>
  ),
});

export default function AddTemplatePage() {
  return <AddTemplateView />;
}
