'use client';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { useParams } from 'next/navigation';

function ArticleDetailContent() {
  const params = useParams();
  const id = params.id as string;
  
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-slate-50 pt-24 pb-16 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900 px-3 py-1 rounded-full">
                {article.tag}
              </span>
              <span className="text-sm font-medium text-slate-500">{article.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
          <div className="prose prose-slate prose-lg max-w-none">
            <p>{article.content}</p>
          </div>
        </div>
      </main>
      <Footer onLoginOpen={() => {}} />
    </>
  );
}

export default function ArticleDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ArticleDetailContent />
    </Suspense>
  );
}
