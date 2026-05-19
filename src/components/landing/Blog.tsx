import React from 'react';

const POSTS = [
  {
    tag: 'Inspirasi',
    date: '15 Mei 2026',
    title: 'Tips Memilih Lagu Backsound Romantis untuk Undangan Digital',
    excerpt: 'Rekomendasi lagu akustik terbaik yang membuat tamu terharu saat membuka undangan.',
  },
  {
    tag: 'Tips',
    date: '10 Mei 2026',
    title: 'Cara Membuat Rundown Acara Pernikahan Modern yang Terstruktur',
    excerpt: 'Panduan lengkap menyusun jadwal akad hingga resepsi agar berjalan lancar dan tepat waktu.',
  },
  {
    tag: 'Desain',
    date: '5 Mei 2026',
    title: 'Inspirasi Tema Pernikahan Rustic yang Hangat dan Alami',
    excerpt: 'Elemen kayu, bunga liar, dan kain rami yang menyatu indah dalam konsep pernikahan di alam terbuka.',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8e1b42]">Artikel Blog</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Inspirasi Pernikahan</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-[#8e1b42] hover:underline self-start sm:self-auto">
            Lihat Semua Artikel →
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <article
              key={i}
              className="bg-slate-50/70 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="h-48 bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
                <span className="text-4xl opacity-30">🌸</span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e1b42] bg-rose-50 px-2.5 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">{post.date}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 flex-1">{post.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
                <a href="#" className="text-xs font-semibold text-[#8e1b42] hover:underline">
                  Baca Selengkapnya →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
