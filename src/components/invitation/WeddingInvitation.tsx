'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Guest {
  name: string;
  slug: string;
  phone?: string;
  group?: string;
  rsvpStatus: 'PENDING' | 'ATTENDING' | 'DECLINED';
  pax: number;
  isOpened?: boolean;
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

export interface ProjectData {
  _id?: string;
  coupleName?: string;
  groomFullName?: string;
  groomParents?: string;
  groomInstagram?: string;
  groomPhoto?: string;
  brideFullName?: string;
  brideParents?: string;
  brideInstagram?: string;
  bridePhoto?: string;
  gallery?: string[];
  eventDate?: string;
  eventTime?: string;
  eventTimezone?: string;
  venue?: string;
  mapsUrl?: string;
  youtubeUrl?: string;
  enableRsvp?: boolean;
  enableGuestbook?: boolean;
  bankName?: string;
  bankAccount?: string;
  bankHolder?: string;
}

interface WeddingInvitationProps {
  guestSlug?: string;
  theme?: string;
  isDemo?: boolean;
  projectData?: ProjectData | null;
}

export default function WeddingInvitation({ guestSlug, theme = 'sunda', isDemo = false, projectData = null }: WeddingInvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const queryClient = useQueryClient();

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // RSVP
  const [rsvpStatus, setRsvpStatus] = useState<'ATTENDING' | 'DECLINED'>('ATTENDING');
  const [rsvpPax, setRsvpPax] = useState(1);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wish
  const [wishName, setWishName] = useState('');
  const [wishMsg, setWishMsg] = useState('');
  const [wishAttend, setWishAttend] = useState<'Hadir' | 'Tidak Hadir' | 'Masih Ragu'>('Hadir');

  const { data: guestData } = useQuery({
    queryKey: ['guest', guestSlug],
    queryFn: async () => {
      const res = await fetch(`/api/guests/${guestSlug}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    enabled: !!guestSlug && !isDemo,
  });

  const updateGuestMutation = useMutation({
    mutationFn: async (payload: { isOpened?: boolean, rsvpStatus?: string, pax?: number }) => {
      const res = await fetch(`/api/guests/${guestSlug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['guest', guestSlug], data);
    }
  });

  const { data: wishesData = [] } = useQuery({
    queryKey: ['wishes'],
    queryFn: async () => {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    enabled: !isDemo && (projectData?.enableGuestbook !== false),
  });

  const submitWishMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishes'] });
    }
  });

  useEffect(() => {
    if (isDemo) {
      setGuestName('Tamu Kehormatan');
      return;
    }
    if (guestData) {
      setGuestName(guestData.name);
      setWishName(guestData.name);
      if (!guestData.isOpened) {
        updateGuestMutation.mutate({ isOpened: true });
      }
    }
  }, [guestData, isDemo]);

  // Load appropriate theme styles
  const style = THEME_STYLES[theme as keyof typeof THEME_STYLES] || THEME_STYLES.sunda;

  const getDemoNames = () => {
    switch (theme) {
      case 'jawa': return { groom: 'Bagus', bride: 'Ninda' };
      case 'manado': return { groom: 'Billy', bride: 'Stevani' };
      case 'snapfoto': return { groom: 'Putra', bride: 'Risa' };
      default: return { groom: 'Hendra', bride: 'Alisha' };
    }
  };
  const demoNames = getDemoNames();
  
  const groomName = (!isDemo && projectData?.groomFullName) ? projectData.groomFullName : (isDemo ? demoNames.groom : 'Bayu');
  const brideName = (!isDemo && projectData?.brideFullName) ? projectData.brideFullName : (isDemo ? demoNames.bride : 'Rara');
  const groomParents = (!isDemo && projectData?.groomParents) ? projectData.groomParents : 'Putra dari Bpk. Bambang & Ibu Wati';
  const brideParents = (!isDemo && projectData?.brideParents) ? projectData.brideParents : 'Putri dari Bpk. Harun & Ibu Aminah';

  const defaultWeddingDate = theme === 'jawa' ? '30 · 06 · 2025' : 
                             theme === 'manado' ? '20 · 09 · 2025' : 
                             theme === 'snapfoto' ? '15 · 02 · 2026' : '12 · 07 · 2026';
                      
  const formattedEventDate = (!isDemo && projectData?.eventDate) 
    ? projectData.eventDate.split('-').reverse().join(' · ')
    : defaultWeddingDate;
    
  const venueAddress = (!isDemo && projectData?.venue) ? projectData.venue : 'Jl. Bahagia No. 1, Jakarta';
  const eventTime = (!isDemo && projectData?.eventTime) ? projectData.eventTime : '09.00';
  const eventTimezone = (!isDemo && projectData?.eventTimezone) ? projectData.eventTimezone.split(' ')[0] : 'WIB';

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

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemo) {
      setRsvpSuccess(true);
      return;
    }
    updateGuestMutation.mutate(
      { rsvpStatus, pax: rsvpStatus === 'ATTENDING' ? rsvpPax : 0 },
      { onSuccess: () => setRsvpSuccess(true) }
    );
  };

  const handleWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName || !wishMsg) return;
    
    if (isDemo) {
      setWishMsg('');
      return;
    }

    submitWishMutation.mutate(
      { name: wishName, message: wishMsg, attendance: wishAttend },
      { onSuccess: () => setWishMsg('') }
    );
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
              <p className="text-xl font-bold text-slate-950">{guestData?.name || guestName || 'Tamu Undangan'}</p>
              {guestData?.group && (
                <p className="text-[10px] text-pink-500 font-semibold mt-1 uppercase tracking-wider">
                  {guestData.group}
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
            <p className="text-xs font-mono tracking-widest opacity-60">{formattedEventDate}</p>
          </section>

          {/* Bride & Groom */}
          <section className="px-8 py-16 text-center space-y-10">
            <p className="text-xs leading-relaxed italic max-w-xs mx-auto opacity-70">
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.&rdquo; — Ar-Rum: 21
            </p>
            <div className="space-y-8">
              {/* Groom */}
              <div className="flex flex-col items-center gap-3">
                {(projectData?.groomPhoto || isDemo) && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={projectData?.groomPhoto || 'https://ui-avatars.com/api/?name=Groom&background=e5ede0&color=4b5e43&size=128'}
                      alt={groomName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className={`text-2xl font-serif italic font-bold ${style.textTitle}`}>{groomName}</h3>
                  <p className="text-xs opacity-60 mt-1">{groomParents}</p>
                  {(projectData?.groomInstagram || isDemo) && (
                    <a
                      href={`https://instagram.com/${(projectData?.groomInstagram || 'instagram').replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-[11px] mt-1 inline-block ${style.textSub} opacity-70 hover:opacity-100`}
                    >
                      @{(projectData?.groomInstagram || 'groom').replace('@', '')}
                    </a>
                  )}
                </div>
              </div>

              <span className="text-2xl font-serif text-pink-300 block">&amp;</span>

              {/* Bride */}
              <div className="flex flex-col items-center gap-3">
                {(projectData?.bridePhoto || isDemo) && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={projectData?.bridePhoto || 'https://ui-avatars.com/api/?name=Bride&background=f4f7f1&color=5a7350&size=128'}
                      alt={brideName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className={`text-2xl font-serif italic font-bold ${style.textTitle}`}>{brideName}</h3>
                  <p className="text-xs opacity-60 mt-1">{brideParents}</p>
                  {(projectData?.brideInstagram || isDemo) && (
                    <a
                      href={`https://instagram.com/${(projectData?.brideInstagram || 'instagram').replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-[11px] mt-1 inline-block ${style.textSub} opacity-70 hover:opacity-100`}
                    >
                      @{(projectData?.brideInstagram || 'bride').replace('@', '')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          {((!isDemo && projectData?.gallery && projectData.gallery.filter(Boolean).length > 0) || isDemo) && (
            <section className="px-8 py-16 text-center space-y-8">
              <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Galeri Foto</h2>
              <div className="grid grid-cols-2 gap-3">
                {(isDemo
                  ? ['', '', '', '']
                  : (projectData?.gallery || []).filter(Boolean)
                ).map((url, idx) => (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-2xl shadow-sm ${idx === 0 ? 'col-span-2 h-56' : 'h-36'}`}
                  >
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className={`w-full h-full ${style.sectionBg} flex items-center justify-center opacity-40`}>
                        <span className="text-3xl">📷</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Event Schedule */}
          <section className={`px-8 py-16 ${style.sectionBg} text-center space-y-8`}>
            <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Waktu &amp; Tempat</h2>
            <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
              <div className={`${style.cardBg} p-6 rounded-2xl border shadow-sm space-y-3`}>
                <span className="text-2xl">💍</span>
                <h4 className={`font-bold text-sm uppercase tracking-wider ${style.textTitle}`}>Akad Nikah & Resepsi</h4>
                <p className="text-xs opacity-70">Pukul {eventTime} {eventTimezone} - Selesai</p>
                <p className={`text-xs font-semibold ${style.textSub}`}>Lokasi Acara</p>
                <p className="text-[10px] opacity-55 whitespace-pre-wrap">{venueAddress}</p>
              </div>
            </div>
            {((!isDemo && projectData?.mapsUrl) || isDemo) && (
              <a 
                href={(!isDemo && projectData?.mapsUrl) ? projectData.mapsUrl : '#'} 
                target="_blank" 
                rel="noreferrer"
                className={`inline-block ${style.outlineBtn} text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm cursor-pointer`}
              >
                📍 Buka Google Maps
              </a>
            )}
          </section>

          {/* RSVP */}
          {((isDemo) || (!isDemo && projectData?.enableRsvp !== false)) && (
          <section className="px-8 py-16 text-center space-y-8">
            <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Konfirmasi Kehadiran</h2>
            {rsvpSuccess ? (
              <div className={`p-6 rounded-2xl border space-y-2 max-w-sm mx-auto ${style.badgeAttending}`}>
                <p className="font-bold">Terima kasih atas konfirmasi Anda! {style.emoji}</p>
                <p className="text-xs">
                  Status: <span className="font-semibold">
                    {guestData?.rsvpStatus === 'ATTENDING' || (isDemo && rsvpStatus === 'ATTENDING') ? `Hadir (${rsvpPax} orang)` : 'Tidak Hadir'}
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
                      className={`w-full text-xs border rounded-xl px-3 py-2.5 bg-transparent outline-none border-slate-200`}
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n} className="text-slate-800">{n} Orang</option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={updateGuestMutation.isPending}
                  className={`w-full py-3 rounded-xl transition-all shadow-md cursor-pointer ${style.primaryBtn}`}
                >
                  {updateGuestMutation.isPending ? 'Mengirim...' : 'Kirim Konfirmasi'}
                </button>
              </form>
            )}
          </section>
          )}

          {/* Gift / Angpao */}
          {((!isDemo && projectData?.bankName && projectData?.bankAccount) || isDemo) && (
            <section className={`px-8 py-16 text-center space-y-6`}>
              <h2 className={`text-3xl font-serif italic font-bold ${style.textTitle}`}>Wedding Gift</h2>
              <p className={`text-xs ${style.textBody} opacity-80 max-w-xs mx-auto`}>
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
              </p>
              <div className={`${style.cardBg} p-6 rounded-2xl border shadow-sm max-w-xs mx-auto space-y-4`}>
                <span className="text-3xl block">💌</span>
                <div>
                  <h4 className={`font-bold text-lg ${style.textTitle}`}>{!isDemo && projectData?.bankName ? projectData.bankName : 'Bank BCA'}</h4>
                  <p className={`font-mono text-xl tracking-wider ${style.textSub} my-2 select-all`}>{!isDemo && projectData?.bankAccount ? projectData.bankAccount : '1234567890'}</p>
                  <p className={`text-xs ${style.textBody} uppercase tracking-wider`}>a.n. {!isDemo && projectData?.bankHolder ? projectData.bankHolder : groomName}</p>
                </div>
              </div>
            </section>
          )}

          {/* Wishes */}
          {((isDemo) || (!isDemo && projectData?.enableGuestbook !== false)) && (
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
                disabled={submitWishMutation.isPending}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-350 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                {submitWishMutation.isPending ? 'Mengirim...' : 'Kirim Ucapan 💌'}
              </button>
            </form>

            {/* Wish feed */}
            <div className="max-w-sm mx-auto space-y-3 max-h-96 overflow-y-auto pr-1">
              {wishesData.length === 0 ? (
                <p className="text-slate-400 text-xs py-6">Belum ada ucapan. Jadilah yang pertama!</p>
              ) : (
                wishesData.map((w: Wish) => (
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
          )}
        </div>
      )}
    </div>
  );
}
