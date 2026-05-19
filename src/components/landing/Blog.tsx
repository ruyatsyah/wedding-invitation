import React from 'react';

interface BlogPost {
  title: string;
  category: string;
  date: string;
  summary: string;
}

const POSTS: BlogPost[] = [
  {
    title: 'Tips Memilih Lagu Backsound Romantis Undangan Digital',
    category: 'Inspirasi',
    date: '15 Mei 2026',
    summary: 'Temukan daftar rekomendasi lagu akustik terbaik yang membuat tamu terharu saat membuka undangan digital Anda.',
  },
  {
    title: 'Cara Membuat Rundown Acara Pernikahan Modern Terlengkap',
    category: 'Tips Pernikahan',
    date: '10 Mei 2026',
    summary: 'Persiapkan susunan acara pernikahan dari akad nikah hingga resepsi dengan panduan rundown yang rapi dan terorganisir.',
  },
  {
    title: 'Inspirasi Desain Tema Pernikahan Rustic Kekinian',
    category: 'Tren Desain',
    date: '05 Mei 2026',
    summary: 'Mengenal estetika rustik dengan elemen daun kering, kayu hangat, dan bunga liar untuk pernikahan intim bernuansa alam.',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Artikel & Inspirasi Pernikahan</h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Dapatkan tips persiapan pernikahan, panduan adat, inspirasi gaun, dekorasi, hingga informasi terbaru seputar tren pernikahan.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {POSTS.map((post, idx) => (
            <div
              key={idx}
              className="bg-[#FCF8F9]/40 border border-rose-100/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <span className="text-[10px] text-rose-600 font-semibold uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h4 className="font-bold text-slate-800 text-base hover:text-[#8e1b42] transition-colors cursor-pointer">
                  {post.title}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{post.summary}</p>
              </div>

              <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{post.date}</span>
                <span className="font-semibold text-rose-800 cursor-pointer">Selengkapnya &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
