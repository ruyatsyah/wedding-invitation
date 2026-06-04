'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, UserCheck, CheckCircle2, MapPin, Loader2, QrCode, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PenerimaTamuPage() {
  const { id: projectId } = useParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  // 1. Fetch Project Details
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    }
  });

  // 2. Fetch Guests
  const { data: guests = [], isLoading } = useQuery({
    queryKey: ['guests', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/guests?projectId=${projectId}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    refetchInterval: 10000 // auto refresh every 10s
  });

  // 3. Update Attendance Mutation
  const checkInMutation = useMutation({
    mutationFn: async ({ guestId, isAttending }: { guestId: string, isAttending: boolean }) => {
      const res = await fetch(`/api/guests/${guestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOpened: true, rsvpStatus: isAttending ? 'ATTENDING' : 'DECLINED' })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    onMutate: async (variables) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['guests', projectId] });
      const previousGuests = queryClient.getQueryData(['guests', projectId]);
      queryClient.setQueryData(['guests', projectId], (old: any) => {
        if (!old) return old;
        return old.map((g: any) => 
          g._id === variables.guestId 
            ? { ...g, rsvpStatus: variables.isAttending ? 'ATTENDING' : 'DECLINED' } 
            : g
        );
      });
      return { previousGuests };
    },
    onError: (err, variables, context) => {
      if (context?.previousGuests) {
        queryClient.setQueryData(['guests', projectId], context.previousGuests);
      }
      toast.error('Gagal update kehadiran');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', projectId] });
    }
  });

  const handleCheckIn = (guestId: string) => {
    checkInMutation.mutate({ guestId, isAttending: true });
    toast.success('Tamu berhasil Check-In!', { icon: '✅' });
  };

  const handleCancelCheckIn = (guestId: string) => {
    if (window.confirm('Batalkan status Check-In tamu ini?')) {
      checkInMutation.mutate({ guestId, isAttending: false });
    }
  };

  // QR Scanner Effect
  useEffect(() => {
    if (showScanner) {
      let html5QrcodeScanner: any = null;
      
      const initializeScanner = async () => {
        const { Html5QrcodeScanner } = await import('html5-qrcode');
        html5QrcodeScanner = new Html5QrcodeScanner(
          "qr-reader",
          { fps: 10, qrbox: { width: 250, height: 250 } },
          /* verbose= */ false
        );
        html5QrcodeScanner.render(
          (decodedText: string) => {
            // decodedText is usually the guestId
            if (decodedText) {
              const guest = guests.find((g: any) => g._id === decodedText || g.slug === decodedText);
              if (guest) {
                if (guest.rsvpStatus !== 'ATTENDING') {
                  handleCheckIn(guest._id);
                } else {
                  toast.success('Tamu sudah Check-In sebelumnya');
                }
              } else {
                toast.error('Tamu tidak ditemukan dalam database acara ini!');
              }
              // Pause scanner after success
              html5QrcodeScanner.clear();
              setShowScanner(false);
            }
          },
          (errorMessage: any) => {
            // parse errors just log silently
          }
        );
      };

      initializeScanner();

      return () => {
        if (html5QrcodeScanner) {
          try { html5QrcodeScanner.clear(); } catch(e) {}
        }
      };
    }
  }, [showScanner, guests]);

  // 4. Derived Data
  const filteredGuests = useMemo(() => {
    if (!search) return guests;
    const lowerSearch = search.toLowerCase();
    return guests.filter((g: any) => 
      g.name?.toLowerCase().includes(lowerSearch) || 
      g.slug?.toLowerCase().includes(lowerSearch)
    );
  }, [guests, search]);

  const totalGuests = guests.length;
  const attendedCount = guests.filter((g: any) => g.rsvpStatus === 'ATTENDING').length;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans relative">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            Layar Penerima Tamu
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {project?.coupleName ? `Pernikahan ${project.coupleName}` : 'Memuat data acara...'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Hadir</div>
            <div className="text-2xl font-black text-indigo-600 leading-none">
              {attendedCount} <span className="text-neutral-300 text-lg">/ {totalGuests}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari nama tamu (ketik nama...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-base transition-all"
              autoFocus
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-sm font-medium"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button 
                onClick={() => setShowScanner(true)}
                className="bg-neutral-900 text-white px-6 py-4 rounded-2xl font-bold shadow-sm hover:bg-black transition-colors whitespace-nowrap flex items-center gap-2"
             >
               <QrCode className="w-5 h-5" />
               Scan QR Code
             </button>
          </div>
        </div>

        {/* Guest List Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mb-4" />
            <p className="text-neutral-500 text-sm">Memuat daftar tamu...</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGuests.length === 0 ? (
              <div className="col-span-full py-12 text-center text-neutral-400">
                Tamu tidak ditemukan.
              </div>
            ) : (
              filteredGuests.map((guest: any) => {
                const isAttended = guest.rsvpStatus === 'ATTENDING';
                return (
                  <div 
                    key={guest._id} 
                    className={`p-4 rounded-2xl border transition-all ${
                      isAttended 
                        ? 'bg-indigo-50 border-indigo-100 shadow-inner' 
                        : 'bg-white border-neutral-200 shadow-sm hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`font-bold text-lg ${isAttended ? 'text-indigo-900' : 'text-neutral-800'}`}>
                          {guest.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {guest.pax || 1} Pax
                          </span>
                        </div>
                      </div>
                      {isAttended && (
                        <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                      )}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      {isAttended ? (
                        <button
                          onClick={() => handleCancelCheckIn(guest._id)}
                          className="flex-1 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition-colors"
                        >
                          Batalkan
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCheckIn(guest._id)}
                          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-sm hover:bg-indigo-700 hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Check-In Tamu
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </main>

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <h3 className="font-bold text-neutral-800 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-600" />
                Scan QR Code Tamu
              </h3>
              <button 
                onClick={() => setShowScanner(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 text-neutral-600 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div id="qr-reader" className="w-full rounded-xl overflow-hidden border border-neutral-200"></div>
              <p className="text-center text-sm text-neutral-500 mt-4">
                Arahkan kamera ke QR Code yang ada di undangan tamu
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
