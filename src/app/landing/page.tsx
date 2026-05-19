'use client';

import Header from '@/components/Header';
import Hero from '@/components/landing/Hero';
import Tema from '@/components/landing/Tema';
import Fitur from '@/components/landing/Fitur';
import Harga from '@/components/landing/Harga';
import Download from '@/components/landing/Download';
import Blog from '@/components/landing/Blog';
import Faq from '@/components/landing/Faq';
import LayarTamu from '@/components/landing/LayarTamu';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tema />
        <Fitur />
        <Harga />
        <Download />
        <LayarTamu />
        <Blog />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
