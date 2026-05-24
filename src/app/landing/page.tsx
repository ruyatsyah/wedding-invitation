'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
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
import LoginModal from '@/components/landing/LoginModal';

function LandingContent() {
  const searchParams = useSearchParams();
  const themeId = searchParams.get('theme');

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Auto-open login modal when ?theme= is present (redirected from /client?theme=)
  useEffect(() => {
    if (themeId) {
      setIsLoginModalOpen(true);
    }
  }, [themeId]);

  const callbackUrl = themeId ? `/client?theme=${themeId}` : '/client';

  return (
    <>
      <Header />
      <main>
        <Hero
          onLoginOpen={() => setIsLoginModalOpen(true)}
          loginCallbackUrl={callbackUrl}
        />
        <Tema />
        <Fitur />
        <Harga />
        <Download />
        <LayarTamu />
        <Blog />
        <Faq />
      </main>
      <Footer />

      {/* Global login modal — used for ?theme= redirect flow */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        callbackUrl={callbackUrl}
      />
    </>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingContent />
    </Suspense>
  );
}
