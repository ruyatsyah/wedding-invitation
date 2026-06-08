'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Monitor, X, Smartphone } from 'lucide-react';
import EditHeader from './components/EditHeader';
import MenuGrid from './components/MenuGrid';
import PengantinForm from './components/PengantinForm';
import BukuTamuForm from './components/BukuTamuForm';
import KirimForm from './components/KirimForm';
import TemaForm from './components/TemaForm';
import AcaraForm from './components/AcaraForm';
import GaleriForm from './components/GaleriForm';
import PengaturanForm from './components/PengaturanForm';
import MusikForm from './components/MusikForm';
import UcapanForm from './components/UcapanForm';
import KadoForm from './components/KadoForm';
import RsvpForm from './components/RsvpForm';
import KisahCintaForm from './components/KisahCintaForm';
import QuoteForm from './components/QuoteForm';
import StoryIgForm from './components/StoryIgForm';

export default function EditUndanganDashboard() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

    if (activeSection === 'musik') {
      return (
        <MusikForm
          projectId={id as string}
          initialData={{
            bgMusic: projectData?.bgMusic || '',
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'ucapan') {
      return <UcapanForm projectId={id as string} onBack={() => setActiveSection(null)} />;
    }

    if (activeSection === 'kado') {
      return (
        <KadoForm
          projectId={id as string}
          initialData={{
            bankName: projectData?.bankName || '',
            bankAccount: projectData?.bankAccount || '',
            bankHolder: projectData?.bankHolder || '',
            digitalEnvelopes: projectData?.digitalEnvelopes || [],
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'rsvp') {
      return (
        <RsvpForm
          projectId={id as string}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'kisah_cinta') {
      return (
        <KisahCintaForm
          projectId={id as string}
          initialLoveStories={projectData?.loveStories || []}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'quote') {
      return (
        <QuoteForm
          projectId={id as string}
          initialData={{
            quoteText: projectData?.quoteText || '',
            quoteSource: projectData?.quoteSource || '',
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'story_ig') {
      return (
        <StoryIgForm
          projectId={id as string}
          initialData={{
            igStoryUrl: projectData?.igStoryUrl || '',
          }}
          onBack={() => setActiveSection(null)}
        />
      );
    }

    if (activeSection === 'pengaturan') {
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 pb-20 relative overflow-x-hidden">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm h-16 flex items-center justify-between px-6 md:px-10">
        <h1 className="font-bold text-lg text-neutral-800">Edit Undangan</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors text-sm font-semibold"
            title="Toggle Preview"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <div className="w-10 h-10 bg-[#000000] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
            AS
          </div>
        </div>
      </header>

      {/* Floating Preview Button — hidden on mobile, visible on desktop when preview is closed */}
      {!showPreview && (
        <button
          onClick={() => setShowPreview(true)}
          className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 bg-[#000000] text-white pl-4 pr-3 py-4 rounded-l-2xl shadow-2xl flex-col items-center gap-2 z-50 hover:bg-neutral-800 transition-transform hover:-translate-x-1"
        >
          <Smartphone className="w-6 h-6" />
          <span className="font-bold text-xs" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            PREVIEW
          </span>
        </button>
      )}

      <main className={`mx-auto px-4 mt-6 md:mt-8 flex items-start transition-all duration-300 ${showPreview ? 'lg:mr-[400px] xl:mr-[450px] justify-center max-w-5xl' : 'w-full justify-center max-w-5xl'}`}>
        
        {/* Left Side: Mobile Sized Editor or Full Sized Form */}
        <div className="w-full flex-1">
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
            <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-200 p-6 md:p-8">
              {renderSection()}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Main Info Card */}
              <EditHeader 
                projectId={id as string}
                coupleName={projectData?.coupleName}
                customUrl={projectData?.customUrl}
                status={projectData?.status || 'inactive'}
                accessCode="26146306"
                stats={{ tamu: 0, hadir: 0, ucapan: 0 }}
                onToggleStatus={handleToggleStatus}
              />

              {/* Menu Grid */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 pb-6">
                <MenuGrid projectId={id as string} onMenuClick={(menuId) => setActiveSection(menuId)} />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live Preview */}
        {showPreview && (
          <>
            {/* Mobile: Fullscreen Overlay */}
            <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="h-14 flex items-center justify-between px-4 border-b border-neutral-200 shrink-0 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-neutral-600" />
                  <h3 className="font-bold text-sm text-neutral-800">Pratinjau Undangan</h3>
                </div>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-semibold transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Tutup
                </button>
              </div>
              <div className="flex-1 bg-neutral-100 relative overflow-hidden">
                {projectData?.customUrl ? (
                  <iframe 
                    src={`/${projectData.customUrl}`}
                    className="w-full h-full border-0"
                    title="Live Preview Mobile"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 flex-col gap-3">
                    <Monitor className="w-12 h-12 opacity-50" />
                    <p className="text-sm">Pratinjau tidak tersedia</p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Fixed Sidebar */}
            <div className="hidden lg:flex fixed top-0 right-0 w-[400px] xl:w-[450px] h-screen bg-white shadow-2xl border-l border-neutral-200 z-50 flex-col animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 shrink-0 bg-white">
                <h3 className="font-bold text-sm text-neutral-800">Pratinjau Langsung</h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
                  title="Tutup Pratinjau"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 bg-neutral-50 relative">
                {projectData?.customUrl ? (
                  <iframe 
                    src={`/${projectData.customUrl}`}
                    className="w-full h-full border-0"
                    title="Live Preview"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 flex-col gap-3">
                    <Monitor className="w-12 h-12 opacity-50" />
                    <p>Pratinjau tidak tersedia</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

