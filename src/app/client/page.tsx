import Link from 'next/link';

export default function ClientPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Mempelai</h1>
            <p className="text-slate-500 mt-1">Kelola data tamu dan detail undangan Anda</p>
          </div>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            &larr; Kembali ke Home
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2">Daftar Tamu</h3>
            <p className="text-slate-500 text-sm mb-4">Kelola nama dan RSVP tamu undangan Anda.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Detail &rarr;</button>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2">Cerita & Galeri</h3>
            <p className="text-slate-500 text-sm mb-4">Unggah foto pre-wedding dan kisah cinta Anda.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Kelola Media &rarr;</button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2">Acara & Waktu</h3>
            <p className="text-slate-500 text-sm mb-4">Atur jadwal akad nikah dan resepsi.</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Atur Jadwal &rarr;</button>
          </div>
        </div>
      </div>
    </main>
  );
}
