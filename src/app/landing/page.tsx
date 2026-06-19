'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/landing/Hero';
import Tema from '@/components/landing/Tema';
import Fitur from '@/components/landing/Fitur';
import Harga from '@/components/landing/Harga';

import Blog from '@/components/landing/Blog';
import Testimoni from '@/components/landing/Testimoni';
import Faq from '@/components/landing/Faq';
import LayarTamu from '@/components/landing/LayarTamu';
import Footer from '@/components/landing/Footer';
import LoginModal from '@/components/landing/LoginModal';

function LandingContent() {
  const searchParams = useSearchParams();
  const themeId = searchParams.get('theme');

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Auto-open login modal when ?theme= is present (redirected from /client?theme=)
  useEffect(() => {
    if (themeId) {
      setIsLoginModalOpen(true);
    }
  }, [themeId]);

  let callbackUrl = themeId ? `/client?theme=${themeId}` : '/onboarding';
  if (selectedPlan) {
    callbackUrl = `/onboarding?plan=${selectedPlan}`;
  }

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
        <Harga 
          onSelectPlan={(plan) => {
            setSelectedPlan(plan);
            setIsLoginModalOpen(true);
          }}
        />

        <LayarTamu />
        <Blog />
        <Testimoni />
        <Faq />
      </main>
      <Footer onLoginOpen={() => setIsLoginModalOpen(true)} />

      {/* Global login modal — used for ?theme= redirect flow */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          // Optional: clear selectedPlan on close if desired, 
          // but keeping it nullifies only on successful close if we want.
          // We'll clear it so subsequent "Buat Undangan Gratis" clicks don't use the old plan.
          setTimeout(() => setSelectedPlan(null), 300);
        }}
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
