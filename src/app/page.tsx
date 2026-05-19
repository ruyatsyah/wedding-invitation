import Link from 'next/link';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-24">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl font-bold text-rose-800 tracking-tight">
            Wedding Invitation Platform
          </h1>
          <p className="text-xl text-rose-600/80">
            Buat undangan pernikahan digital impianmu dengan mudah dan elegan.
          </p>
          
          <div className="flex gap-4 justify-center mt-10">
            <Link 
              href="/client" 
              className="px-8 py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
            >
              Halaman Client (Mempelai)
            </Link>
            <Link 
              href="/admin" 
              className="px-8 py-3 bg-white text-rose-600 border border-rose-200 rounded-full font-medium hover:bg-rose-50 transition-colors"
            >
              Halaman Admin (Pengelola)
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
