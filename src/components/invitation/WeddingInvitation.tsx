'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface Guest {
  name: string;
  slug: string;
  phone?: string;
  group?: string;
  rsvpStatus: 'PENDING' | 'ATTENDING' | 'DECLINED';
  pax: number;
}

export interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: string;
}

export const THEME_STYLES = {
  sunda: {
    outerBg: 'bg-[#f4f7f1]',
    bodyBg: 'bg-white border-emerald-50',
    headerBg: 'bg-gradient-to-b from-[#e5ede0] via-[#f4f7f1] to-white',
    sectionBg: 'bg-[#e5ede0]/40 border-y border-[#dbe6d5]',
    cardBg: 'bg-white border-[#cddfc6]',
    textTitle: 'text-[#4b5e43]',
    textSub: 'text-[#5a7350]',
    textMuted: 'text-[#5a7350]/60',
    textBody: 'text-slate-600',
    primaryBtn: 'bg-[#5a7350] hover:bg-[#4b5e43] text-white shadow-emerald-900/10',
    outlineBtn: 'border-[#5a7350] text-[#5a7350] hover:bg-[#eaf0e6]',
    badgeAttending: 'bg-[#eaf0e6] text-[#4b5e43]',
    badgeDeclined: 'bg-rose-50 text-rose-700',
    badgePending: 'bg-amber-50 text-amber-700',
    emoji: '🌿',
    heartColor: 'text-[#5a7350]',
    rsvpBtnSelected: 'bg-[#5a7350] border-[#5a7350] text-white shadow-md',
    rsvpBtnUnselected: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50',
  },
  manado: {
    outerBg: 'bg-sky-50/50',
    bodyBg: 'bg-white border-sky-100',
    headerBg: 'bg-gradient-to-b from-sky-100/60 via-sky-50/20 to-white',
    sectionBg: 'bg-sky-50/30 border-y border-sky-100',
    cardBg: 'bg-white border-sky-200/60',
    textTitle: 'text-sky-900',
    textSub: 'text-sky-800',
    textMuted: 'text-slate-400',
    textBody: 'text-slate-600',
    primaryBtn: 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sky-600/10',
    outlineBtn: 'border-[#0284c7] text-[#0284c7] hover:bg-sky-50',
    badgeAttending: 'bg-sky-100 text-sky-800',
    badgeDeclined: 'bg-rose-100 text-rose-700',
    badgePending: 'bg-amber-100 text-amber-700',
    emoji: '🌺',
    heartColor: 'text-sky-500',
    rsvpBtnSelected: 'bg-[#0284c7] border-[#0284c7] text-white shadow-md',
    rsvpBtnUnselected: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50',
  },
  jawa: {
    outerBg: 'bg-[#e7e1da]',
    bodyBg: 'bg-[#f4f1ec] border-[#dcd6cd] text-[#4a3525]',
    headerBg: 'bg-gradient-to-b from-[#d5cbbd] via-[#f4f1ec] to-[#f4f1ec]',
    sectionBg: 'bg-[#eae4db] border-y border-[#dcd6cd]',
    cardBg: 'bg-white border-[#e2ddd5]',
    textTitle: 'text-[#5d3e2e]',
    textSub: 'text-[#7c5641]',
    textMuted: 'text-[#7c5641]/60',
    textBody: 'text-slate-700',
    primaryBtn: 'bg-[#5d3e2e] hover:bg-[#4a3124] text-white shadow-amber-900/10',
    outlineBtn: 'border-[#5d3e2e] text-[#5d3e2e] hover:bg-[#eae4db]',
    badgeAttending: 'bg-[#eae4db] text-[#5d3e2e]',
    badgeDeclined: 'bg-rose-50 text-rose-700',
    badgePending: 'bg-amber-50 text-amber-700',
    emoji: '🍂',
    heartColor: 'text-[#5d3e2e]',
    rsvpBtnSelected: 'bg-[#5d3e2e] border-[#5d3e2e] text-white shadow-md',
    rsvpBtnUnselected: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50',
  },
  snapfoto: {
    outerBg: 'bg-slate-950',
    bodyBg: 'bg-slate-900 border-slate-800 text-slate-300',
    headerBg: 'bg-gradient-to-b from-slate-950/90 via-slate-900 to-slate-900',
    sectionBg: 'bg-slate-950/40 border-y border-slate-800',
    cardBg: 'bg-slate-800/60 border-slate-700',
    textTitle: 'text-white',
    textSub: 'text-slate-200',
    textMuted: 'text-slate-500',
    textBody: 'text-slate-300',
    primaryBtn: 'bg-slate-700 hover:bg-slate-600 text-white shadow-slate-900/10',
    outlineBtn: 'border-slate-500 text-white hover:bg-slate-800',
    badgeAttending: 'bg-slate-800 text-slate-300',
    badgeDeclined: 'bg-red-950/40 text-red-400',
    badgePending: 'bg-[#1e293b] text-slate-400',
    emoji: '✨',
    heartColor: 'text-slate-400',
    rsvpBtnSelected: 'bg-slate-700 border-slate-600 text-white shadow-md',
    rsvpBtnUnselected: 'bg-transparent border-slate-700 text-slate-400 hover:bg-slate-800',
  },
};

interface WeddingInvitationProps {
  guestSlug?: string;
  theme?: string;
  isDemo?: boolean;
}

export default function WeddingInvitation({ guestSlug, theme = 'sunda', isDemo = false }: WeddingInvitationProps) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // RSVP
  const [rsvpStatus, setRsvpStatus] = useState<'ATTENDING' | 'DECLINED'>('ATTENDING');
  const [rsvpPax, setRsvpPax] = useState(1);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wish
  const [wishName, setWishName] = useState('');
  const [wishMsg, setWishMsg] = useState('');
  const [wishAttend, setWishAttend] = useState<'Hadir' | 'Tidak Hadir' | 'Masih Ragu'>('Hadir');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);

  // Load appropriate theme styles
  const style = THEME_STYLES[theme as keyof typeof THEME_STYLES] || THEME_STYLES.sunda;

  // Determine dummy names for the demo based on the theme
  const getDemoNames = () => {
    switch (theme) {
      case 'jawa': return { groom: 'Bagus', bride: 'Ninda' };
      case 'manado': return { groom: 'Billy', bride: 'Stevani' };
      case 'snapfoto': return { groom: 'Putra', bride: 'Risa' };
      default: return { groom: 'Hendra', bride: 'Alisha' }; // sunda
    }
  };
  const demoNames = getDemoNames();
  const groomName = isDemo ? demoNames.groom : 'Bayu';
  const brideName = isDemo ? demoNames.bride : 'Rara';
  const weddingDate = theme === 'jawa' ? '30 · 06 · 2025' : 
                      theme === 'manado' ? '20 · 09 · 2025' : 
                      theme === 'snapfoto' ? '15 · 02 · 2026' : '12 · 07 · 2026';

  const bgmSrc = theme === 'snapfoto' ? '/assets/music/snapfoto-bgm.mp3' : undefined;

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  useEffect(() => {
    if (isDemo) {
      // Set dummy data for the demo view
      setGuest({
        name: 'Tamu Kehormatan',
        slug: 'tamu-kehormatan',
        rsvpStatus: 'PENDING',
        pax: 1,
        group: 'VIP'
      });
      setWishName('Tamu Kehormatan');
      setWishes([
        {
          _id: '1',
          name: 'Sarah',
          message: 'Selamat menempuh hidup baru! Semoga samawa selalu.',
          attendance: 'Hadir',
          createdAt: new Date().toISOString(),
        }
      ]);
      return;
    }

    if (!guestSlug) return;

    fetch(`/api/guests/${guestSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGuest(data.data);
          setWishName(data.data.name);
          fetch(`/api/guests/${guestSlug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isOpened: true }),
          });
        }
      })
      .catch(console.error);

    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => { if (data.success) setWishes(data.data); })
      .catch(console.error);
  }, [guestSlug, isDemo]);

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemo) {
      setRsvpSuccess(true);
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      const res = await fetch(`/api/guests/${guestSlug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rsvpStatus, pax: rsvpStatus === 'ATTENDING' ? rsvpPax : 0 }),
      });
      const data = await res.json();
      if (data.success) { setGuest(data.data); setRsvpSuccess(true); }
    } catch (err) { console.error(err); }
    finally { setIsSubmittingRsvp(false); }
  };

  const handleWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName || !wishMsg) return;
    
    if (isDemo) {
      const newWish: Wish = {
        _id: Date.now().toString(),
        name: wishName,
        message: wishMsg,
        attendance: wishAttend,
        createdAt: new Date().toISOString(),
      };
      setWishes([newWish, ...wishes]);
      setWishMsg('');
      return;
    }

    setIsSubmittingWish(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: wishName, message: wishMsg, attendance: wishAttend }),
      });
      const data = await res.json();
      if (data.success) { setWishes([data.data, ...wishes]); setWishMsg(''); }
    } catch (err) { console.error(err); }
    finally { setIsSubmittingWish(false); }
  };

  return (
    <div className={`min-h-screen ${style.outerBg} transition-colors duration-300 relative overflow-x-hidden selection:bg-rose-200`}>

      {/* Audio Element */}
      {bgmSrc && <audio ref={audioRef} src={bgmSrc} loop preload="auto" />}

      {/* Floating Music Toggle */}
      {isOpen && bgmSrc && (
        <button
          onClick={toggleAudio}
          className={`fixed bottom-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow-lg border backdrop-blur-md transition-all ${
            isPlaying ? 'bg-white/90 border-slate-200 animate-[spin_4s_linear_infinite]' : 'bg-slate-800/90 border-slate-700'
          }`}
          aria-label="Toggle music"
        >
          {isPlaying ? (
            <span className="text-pink-500 text-xl leading-none">🎵</span>
          ) : (
            <span className="text-slate-300 text-xl leading-none">🔇</span>
          )}
        </button>
      )}

      {/* ── COVER ─────────────────────────────────── */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
          <div className="space-y-6 max-w-md bg-white/95 backdrop-blur-md p-10 rounded-3xl border border-slate-100 shadow-2xl animate-fade-in-up text-slate-800">
            <span className={`${style.heartColor} text-3xl font-serif block`}>♥</span>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-pink-600 font-semibold">Walimatul &apos;Ursy</p>
              <h2 className="text-4xl sm:text-5xl font-serif text-slate-900 italic font-bold">{groomName} &amp; {brideName}</h2>
            </div>
            <div className="py-6 border-y border-slate-100">
              <p className="text-xs text-slate-400 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="text-xl font-bold text-slate-950">{guest?.name || 'Tamu Undangan'}</p>
              {guest?.group && (
                <p className="text-[10px] text-pink-500 font-semibold mt-1 uppercase tracking-wider">
                  {guest.group}
                </p>
              )}
            </div>
            <button
              onClick={handleOpenInvitation}
              className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm rounded-full transition-all shadow-lg shadow-pink-500/10 hover:scale-[1.02] transform cursor-pointer"
            >
              ✉️ Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* ── INVITATION BODY ────────────────────────── */}
      {isOpen && (
        <div className={`max-w-xl mx-auto ${style.bodyBg} min-h-screen shadow-2xl border-x flex flex-col pb-16 transition-colors duration-300`}>

          {/* Hero */}
          <section className={`h-96 ${style.headerBg} flex flex-col items-center justify-center text-center p-8 space-y-4`}>
            <p className="text-xs uppercase tracking-[0.3em] font-sans font-bold opacity-70">The Wedding of</p>
            <h1 className={`text-5xl font-serif italic font-semibold ${style.textTitle}`}>{groomName} &amp; {brideName}</h1>
            <p className="text-xs font-mono tracking-widest opacity-60">{weddingDate}</p>
          </section>

          {/* Bride & Groom */}
          <section className="px-8 py-16 text-center space-y-10">
            <p className="text-xs leading-relaxed italic max-w-xs mx-auto opacity-70">
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.&rdquo; — Ar-Rum: 21
            </p>
            <div className="space-y-6">
              <div>
                <h3 className={`text-2xl font-serif italic font-bold ${style.textTitle}`}>{groomName} Saputra</h3>
                <p className="text-xs opacity-60 mt-1">Putra dari Bpk. Bambang &amp; Ibu Wati</p>
              </div>
              <span className="text-2xl font-serif text-pink-300 block">&amp;</span>
              <div>
                <h3 className={`text-2xl font-serif italic font-bold ${style.textTitle}`}>{brideName} Amalia</h3>
                <p className="text-xs opacity-60 mt-1">Putri dari Bpk. Harun &amp; Ibu Aminah</p>
              </div>
            </div>
          </section>

          {/* Event Schedule */}
          <section className={`px-8 py-16 ${style.sectionBg} text-center space-y-8`}>
            <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Waktu &amp; Tempat</h2>
            <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
              <div className={`${style.cardBg} p-6 rounded-2xl border shadow-sm space-y-3`}>
                <span className="text-2xl">💍</span>
                <h4 className={`font-bold text-sm uppercase tracking-wider ${style.textTitle}`}>Akad Nikah</h4>
                <p className="text-xs opacity-70">Pukul 09.00 – 10.30 WIB</p>
                <p className={`text-xs font-semibold ${style.textSub}`}>Gedung Pernikahan Indah</p>
                <p className="text-[10px] opacity-55">Jl. Bahagia No. 1, Jakarta</p>
              </div>
              <div className={`${style.cardBg} p-6 rounded-2xl border shadow-sm space-y-3`}>
                <span className="text-2xl">🎉</span>
                <h4 className={`font-bold text-sm uppercase tracking-wider ${style.textTitle}`}>Resepsi</h4>
                <p className="text-xs opacity-70">Pukul 11.00 – 14.00 WIB</p>
                <p className={`text-xs font-semibold ${style.textSub}`}>Gedung Pernikahan Indah</p>
                <p className="text-[10px] opacity-55">Jl. Bahagia No. 1, Jakarta</p>
              </div>
            </div>
            <button className={`${style.outlineBtn} text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm cursor-pointer`}>
              📍 Buka Google Maps
            </button>
          </section>

          {/* RSVP */}
          <section className="px-8 py-16 text-center space-y-8">
            <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Konfirmasi Kehadiran</h2>
            {rsvpSuccess ? (
              <div className={`p-6 rounded-2xl border space-y-2 max-w-sm mx-auto ${style.badgeAttending}`}>
                <p className="font-bold">Terima kasih atas konfirmasi Anda! {style.emoji}</p>
                <p className="text-xs">
                  Status: <span className="font-semibold">
                    {guest?.rsvpStatus === 'ATTENDING' || (isDemo && rsvpStatus === 'ATTENDING') ? `Hadir (${rsvpPax} orang)` : 'Tidak Hadir'}
                  </span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} className="max-w-xs mx-auto space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold opacity-60 mb-2 uppercase tracking-wider">Status Kehadiran</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['ATTENDING', 'DECLINED'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRsvpStatus(s)}
                        className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          rsvpStatus === s
                            ? style.rsvpBtnSelected
                            : style.rsvpBtnUnselected
                        }`}
                      >
                        {s === 'ATTENDING' ? '✓ Hadir' : '✗ Tidak Hadir'}
                      </button>
                    ))}
                  </div>
                </div>
                {rsvpStatus === 'ATTENDING' && (
                  <div>
                    <label className="block text-[10px] font-bold opacity-60 mb-2 uppercase tracking-wider">Jumlah Orang (Pax)</label>
                    <select
                      value={rsvpPax}
                      onChange={(e) => setRsvpPax(Number(e.target.value))}
                      className={`w-full text-xs border rounded-xl px-3 py-2.5 bg-transparent outline-none ${style.border}`}
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n} className="text-slate-800">{n} Orang</option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className={`w-full py-3 rounded-xl transition-all shadow-md cursor-pointer ${style.primaryBtn}`}
                >
                  {isSubmittingRsvp ? 'Mengirim...' : 'Kirim Konfirmasi'}
                </button>
              </form>
            )}
          </section>

          {/* Wishes */}
          <section className={`px-8 py-16 ${style.sectionBg} text-center space-y-8`}>
            <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Buku Tamu &amp; Ucapan</h2>

            <form onSubmit={handleWish} className="max-w-sm mx-auto space-y-4 text-left p-6 rounded-2xl border shadow-sm bg-white text-slate-800">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Nama</label>
                <input
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-pink-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Ucapan / Doa</label>
                <textarea
                  value={wishMsg}
                  onChange={(e) => setWishMsg(e.target.value)}
                  placeholder="Tulis ucapan dan doa tulus Anda..."
                  rows={3}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-pink-400 resize-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Kehadiran</label>
                <select
                  value={wishAttend}
                  onChange={(e) => setWishAttend(e.target.value as 'Hadir' | 'Tidak Hadir' | 'Masih Ragu')}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none"
                >
                  <option>Hadir</option>
                  <option>Tidak Hadir</option>
                  <option>Masih Ragu</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmittingWish}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-350 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                {isSubmittingWish ? 'Mengirim...' : 'Kirim Ucapan 💌'}
              </button>
            </form>

            {/* Wish feed */}
            <div className="max-w-sm mx-auto space-y-3 max-h-96 overflow-y-auto pr-1">
              {wishes.length === 0 ? (
                <p className="text-slate-400 text-xs py-6">Belum ada ucapan. Jadilah yang pertama!</p>
              ) : (
                wishes.map((w) => (
                  <div key={w._id} className="bg-white p-4 rounded-xl border border-slate-100 text-slate-800 text-left shadow-sm">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-bold text-xs text-slate-900">{w.name}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                        w.attendance === 'Hadir' ? 'bg-emerald-100 text-emerald-700' :
                        w.attendance === 'Tidak Hadir' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{w.attendance}</span>
                    </div>
                    <p className="text-xs text-slate-500 italic">&ldquo;{w.message}&rdquo;</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
