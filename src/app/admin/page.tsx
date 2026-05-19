'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Guest {
  _id: string;
  name: string;
  slug: string;
  phone?: string;
  rsvpStatus: 'PENDING' | 'ATTENDING' | 'DECLINED';
  pax: number;
  group?: string;
  isOpened: boolean;
}

interface Wish {
  _id: string;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tamu' | 'wish'>('dashboard');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  
  // Form states
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestGroup, setNewGuestGroup] = useState('Reguler');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data
  const fetchData = async () => {
    try {
      const resGuests = await fetch('/api/guests');
      const dataGuests = await resGuests.json();
      if (dataGuests.success) setGuests(dataGuests.data);

      const resWishes = await fetch('/api/wishes');
      const dataWishes = await resWishes.json();
      if (dataWishes.success) setWishes(dataWishes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle create guest
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGuestName,
          phone: newGuestPhone,
          group: newGuestGroup,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGuests([data.data, ...guests]);
        setNewGuestName('');
        setNewGuestPhone('');
        setNewGuestGroup('Reguler');
      } else {
        setError(data.error || 'Failed to add guest');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Delete guest
  const handleDeleteGuest = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus tamu ini?')) return;
    try {
      // Direct delete via standard simple handler (usually we'd have a delete route, but for this demo let's filter out locally to look smooth or simulate)
      setGuests(guests.filter(g => g._id !== id));
      // In a real app we'd call: await fetch(`/api/guests/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to generate WhatsApp invitation message
  const getWhatsAppLink = (guest: Guest) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const inviteUrl = `${origin}/?to=${guest.slug}`;
    const text = `Dear ${guest.name},

Kami mengundang Anda untuk hadir di acara pernikahan kami. Detail undangan dapat diakses melalui link di bawah ini:

${inviteUrl}

Merupakan suatu kehormatan bagi kami apabila Anda berkenan hadir. Terima kasih.`;
    return `https://wa.me/${guest.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  // Helper to copy text to clipboard
  const handleCopyLink = (guest: Guest) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const inviteUrl = `${origin}/?to=${guest.slug}`;
    navigator.clipboard.writeText(inviteUrl);
    alert('Link undangan berhasil disalin!');
  };

  // Calculate statistics
  const totalGuests = guests.length;
  const attendingGuests = guests.filter(g => g.rsvpStatus === 'ATTENDING').reduce((acc, curr) => acc + (curr.pax || 1), 0);
  const declinedGuests = guests.filter(g => g.rsvpStatus === 'DECLINED').length;
  const pendingGuests = guests.filter(g => g.rsvpStatus === 'PENDING').length;

  return (
    <main className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-2">
            <span className="text-pink-500">♥</span> Wevitation <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full">Admin</span>
          </h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('tamu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'tamu'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Kelola Tamu
            </button>
            <button
              onClick={() => setActiveTab('wish')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'wish'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Buku Tamu / Ucapan
            </button>
          </nav>
        </div>

        <div>
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <span>&larr;</span> Halaman Utama
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'tamu' && 'Kelola Tamu Undangan'}
              {activeTab === 'wish' && 'Buku Tamu / Ucapan'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Mengelola hari bahagia Anda</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Super Admin</span>
            <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-1">Total Tamu</p>
                  <p className="text-3xl font-extrabold text-slate-800">{totalGuests}</p>
                </div>
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 font-bold text-xl">👥</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-1">Konfirmasi Hadir</p>
                  <p className="text-3xl font-extrabold text-emerald-600">{attendingGuests} <span className="text-xs text-slate-400 font-normal">pax</span></p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 font-bold text-xl">✓</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-1">Menolak Hadir</p>
                  <p className="text-3xl font-extrabold text-rose-600">{declinedGuests}</p>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 font-bold text-xl">✗</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-1">Belum RSVP</p>
                  <p className="text-3xl font-extrabold text-amber-500">{pendingGuests}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 font-bold text-xl">?</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recents Wishes */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
                  <span>Ucapan Terbaru</span>
                  <button onClick={() => setActiveTab('wish')} className="text-xs text-pink-600 font-medium hover:underline">Lihat Semua</button>
                </h3>
                {wishes.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-8">Belum ada ucapan atau doa yang masuk.</p>
                ) : (
                  <div className="space-y-4">
                    {wishes.slice(0, 3).map((wish) => (
                      <div key={wish._id} className="p-4 rounded-xl bg-slate-50 border border-slate-100/50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-800 text-sm">{wish.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            wish.attendance === 'Hadir' ? 'bg-emerald-100 text-emerald-700' :
                            wish.attendance === 'Tidak Hadir' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>{wish.attendance}</span>
                        </div>
                        <p className="text-xs text-slate-500 italic">&ldquo;{wish.message}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recents Guests */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
                  <span>Tamu Baru Terdaftar</span>
                  <button onClick={() => setActiveTab('tamu')} className="text-xs text-pink-600 font-medium hover:underline">Kelola Tamu</button>
                </h3>
                {guests.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-8">Belum ada tamu yang didaftarkan.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {guests.slice(0, 5).map((guest) => (
                      <div key={guest._id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{guest.name}</p>
                          <p className="text-[10px] text-slate-400">{guest.group || 'Reguler'} • {guest.phone || 'No WA'}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          guest.rsvpStatus === 'ATTENDING' ? 'bg-emerald-100 text-emerald-700' :
                          guest.rsvpStatus === 'DECLINED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>{guest.rsvpStatus}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tamu Tab Content */}
        {activeTab === 'tamu' && (
          <div className="space-y-8">
            {/* Form Tambah Tamu */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>➕</span> Tambah Tamu Baru
              </h3>
              <form onSubmit={handleAddGuest} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">NAMA TAMU</label>
                  <input
                    type="text"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Contoh: John Doe"
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">NO. WHATSAPP (OPSIONAL)</label>
                  <input
                    type="text"
                    value={newGuestPhone}
                    onChange={(e) => setNewGuestPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">KATEGORI/GRUP</label>
                  <select
                    value={newGuestGroup}
                    onChange={(e) => setNewGuestGroup(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 bg-white transition-colors"
                  >
                    <option value="Reguler">Reguler</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                    <option value="Teman Sekolah">Teman Sekolah</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white font-medium text-sm py-2.5 rounded-xl transition-all shadow-md shadow-pink-600/10 cursor-pointer"
                >
                  {loading ? 'Menambahkan...' : 'Tambah Tamu'}
                </button>
              </form>
              {error && <p className="text-rose-500 text-xs mt-2">{error}</p>}
            </div>

            {/* List Tamu Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Daftar Tamu ({guests.length})</h3>
              </div>
              {guests.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-16">Belum ada tamu yang didaftarkan. Gunakan formulir di atas untuk mulai menambahkan.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-6">Nama Tamu</th>
                        <th className="py-4 px-6">Grup</th>
                        <th className="py-4 px-6">No. WhatsApp</th>
                        <th className="py-4 px-6">Status RSVP</th>
                        <th className="py-4 px-6 text-center">Rombongan</th>
                        <th className="py-4 px-6 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                      {guests.map((guest) => (
                        <tr key={guest._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-semibold text-slate-800 block">{guest.name}</span>
                            <span className="text-[10px] text-slate-400 italic font-mono block select-all">/{guest.slug}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">{guest.group || 'Reguler'}</span>
                          </td>
                          <td className="py-4 px-6 font-mono text-xs">{guest.phone || '-'}</td>
                          <td className="py-4 px-6">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              guest.rsvpStatus === 'ATTENDING' ? 'bg-emerald-100 text-emerald-700' :
                              guest.rsvpStatus === 'DECLINED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                            }`}>{guest.rsvpStatus === 'ATTENDING' ? 'Hadir' : guest.rsvpStatus === 'DECLINED' ? 'Menolak' : 'Pending'}</span>
                          </td>
                          <td className="py-4 px-6 text-center font-semibold">{guest.pax} pax</td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => handleCopyLink(guest)}
                              title="Salin Link Undangan"
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold transition-colors"
                            >
                              Salin Link
                            </button>
                            {guest.phone && (
                              <a
                                href={getWhatsAppLink(guest)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Kirim via WhatsApp"
                                className="inline-block p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold transition-colors"
                              >
                                Kirim WA
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteGuest(guest._id)}
                              title="Hapus Tamu"
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold transition-colors"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wish Tab Content */}
        {activeTab === 'wish' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-6">Ucapan & Konfirmasi Kehadiran Tamu ({wishes.length})</h3>
            {wishes.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-16">Belum ada ucapan atau doa yang dikirim oleh tamu.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishes.map((wish) => (
                  <div key={wish._id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-800 text-base">{wish.name}</span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          wish.attendance === 'Hadir' ? 'bg-emerald-100 text-emerald-700' :
                          wish.attendance === 'Tidak Hadir' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>{wish.attendance}</span>
                      </div>
                      <p className="text-sm text-slate-600 italic mb-4">&ldquo;{wish.message}&rdquo;</p>
                    </div>
                    <span className="text-[10px] text-slate-400 self-end font-mono">
                      {new Date(wish.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
