'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';

function ArtikelContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Kumpulan Artikel</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Temukan berbagai tips, inspirasi, dan panduan lengkap untuk mempersiapkan pernikahan impian Anda.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col duration-300"
              >
                {/* Placeholder image area */}
                <div className="h-56 bg-gradient-to-br from-neutral-50 to-gray-100 flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <span className="text-6xl opacity-30 transform group-hover:scale-110 transition-transform duration-500">🌸</span>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900 px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-snug mb-3">{post.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                  <Link href={`/artikel/${post.id}`} className="text-xs font-semibold text-[#000000] hover:underline mt-auto">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer onLoginOpen={() => {}} />
    </>
  );
}

export default function ArtikelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ArtikelContent />
    </Suspense>
  );
}
