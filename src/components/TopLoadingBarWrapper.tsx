'use client';

import { Suspense } from 'react';
import TopLoadingBar from './TopLoadingBar';

export default function TopLoadingBarWrapper({ color }: { color?: string }) {
  return (
    <Suspense fallback={null}>
      <TopLoadingBar color={color} />
    </Suspense>
  );
}
