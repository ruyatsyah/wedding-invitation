'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Monitor } from 'lucide-react';
import EditHeader from './components/EditHeader';
import MenuGrid from './components/MenuGrid';
import PengantinForm from './components/PengantinForm';
import BukuTamuForm from './components/BukuTamuForm';
import KirimForm from './components/KirimForm';
import TemaForm from './components/TemaForm';
import AcaraForm from './components/AcaraForm';
import GaleriForm from './components/GaleriForm';
import PengaturanForm from './components/PengaturanForm';

export default function EditUndanganDashboard() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const { isLoading, data: projectData } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch');
      return data.data;
    },
    enabled: !!id,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <svg className="animate-spin w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  const handleToggleStatus = () => {
    const newStatus = projectData?.status === 'active' ? 'inactive' : 'active';
    toggleStatusMutation.mutate(newStatus);
  };

  const renderSection = () => {
    if (!activeSection) return null;

    if (activeSection === 'pengantin') {
      return (
        <PengantinForm
          projectId={id as string}
          initialData={{
            coupleName: projectData?.coupleName || '',
            groomFullName: projectData?.groomFullName || '',
            groomParents: projectData?.groomParents || '',
            groomInstagram: projectData?.groomInstagram || '',
            groomPhoto: projectData?.groomPhoto || '',
            brideFullName: projectData?.brideFullName || '',
            brideParents: projectData?.brideParents || '',
            brideInstagram: projectData?.brideInstagram || '',
            bridePhoto: projectData?.bridePhoto || '',
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'buku_tamu') {
      return (
        <BukuTamuForm
          projectId={id as string}
          initialGuests={projectData?.guests || []}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'kirim') {
      return (
        <KirimForm
          projectId={id as string}
          customUrl={projectData?.customUrl || ''}
          initialGuests={projectData?.guests || []}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'tema') {
      return (
        <TemaForm
          projectId={id as string}
          initialThemeId={projectData?.themeId?._id || projectData?.themeId}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'acara') {
      return (
        <AcaraForm
          projectId={id as string}
          initialData={{
            eventDate: projectData?.eventDate || '',
            eventTime: projectData?.eventTime || '',
            eventTimezone: projectData?.eventTimezone || 'WIB (GMT+7)',
            venue: projectData?.venue || '',
            mapsUrl: projectData?.mapsUrl || '',
            youtubeUrl: projectData?.youtubeUrl || '',
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'galeri') {
      return (
        <GaleriForm
          projectId={id as string}
          initialGallery={projectData?.gallery || []}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'musik' || activeSection === 'pengaturan') {
      return (
        <PengaturanForm
          projectId={id as string}
          initialData={{
            customUrl: projectData?.customUrl || '',
            enableRsvp: projectData?.enableRsvp ?? true,
            enableGuestbook: projectData?.enableGuestbook ?? true,
            bankName: projectData?.bankName || '',
            bankAccount: projectData?.bankAccount || '',
            bankHolder: projectData?.bankHolder || '',
            bgMusic: projectData?.bgMusic || '',
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    return null;
  };

  const getContainerWidth = () => {
    if (activeSection === 'kirim' || activeSection === 'buku_tamu') return 'max-w-5xl';
    if (activeSection === 'tema' || activeSection === 'galeri' || activeSection === 'pengantin') return 'max-w-3xl';
    return 'max-w-lg';
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 pb-20">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm h-16 flex items-center justify-between px-6 md:px-10">
        <h1 className="font-bold text-lg text-neutral-800">Edit Undangan</h1>
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
            <Monitor className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-[#000000] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
            AS
          </div>
        </div>
      </header>

      <main className={`${getContainerWidth()} mx-auto px-4 mt-6 md:mt-8 transition-all duration-300`}>
        
        {/* Top bar: back button + badge — hidden when in any form (they have their own back button) */}
        {!activeSection && (
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => activeSection ? setActiveSection(null) : router.push('/client/undangan')}
              className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <span className="bg-neutral-100 text-neutral-700 text-xs font-bold px-3 py-1.5 rounded-full">
              Gratisan
            </span>
          </div>
        )}

        {activeSection ? (
          renderSection()
        ) : (
          <>
            {/* Main Info Card */}
            <EditHeader 
              coupleName={projectData?.coupleName}
              customUrl={projectData?.customUrl}
              status={projectData?.status || 'inactive'}
              accessCode="26146306"
              stats={{ tamu: 0, hadir: 0, ucapan: 0 }}
              onToggleStatus={handleToggleStatus}
            />

            {/* Menu Grid */}
            <div className="w-full">
              <MenuGrid onMenuClick={(menuId) => setActiveSection(menuId)} />
            </div>
          </>
        )}

      </main>
    </div>
  );
}
