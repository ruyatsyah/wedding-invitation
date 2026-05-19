'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

interface Guest {
  name: string;
  slug: string;
  phone?: string;
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

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestSlug = searchParams.get('to');

  const [guest, setGuest] = useState<Guest | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // RSVP Form States
  const [rsvpStatus, setRsvpStatus] = useState<'ATTENDING' | 'DECLINED'>('ATTENDING');
  const [rsvpPax, setRsvpPax] = useState(1);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wish Form States
  const [wishName, setWishName] = useState('');
  const [wishMsg, setWishMsg] = useState('');
  const [wishAttend, setWishAttend] = useState<'Hadir' | 'Tidak Hadir' | 'Masih Ragu'>('Hadir');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);

  // Fetch Guest & Wishes
  useEffect(() => {
    if (guestSlug) {
      // Fetch specific guest
      fetch(`/api/guests/${guestSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setGuest(data.data);
            setWishName(data.data.name); // prefill wish name
            
            // Mark as opened
            fetch(`/api/guests/${guestSlug}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ isOpened: true }),
            });
          }
        })
        .catch(err => console.error(err));
    }

    // Fetch wishes
    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => {
        if (data.success) setWishes(data.data);
      })
      .catch(err => console.error(err));
  }, [guestSlug]);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestSlug) return;
    setIsSubmittingRsvp(true);

    try {
      const res = await fetch(`/api/guests/${guestSlug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rsvpStatus,
          pax: rsvpStatus === 'ATTENDING' ? rsvpPax : 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGuest(data.data);
        setRsvpSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName || !wishMsg) return;
    setIsSubmittingWish(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: wishName,
          message: wishMsg,
          attendance: wishAttend,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWishes([data.data, ...wishes]);
        setWishMsg('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingWish(false);
    }
  };

  // If no "to" parameter, show Platform Landing Page
  if (!guestSlug) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FDFBFB] flex flex-col justify-between">
          <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1">
            <div className="space-y-8">
              <span className="bg-pink-100 text-[#8e1b42] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Platform Undangan Pernikahan Digital
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 leading-tight">
                Buat Undangan Pernikahan <span className="text-[#8e1b42]">Elegan</span> & Praktis
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Wevitation mempermudah Anda untuk membagikan hari bahagia kepada keluarga dan teman dekat secara digital. Fitur RSVP instan, pengirim otomatis via WhatsApp, serta buku tamu digital yang terintegrasi aman.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/admin"
                  className="px-8 py-4 bg-[#8e1b42] hover:bg-[#731433] text-white rounded-xl font-semibold shadow-lg shadow-pink-900/10 hover:shadow-pink-900/20 transform hover:-translate-y-0.5 transition-all text-center"
                >
                  Buka Admin Dashboard ⚙️
                </Link>
                <Link
                  href="/?to=tamu-kehormatan"
                  className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all text-center"
                >
                  Lihat Demo Undangan 👥
                </Link>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-pink-100/50 rounded-3xl filter blur-3xl transform rotate-6 scale-95 -z-10"></div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl max-w-sm w-full space-y-6">
                <div className="h-48 bg-pink-50 rounded-2xl flex items-center justify-center text-4xl">
                  💖👰🤵💖
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-bold text-xl text-slate-800">Demo Rian & Rina</h3>
                  <p className="text-xs text-slate-400">Sabtu, 25 Juli 2026</p>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>RSVP Aktif</span>
                  <span className="font-bold text-emerald-600">Terintegrasi</span>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="w-full text-center py-8 text-xs text-slate-400 border-t border-slate-100 bg-white">
            &copy; 2026 Wevitation. Seluruh Hak Cipta.
          </footer>
        </main>
      </>
    );
  }

  // --- PUBLIC WEDDING INVITATION TEMPLATE ---
  return (
    <div className="min-h-screen bg-[#FCF8F9] text-slate-800 font-sans relative overflow-x-hidden selection:bg-rose-200">
      
      {/* BACKGROUND MUSIC SIMULATION */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-rose-100 z-50 flex items-center justify-center animate-pulse">
          <span className="text-xs mr-2 font-medium text-rose-700">🎵 Music playing...</span>
        </div>
      )}

      {/* COVER WRAPPER */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/70 via-rose-50 to-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="space-y-6 max-w-md bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-rose-200/50 shadow-2xl">
            <span className="text-rose-500 text-3xl font-serif">♥</span>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-rose-600 font-semibold">Walimatul 'Ursy</p>
              <h2 className="text-3xl sm:text-5xl font-serif text-rose-800 italic">Rian & Rina</h2>
            </div>
            
            <div className="py-6 border-y border-rose-200/60 my-6">
              <p className="text-xs text-slate-500 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="text-xl font-bold text-rose-900 font-serif">{guest?.name || 'Tamu Undangan'}</p>
              {guest?.group && <p className="text-[10px] text-rose-600 font-semibold mt-1">Grup: {guest.group}</p>}
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-rose-800 hover:bg-rose-900 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all shadow-lg shadow-rose-900/10 hover:shadow-rose-900/20 transform hover:scale-105 cursor-pointer"
            >
              ✉️ Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* INVITATION CONTENT */}
      {isOpen && (
        <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl border-x border-rose-100 flex flex-col animate-fade-in-up pb-16">
          {/* Header Image / Hero */}
          <section className="relative h-96 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-200/40 via-rose-50 to-white flex flex-col items-center justify-center text-center p-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-600 font-bold">The Wedding of</p>
              <h1 className="text-5xl font-serif italic text-rose-800 my-4">Rian & Rina</h1>
              <p className="text-xs text-slate-500 font-semibold tracking-widest font-mono">25.07.2026</p>
            </div>
          </section>

          {/* Bride & Groom Details */}
          <section className="px-8 py-16 text-center space-y-12 bg-gradient-to-b from-white to-rose-50/20">
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto italic">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-rose-900 italic font-semibold">Rian Pratama</h3>
                <p className="text-xs text-slate-500 mt-1">Putra dari Bpk. Bambang & Ibu Wati</p>
              </div>
              <span className="text-2xl font-serif text-rose-300 block">&</span>
              <div>
                <h3 className="text-2xl font-serif text-rose-900 italic font-semibold">Rina Amalia</h3>
                <p className="text-xs text-slate-500 mt-1">Putri dari Bpk. Harun & Ibu Aminah</p>
              </div>
            </div>
          </section>

          {/* Event Schedule */}
          <section className="px-8 py-16 bg-rose-50/40 text-center space-y-8 border-y border-rose-100">
            <h2 className="text-3xl font-serif text-rose-800 italic">Waktu & Tempat</h2>
            
            <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <span className="text-xl">💍</span>
                <h4 className="font-bold text-rose-900 text-sm">AKAD NIKAH</h4>
                <p className="text-xs text-slate-500">Pukul 09.00 - 10.30 WIB</p>
                <p className="text-xs text-slate-500 font-semibold">Gedung Pernikahan Indah</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <span className="text-xl">🎉</span>
                <h4 className="font-bold text-rose-900 text-sm">RESEPSI</h4>
                <p className="text-xs text-slate-500">Pukul 11.00 - 14.00 WIB</p>
                <p className="text-xs text-slate-500 font-semibold">Gedung Pernikahan Indah</p>
              </div>
            </div>

            <button className="bg-white border border-rose-200 text-rose-800 hover:bg-rose-50 text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm">
              📍 Buka Google Maps
            </button>
          </section>

          {/* RSVP FORM */}
          <section className="px-8 py-16 text-center space-y-8 bg-white">
            <h2 className="text-3xl font-serif text-rose-800 italic">Konfirmasi Kehadiran</h2>
            
            {rsvpSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 space-y-2 max-w-sm mx-auto">
                <p className="font-bold">Terima kasih atas konfirmasi Anda!</p>
                <p className="text-xs">Konfirmasi berhasil disimpan: <span className="font-semibold">{guest?.rsvpStatus === 'ATTENDING' ? `Hadir (${guest.pax} orang)` : 'Tidak Hadir'}</span></p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="max-w-xs mx-auto space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">STATUS KEHADIRAN</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('ATTENDING')}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        rsvpStatus === 'ATTENDING'
                          ? 'bg-rose-800 border-rose-800 text-white shadow-md shadow-rose-900/10'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('DECLINED')}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        rsvpStatus === 'DECLINED'
                          ? 'bg-rose-800 border-rose-800 text-white shadow-md shadow-rose-900/10'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>
                </div>

                {rsvpStatus === 'ATTENDING' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">JUMLAH ORANG (PAX)</label>
                    <select
                      value={rsvpPax}
                      onChange={(e) => setRsvpPax(Number(e.target.value))}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white outline-none"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-rose-400 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md shadow-rose-900/10 mt-2 cursor-pointer"
                >
                  {isSubmittingRsvp ? 'Mengirim...' : 'Kirim Konfirmasi'}
                </button>
              </form>
            )}
          </section>

          {/* GUESTBOOK / WISHES FORM & FEED */}
          <section className="px-8 py-16 bg-rose-50/20 border-t border-rose-100 text-center space-y-8">
            <h2 className="text-3xl font-serif text-rose-800 italic">Buku Tamu & Ucapan</h2>
            
            {/* Wish Submission Form */}
            <form onSubmit={handleWishSubmit} className="max-w-sm mx-auto space-y-4 text-left bg-white p-6 rounded-2xl border border-rose-100/50 shadow-sm">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">NAMA PENGIRIM</label>
                <input
                  type="text"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Contoh: John Doe"
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-rose-800"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">UCAPAN / DOA</label>
                <textarea
                  value={wishMsg}
                  onChange={(e) => setWishMsg(e.target.value)}
                  placeholder="Tulis ucapan dan doa tulus Anda..."
                  rows={3}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-rose-800 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">KONFIRMASI KEHADIRAN</label>
                <select
                  value={wishAttend}
                  onChange={(e) => setWishAttend(e.target.value as any)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white outline-none"
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Masih Ragu">Masih Ragu</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmittingWish}
                className="w-full bg-rose-800 hover:bg-rose-900 disabled:bg-rose-400 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-md shadow-rose-900/10 cursor-pointer"
              >
                {isSubmittingWish ? 'Mengirim...' : 'Kirim Ucapan'}
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="max-w-sm mx-auto space-y-4 pt-4 max-h-[400px] overflow-y-auto pr-1">
              {wishes.map((wish) => (
                <div key={wish._id} className="bg-white p-4 rounded-xl border border-rose-100 text-left space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-rose-900">{wish.name}</span>
                    <span className="text-[9px] bg-rose-100/50 text-rose-800 px-2 py-0.5 rounded-full font-semibold">{wish.attendance}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{wish.message}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCF8F9] flex items-center justify-center text-rose-800 font-medium">Memuat Undangan...</div>}>
      <InvitationContent />
    </Suspense>
  );
}
