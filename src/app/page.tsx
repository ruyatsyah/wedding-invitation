'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Guest {
  name: string;
  slug: string;
  phone?: string;
  group?: string;
  rsvpStatus: 'PENDING' | 'ATTENDING' | 'DECLINED';
  pax: number;
}

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: string;
}

// ─── WEDDING INVITATION TEMPLATE ───────────────────────────────────────────
function WeddingInvitation({ guestSlug }: { guestSlug: string }) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    fetch(`/api/guests/${guestSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGuest(data.data);
          setWishName(data.data.name);
          // Mark as opened
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
  }, [guestSlug]);

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-[#FCF8F9] text-slate-800 relative overflow-x-hidden selection:bg-rose-200">

      {/* Music indicator */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-rose-100 z-50 flex items-center gap-2 animate-pulse">
          <span className="text-rose-500">🎵</span>
          <span className="text-xs font-medium text-rose-700">Music playing...</span>
        </div>
      )}

      {/* ── COVER ─────────────────────────────────── */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-rose-100/70 via-rose-50 to-white flex flex-col items-center justify-center p-6 text-center">
          <div className="space-y-6 max-w-md bg-white/50 backdrop-blur-md p-10 rounded-3xl border border-rose-200/50 shadow-2xl">
            <span className="text-rose-500 text-3xl font-serif">♥</span>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-rose-600 font-semibold">Walimatul &apos;Ursy</p>
              <h2 className="text-4xl sm:text-5xl font-serif text-rose-800 italic">Rian &amp; Rina</h2>
            </div>
            <div className="py-6 border-y border-rose-200/60">
              <p className="text-xs text-slate-400 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="text-xl font-bold text-rose-900">{guest?.name || 'Tamu Undangan'}</p>
              {guest?.group && (
                <p className="text-[10px] text-rose-500 font-semibold mt-1 uppercase tracking-wider">
                  {guest.group}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-rose-800 hover:bg-rose-900 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all shadow-lg shadow-rose-900/10 hover:scale-105 transform cursor-pointer"
            >
              ✉️ Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* ── INVITATION BODY ────────────────────────── */}
      {isOpen && (
        <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl border-x border-rose-100 flex flex-col pb-16">

          {/* Hero */}
          <section className="h-96 bg-gradient-to-b from-rose-100/40 via-rose-50 to-white flex flex-col items-center justify-center text-center p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-600 font-bold">The Wedding of</p>
            <h1 className="text-5xl font-serif italic text-rose-800">Rian &amp; Rina</h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest">25 · 07 · 2026</p>
          </section>

          {/* Bride & Groom */}
          <section className="px-8 py-16 text-center space-y-10 bg-gradient-to-b from-white to-rose-50/20">
            <p className="text-xs text-slate-400 leading-relaxed italic max-w-xs mx-auto">
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.&rdquo; — Ar-Rum: 21
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-rose-900 italic font-semibold">Rian Pratama</h3>
                <p className="text-xs text-slate-400 mt-1">Putra dari Bpk. Bambang &amp; Ibu Wati</p>
              </div>
              <span className="text-2xl font-serif text-rose-300 block">&amp;</span>
              <div>
                <h3 className="text-2xl font-serif text-rose-900 italic font-semibold">Rina Amalia</h3>
                <p className="text-xs text-slate-400 mt-1">Putri dari Bpk. Harun &amp; Ibu Aminah</p>
              </div>
            </div>
          </section>

          {/* Event Schedule */}
          <section className="px-8 py-16 bg-rose-50/40 text-center space-y-8 border-y border-rose-100">
            <h2 className="text-3xl font-serif text-rose-800 italic">Waktu &amp; Tempat</h2>
            <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <span className="text-2xl">💍</span>
                <h4 className="font-bold text-rose-900 text-sm uppercase tracking-wider">Akad Nikah</h4>
                <p className="text-xs text-slate-500">Pukul 09.00 – 10.30 WIB</p>
                <p className="text-xs text-slate-500 font-semibold">Gedung Pernikahan Indah</p>
                <p className="text-[10px] text-slate-400">Jl. Bahagia No. 1, Jakarta</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <span className="text-2xl">🎉</span>
                <h4 className="font-bold text-rose-900 text-sm uppercase tracking-wider">Resepsi</h4>
                <p className="text-xs text-slate-500">Pukul 11.00 – 14.00 WIB</p>
                <p className="text-xs text-slate-500 font-semibold">Gedung Pernikahan Indah</p>
                <p className="text-[10px] text-slate-400">Jl. Bahagia No. 1, Jakarta</p>
              </div>
            </div>
            <button className="bg-white border border-rose-200 text-rose-800 hover:bg-rose-50 text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm cursor-pointer">
              📍 Buka Google Maps
            </button>
          </section>

          {/* RSVP */}
          <section className="px-8 py-16 text-center space-y-8 bg-white">
            <h2 className="text-3xl font-serif text-rose-800 italic">Konfirmasi Kehadiran</h2>
            {rsvpSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 space-y-2 max-w-sm mx-auto">
                <p className="font-bold">Terima kasih atas konfirmasi Anda! 🎉</p>
                <p className="text-xs">
                  Status: <span className="font-semibold">
                    {guest?.rsvpStatus === 'ATTENDING' ? `Hadir (${guest.pax} orang)` : 'Tidak Hadir'}
                  </span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} className="max-w-xs mx-auto space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Status Kehadiran</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['ATTENDING', 'DECLINED'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRsvpStatus(s)}
                        className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          rsvpStatus === s
                            ? 'bg-rose-800 border-rose-800 text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {s === 'ATTENDING' ? '✓ Hadir' : '✗ Tidak Hadir'}
                      </button>
                    ))}
                  </div>
                </div>
                {rsvpStatus === 'ATTENDING' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Jumlah Orang (Pax)</label>
                    <select
                      value={rsvpPax}
                      onChange={(e) => setRsvpPax(Number(e.target.value))}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none"
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n} Orang</option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-rose-300 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  {isSubmittingRsvp ? 'Mengirim...' : 'Kirim Konfirmasi'}
                </button>
              </form>
            )}
          </section>

          {/* Wishes */}
          <section className="px-8 py-16 bg-rose-50/20 border-t border-rose-100 text-center space-y-8">
            <h2 className="text-3xl font-serif text-rose-800 italic">Buku Tamu &amp; Ucapan</h2>

            <form onSubmit={handleWish} className="max-w-sm mx-auto space-y-4 text-left bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Nama</label>
                <input
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-rose-400 transition-colors"
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
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-rose-400 resize-none transition-colors"
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
                className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-rose-300 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
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
                  <div key={w._id} className="bg-white p-4 rounded-xl border border-rose-100 text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-bold text-xs text-rose-900">{w.name}</span>
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

// ─── ROUTER: redirect to /landing if no ?to param ────────────────────────────
function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guestSlug = searchParams.get('to');

  useEffect(() => {
    if (!guestSlug) {
      router.replace('/landing');
    }
  }, [guestSlug, router]);

  if (!guestSlug) {
    return (
      <div className="min-h-screen bg-[#FCF8F9] flex items-center justify-center">
        <p className="text-rose-800 font-medium text-sm animate-pulse">Memuat...</p>
      </div>
    );
  }

  return <WeddingInvitation guestSlug={guestSlug} />;
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCF8F9] flex items-center justify-center">
        <p className="text-rose-800 font-medium text-sm animate-pulse">Memuat Undangan...</p>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
