import dynamic from 'next/dynamic';

const PackageManagerView = dynamic(() => import('@/components/admin/PackageManagerView'), {
  loading: () => (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat Pengaturan Paket Harga...</p>
    </div>
  ),
});

export default function PackagePricingPage() {
  return <PackageManagerView />;
}
