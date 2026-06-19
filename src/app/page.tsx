'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import WeddingInvitation from '@/components/invitation/WeddingInvitation';

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guestSlug = searchParams.get('to');
  const theme = searchParams.get('theme') || 'sunda';

  useEffect(() => {
    if (!guestSlug) {
      router.replace('/landing');
    }
  }, [guestSlug, router]);

  if (!guestSlug) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p className="text-neutral-800 font-medium text-sm animate-pulse">Memuat...</p>
      </div>
    );
  }

  return <WeddingInvitation guestSlug={guestSlug} theme={theme} />;
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p className="text-neutral-800 font-medium text-sm animate-pulse">Memuat Undangan...</p>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
