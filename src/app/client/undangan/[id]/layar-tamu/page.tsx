'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: string;
}

interface ProjectData {
  coupleName: string;
  eventDate: string;
  _id: string;
}

export default function LayarTamuPage() {
  const { id } = useParams();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [latestWish, setLatestWish] = useState<Wish | null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch project
  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then(d => { if (d.success) setProject(d.data); });
  }, [id]);

  // Poll wishes
  const fetchWishes = useCallback(async () => {
    if (!id) return;
    const res = await fetch(`/api/wishes?projectId=${id}`);
    const data = await res.json();
    if (!data.success) return;
    const newWishes: Wish[] = data.data;
    
    // Check if there's a new wish
    if (wishes.length > 0 && newWishes.length > wishes.length) {
      const newest = newWishes[0];
      setLatestWish(newest);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 5000);
    }
    setWishes(newWishes);
  }, [id, wishes.length]);

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 5000); // poll every 5s
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const formatWishTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const displayedWishes = wishes.slice(0, 6);

  return (
    <div
      className="min-h-screen w-full text-white flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: '#fff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* ─── Header ─────────────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-12 py-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-lg">
            ♥
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold">Ucapan & Doa</p>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
              {project?.coupleName || 'Loading...'}
            </h1>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-mono font-bold text-white">{formatTime(currentTime)}</p>
          <p className="text-xs text-white/50 mt-1">{formatDate(currentTime)}</p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 text-sm font-semibold">LIVE</span>
          <span className="text-white/50 text-xs ml-2">{wishes.length} ucapan</span>
        </div>
      </header>

      {/* ─── New wish notification ─────────────────────── */}
      {showNotif && latestWish && (
        <div
          className="fixed top-24 right-8 z-50 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-2xl p-5 max-w-sm"
          style={{ animation: 'slideInRight 0.5s ease-out' }}
        >
          <p className="text-xs uppercase tracking-widest font-bold text-pink-200 mb-2">✨ Ucapan Baru!</p>
          <p className="font-bold text-white text-lg">{latestWish.name}</p>
          <p className="text-pink-100 text-sm mt-1 italic line-clamp-2">&ldquo;{latestWish.message}&rdquo;</p>
        </div>
      )}

      {/* ─── Main content ─────────────────────────────── */}
      <main className="relative z-10 flex-1 p-10">
        {wishes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl">
              💌
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white/80">Menunggu ucapan pertama...</h2>
              <p className="text-white/40 mt-2">Scan QR Code di undangan untuk mengirim ucapan</p>
            </div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {displayedWishes.map((wish, i) => (
              <div
                key={wish._id}
                className="break-inside-avoid"
                style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both` }}
              >
                <div
                  className={`relative rounded-2xl p-6 border transition-all ${
                    i === 0
                      ? 'bg-gradient-to-br from-rose-500/30 to-pink-600/20 border-rose-400/40 ring-1 ring-rose-400/30'
                      : 'bg-white/5 border-white/10 backdrop-blur-md'
                  }`}
                >
                  {i === 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      Terbaru
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{wish.name}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          wish.attendance === 'Hadir' ? 'bg-emerald-400/20 text-emerald-300' :
                          wish.attendance === 'Tidak Hadir' ? 'bg-red-400/20 text-red-300' :
                          'bg-amber-400/20 text-amber-300'
                        }`}>
                          {wish.attendance}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-white/30">{formatWishTime(wish.createdAt)}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed italic">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ─── Footer ───────────────────────────────────── */}
      <footer className="relative z-10 text-center py-5 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <p className="text-white/30 text-xs uppercase tracking-[0.3em]">
          ♥ Ucapan Anda sangat berarti bagi kami ♥
        </p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
