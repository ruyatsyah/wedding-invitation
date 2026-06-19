import dynamic from 'next/dynamic';

const TemplateManagerView = dynamic(() => import('@/components/admin/TemplateManagerView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Template Manager...</p>
    </div>
  ),
});

export default function TemplateManagerPage() {
  return <TemplateManagerView />;
}
