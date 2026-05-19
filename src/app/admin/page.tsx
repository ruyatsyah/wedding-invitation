import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Admin<span className="text-neutral-400">Panel</span></h2>
        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 bg-neutral-800 rounded-lg text-sm font-medium">Dashboard</a>
          <a href="#" className="block px-4 py-2 hover:bg-neutral-800 rounded-lg text-sm font-medium transition-colors text-neutral-300">Pengguna (Client)</a>
          <a href="#" className="block px-4 py-2 hover:bg-neutral-800 rounded-lg text-sm font-medium transition-colors text-neutral-300">Tema & Template</a>
          <a href="#" className="block px-4 py-2 hover:bg-neutral-800 rounded-lg text-sm font-medium transition-colors text-neutral-300">Pengaturan</a>
        </nav>
        
        <div className="absolute bottom-8 left-6">
          <Link href="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            &larr; Kembali ke Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-800">Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-neutral-500">Super Admin</span>
            <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
            <p className="text-neutral-500 text-sm font-medium mb-1">Total Klien</p>
            <p className="text-3xl font-bold text-neutral-800">124</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
            <p className="text-neutral-500 text-sm font-medium mb-1">Undangan Aktif</p>
            <p className="text-3xl font-bold text-neutral-800">89</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
            <p className="text-neutral-500 text-sm font-medium mb-1">Pendapatan Bulan Ini</p>
            <p className="text-3xl font-bold text-neutral-800">Rp 4.5M</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
          <h3 className="font-semibold text-neutral-800 mb-4">Pendaftar Terbaru</h3>
          <p className="text-neutral-500 text-sm">Belum ada data pendaftar baru minggu ini.</p>
        </div>
      </div>
    </main>
  );
}
