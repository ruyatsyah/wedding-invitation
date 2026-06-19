'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ── Global event bus ─────────────────────────────────────────────────────────
type Listener = (loading: boolean) => void;
const listeners = new Set<Listener>();

export function triggerTopLoader(loading: boolean) {
  listeners.forEach((fn) => fn(loading));
}

export function useTopLoader() {
  const start = useCallback(() => triggerTopLoader(true), []);
  const done  = useCallback(() => triggerTopLoader(false), []);
  return { start, done };
}

// ── Component ────────────────────────────────────────────────────────────────
export default function TopLoadingBar({ color = '#8D1A42' }: { color?: string }) {
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(false);

  // All timers live in refs — never cause re-renders
  const tickRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(0);
  const runningRef  = useRef(false);

  const clearTimers = () => {
    if (tickRef.current)  { clearTimeout(tickRef.current);  tickRef.current  = null; }
    if (hideRef.current)  { clearTimeout(hideRef.current);  hideRef.current  = null; }
  };

  const start = useCallback(() => {
    clearTimers();
    runningRef.current  = true;
    progressRef.current = 0;
    setProgress(0);
    setVisible(true);

    const tick = () => {
      if (!runningRef.current) return;
      const p = progressRef.current;
      // Ease-out: fast at start, slow near 85
      const step = p < 20 ? 10 : p < 50 ? 6 : p < 70 ? 3 : p < 82 ? 1 : 0.3;
      const next = Math.min(p + step, 85);
      progressRef.current = next;
      setProgress(next);
      if (next < 85) tickRef.current = setTimeout(tick, 60);
    };
    tickRef.current = setTimeout(tick, 60);
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    runningRef.current  = false;
    progressRef.current = 100;
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
      progressRef.current = 0;
    }, 350);
  }, []);

  // Route change
  useEffect(() => {
    start();
    // Finish after a short delay — Next.js page is already rendered by now
    const t = setTimeout(finish, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Manual trigger
  useEffect(() => {
    const handler: Listener = (loading) => {
      if (loading) start();
      else finish();
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, [start, finish]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none overflow-hidden">
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
          transition: progress === 100
            ? 'width 200ms ease-out'
            : 'width 60ms linear',
        }}
      />
    </div>
  );
}
