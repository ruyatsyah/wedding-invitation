"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Bell,
  UserCircle,
  Save,
  Link as LinkIcon,
  Heart,
  CalendarDays,
  ImagePlus,
  ListChecks,
  Lock,
  User,
  MapPin,
  Camera,
  X,
  Music,
  CalendarCheck,
  BookOpen,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";

interface FormData {
  coupleName: string;
  customUrl: string;
  groomFullName: string;
  groomParents: string;
  groomInstagram: string;
  groomPhoto: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram: string;
  bridePhoto: string;
  gallery: string[];
  eventDate: string;
  eventTime: string;
  eventTimezone: string;
  venue: string;
  mapsUrl: string;
  youtubeUrl: string;
  enableRsvp: boolean;
  enableGuestbook: boolean;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  bgMusic: string;
}

const defaultForm: FormData = {
  coupleName: "",
  customUrl: "",
  groomFullName: "",
  groomParents: "",
  groomInstagram: "",
  groomPhoto: "",
  brideFullName: "",
  brideParents: "",
  brideInstagram: "",
  bridePhoto: "",
  gallery: ["", "", "", "", ""],
  eventDate: "",
  eventTime: "",
  eventTimezone: "WIB (GMT+7)",
  venue: "",
  mapsUrl: "",
  youtubeUrl: "",
  enableRsvp: true,
  enableGuestbook: true,
  bankName: "",
  bankAccount: "",
  bankHolder: "",
  bgMusic: "",
};

// ── Photo Upload Slot Component ─────────────────────────────────────────────
function PhotoUploadSlot({
  label, slot, currentUrl, isUploading, onUpload, onRemove, compact = false,
}: {
  label: string;
  slot: string;
  currentUrl: string;
  isUploading: boolean;
  onUpload: (slot: string, file: File) => void;
  onRemove: () => void;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(slot, file);
    e.target.value = '';
  };

  const height = compact ? 'h-28' : 'h-40';

  return (
    <div className="space-y-1.5">
      {!compact && <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</label>}
      <div
        className={`relative ${height} rounded-xl border-2 border-dashed border-[#ddbfc4] bg-[#fdf8f9] overflow-hidden group cursor-pointer hover:border-[#6b002c] transition-colors`}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        {currentUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
              <Camera className="w-5 h-5 text-white" />
              <span className="text-white text-[10px] font-semibold">Ganti</span>
            </div>
            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute top-1.5 right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 z-10"
            >
              <X className="w-3 h-3" />
            </button>
            {/* Label badge */}
            {compact && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 py-0.5 text-center">
                <span className="text-white text-[9px] font-semibold">{label}</span>
              </div>
            )}
          </>
        ) : isUploading ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <svg className="animate-spin w-6 h-6 text-[#6b002c]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-[10px] text-slate-500">Upload...</span>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-400">
            <ImagePlus className="w-5 h-5" />
            <span className="text-[9px] font-semibold text-center px-1 leading-tight">{label}</span>
            {!compact && <span className="text-[10px]">JPG, PNG, WEBP · maks 5MB</span>}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}

// ── Editor Page ──────────────────────────────────────────────────────────────
export default function EditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("link");
  const [form, setForm] = useState<FormData>(defaultForm);
  const [saveMsg, setSaveMsg] = useState("");
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  // Track whether form has been loaded from server at least once
  const formLoadedRef = React.useRef(false);

  const { isLoading, data: projectData } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to fetch");
      return data.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    // Only load from server on first fetch, not after every save
    if (projectData && !formLoadedRef.current) {
      formLoadedRef.current = true;
      const p = projectData as any;
      setForm({
        coupleName: p.coupleName || "",
        customUrl: p.customUrl || "",
        groomFullName: p.groomFullName || "",
        groomParents: p.groomParents || "",
        groomInstagram: p.groomInstagram || "",
        groomPhoto: p.groomPhoto || "",
        brideFullName: p.brideFullName || "",
        brideParents: p.brideParents || "",
        brideInstagram: p.brideInstagram || "",
        bridePhoto: p.bridePhoto || "",
        gallery: p.gallery?.length ? [...p.gallery, ...Array(5).fill("")].slice(0, 5) : ["", "", "", "", ""],
        eventDate: p.eventDate || "",
        eventTime: p.eventTime || "",
        eventTimezone: p.eventTimezone || "WIB (GMT+7)",
        venue: p.venue || "",
        mapsUrl: p.mapsUrl || "",
        youtubeUrl: p.youtubeUrl || "",
        enableRsvp: p.enableRsvp ?? true,
        enableGuestbook: p.enableGuestbook ?? true,
        bankName: p.bankName || "",
        bankAccount: p.bankAccount || "",
        bankHolder: p.bankHolder || "",
        bgMusic: p.bgMusic || "",
      });
    }
  }, [projectData]);

  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Auto-save bgMusic immediately when changed + show feedback
  const [musicSaving, setMusicSaving] = useState(false);
  const [musicSaved, setMusicSaved] = useState(false);

  const handleMusicChange = async (value: string) => {
    set("bgMusic", value);
    setMusicSaving(true);
    setMusicSaved(false);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bgMusic: value }),
      });
      const data = await res.json();
      if (data.success) {
        setMusicSaved(true);
        setTimeout(() => setMusicSaved(false), 2000);
      }
    } catch (err) {
      console.error("Failed to save bgMusic:", err);
    } finally {
      setMusicSaving(false);
    }
  };

  const handlePhotoUpload = async (slot: string, file: File) => {
    setUploadingSlot(slot);
    try {
      const fd = new FormData();
      fd.append('slot', slot);
      fd.append('file', file);
      const res = await fetch(`/api/projects/${id}/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      // Update local form state
      if (slot === 'groomPhoto') set('groomPhoto', data.url);
      else if (slot === 'bridePhoto') set('bridePhoto', data.url);
      else if (slot.startsWith('gallery_')) {
        const idx = parseInt(slot.replace('gallery_', ''));
        setForm(prev => {
          const g = [...prev.gallery];
          g[idx] = data.url;
          return { ...prev, gallery: g };
        });
      }
    } catch (err: any) {
      setSaveMsg('Gagal upload foto: ' + err.message);
      setTimeout(() => setSaveMsg(''), 4000);
    } finally {
      setUploadingSlot(null);
    }
  };

  const updateProjectMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to update");
      return data.data;
    },
    onSuccess: () => {
      setSaveMsg("Tersimpan!");
      // Don't call setQueryData — it would re-trigger useEffect and reset the form
      setTimeout(() => setSaveMsg(""), 3000);
    },
    onError: () => {
      setSaveMsg("Gagal menyimpan.");
      setTimeout(() => setSaveMsg(""), 3000);
    },
  });

  const handleSave = () => {
    setSaveMsg("");
    updateProjectMutation.mutate(form);
  };

  const isSaving = updateProjectMutation.isPending;

  const inputCls =
    "w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c] focus:ring-1 focus:ring-[#6b002c]/20 bg-white text-sm";
  const labelCls =
    "block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1";

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin w-8 h-8 text-[#8D1A42]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f9f9fc] text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 flex flex-col w-full bg-[#f3f3f6] border-b border-[#ddbfc4] shadow-sm">
        <div className="flex items-center justify-between px-8 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/client/undangan")}
              className="text-slate-500 hover:text-[#6b002c] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-800">
              {form.coupleName || "Editor Undangan"}
            </span>
            <span className="text-xs text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">
              /{form.customUrl}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${saveMsg === "Tersimpan!" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
              >
                {saveMsg}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-[#8d1a42] text-white font-semibold rounded-lg text-sm hover:bg-[#721535] disabled:opacity-60 transition-all shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-8 flex-1 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Tabs */}
          <div className="col-span-12 lg:col-span-3 space-y-2">
            {[
              {
                id: "link",
                icon: LinkIcon,
                title: "Pengaturan Link",
                desc: "URL Undangan",
              },
              {
                id: "data",
                icon: Heart,
                title: "Data Mempelai",
                desc: "Nama & Foto",
              },
              {
                id: "info",
                icon: CalendarDays,
                title: "Informasi Acara",
                desc: "Tanggal & Lokasi",
              },
              {
                id: "media",
                icon: ImagePlus,
                title: "Media",
                desc: "Galeri & Musik",
              },
              {
                id: "fitur",
                icon: ListChecks,
                title: "Fitur Tambahan",
                desc: "RSVP & Ucapan",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all shadow-sm border cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#6b002c] bg-[#ffd9df]/20"
                    : "border-[#ddbfc4] bg-white hover:border-[#6b002c] group"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === tab.id ? "bg-[#6b002c] text-white" : "bg-[#6b002c]/5 text-[#6b002c] group-hover:bg-[#6b002c] group-hover:text-white"}`}
                >
                  <tab.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">{tab.title}</p>
                  <p className="text-xs text-slate-500">{tab.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-xl border border-[#ddbfc4] shadow-sm p-6 min-h-[600px]">
              {/* Tab: Link */}
              {activeTab === "link" && (
                <div className="space-y-6">
                  <div className="border-b border-[#ddbfc4] pb-4">
                    <h3 className="text-xl font-semibold text-[#6b002c]">
                      Pengaturan Link
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      URL undangan Anda yang sudah aktif.
                    </p>
                  </div>
                  <div className="max-w-xl space-y-4">
                    <div>
                      <label className={labelCls}>
                        Nama Mempelai (Singkat)
                      </label>
                      <input
                        className={inputCls}
                        value={form.coupleName}
                        onChange={(e) => set("coupleName", e.target.value)}
                        placeholder="Romi & Shinta"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Custom URL</label>
                      <div className="flex">
                        <div className="flex items-center px-4 bg-[#e8e8ea] border border-r-0 border-[#ddbfc4] rounded-l-lg text-slate-500 text-sm font-medium whitespace-nowrap">
                          kabarbaik.co/
                        </div>
                        <input
                          disabled
                          className="flex-1 border border-[#ddbfc4] rounded-r-lg px-4 py-2 outline-none bg-slate-50 text-slate-500 text-sm"
                          value={form.customUrl}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[#6b002c] bg-[#6b002c]/5 p-3 rounded-lg border border-[#6b002c]/20">
                        <Lock className="w-4 h-4 shrink-0" />
                        <p className="text-xs font-medium">
                          URL tidak bisa diubah setelah undangan aktif untuk
                          menjaga tautan yang sudah disebarkan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Data Mempelai */}
              {activeTab === "data" && (
                <div className="space-y-6">
                  <div className="border-b border-[#ddbfc4] pb-4">
                    <h3 className="text-xl font-semibold text-[#6b002c]">
                      Data Mempelai
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Masukkan identitas mempelai pria dan wanita.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Groom */}
                    <div className="space-y-4 p-4 bg-[#f3f3f6] rounded-xl border border-[#ddbfc4]/50">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#6b002c]" /> Mempelai
                        Pria
                      </h4>
                      <div>
                        <label className={labelCls}>Nama Lengkap</label>
                        <input
                          className={inputCls}
                          value={form.groomFullName}
                          onChange={(e) => set("groomFullName", e.target.value)}
                          placeholder="Ahmad Romi"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Nama Orang Tua</label>
                        <input
                          className={inputCls}
                          value={form.groomParents}
                          onChange={(e) => set("groomParents", e.target.value)}
                          placeholder="Putra dari Bpk. X & Ibu Y"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Instagram</label>
                        <div className="flex">
                          <span className="px-3 flex items-center border border-r-0 border-[#ddbfc4] rounded-l-lg bg-white text-slate-500 text-sm">
                            @
                          </span>
                          <input
                            className="flex-1 border border-[#ddbfc4] rounded-r-lg px-4 py-2 outline-none focus:border-[#6b002c] text-sm"
                            value={form.groomInstagram}
                            onChange={(e) =>
                              set("groomInstagram", e.target.value)
                            }
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Bride */}
                    <div className="space-y-4 p-4 bg-[#f3f3f6] rounded-xl border border-[#ddbfc4]/50">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#6b002c]" /> Mempelai
                        Wanita
                      </h4>
                      <div>
                        <label className={labelCls}>Nama Lengkap</label>
                        <input
                          className={inputCls}
                          value={form.brideFullName}
                          onChange={(e) => set("brideFullName", e.target.value)}
                          placeholder="Dewi Shinta"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Nama Orang Tua</label>
                        <input
                          className={inputCls}
                          value={form.brideParents}
                          onChange={(e) => set("brideParents", e.target.value)}
                          placeholder="Putri dari Bpk. A & Ibu B"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Instagram</label>
                        <div className="flex">
                          <span className="px-3 flex items-center border border-r-0 border-[#ddbfc4] rounded-l-lg bg-white text-slate-500 text-sm">
                            @
                          </span>
                          <input
                            className="flex-1 border border-[#ddbfc4] rounded-r-lg px-4 py-2 outline-none focus:border-[#6b002c] text-sm"
                            value={form.brideInstagram}
                            onChange={(e) =>
                              set("brideInstagram", e.target.value)
                            }
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Informasi Acara */}
              {activeTab === "info" && (
                <div className="space-y-6">
                  <div className="border-b border-[#ddbfc4] pb-4">
                    <h3 className="text-xl font-semibold text-[#6b002c]">
                      Informasi Acara
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Tanggal, waktu, dan lokasi acara pernikahan.
                    </p>
                  </div>
                  <div className="space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>Tanggal</label>
                        <input
                          className={inputCls}
                          type="date"
                          value={form.eventDate}
                          onChange={(e) => set("eventDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Waktu</label>
                        <input
                          className={inputCls}
                          type="time"
                          value={form.eventTime}
                          onChange={(e) => set("eventTime", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Zona Waktu</label>
                        <select
                          className={inputCls}
                          value={form.eventTimezone}
                          onChange={(e) => set("eventTimezone", e.target.value)}
                        >
                          <option>WIB (GMT+7)</option>
                          <option>WITA (GMT+8)</option>
                          <option>WIT (GMT+9)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Nama & Alamat Venue</label>
                      <textarea
                        className={`${inputCls} min-h-[80px] resize-none`}
                        value={form.venue}
                        onChange={(e) => set("venue", e.target.value)}
                        placeholder="Gedung Serbaguna, Jl. Merdeka No. 1, Jakarta"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Google Maps URL</label>
                      <input
                        className={inputCls}
                        value={form.mapsUrl}
                        onChange={(e) => set("mapsUrl", e.target.value)}
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Media */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  <div className="border-b border-[#ddbfc4] pb-4">
                    <h3 className="text-xl font-semibold text-[#6b002c]">Media & Galeri</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Upload foto mempelai dan galeri kenangan. Format JPG/PNG/WEBP, maks 5MB per foto.
                    </p>
                  </div>

                  {/* Foto Mempelai */}
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#6b002c]" /> Foto Mempelai
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Foto Mempelai Pria */}
                      <PhotoUploadSlot
                        label="Foto Mempelai Pria"
                        slot="groomPhoto"
                        currentUrl={form.groomPhoto}
                        isUploading={uploadingSlot === "groomPhoto"}
                        onUpload={handlePhotoUpload}
                        onRemove={() => set("groomPhoto", "")}
                      />
                      {/* Foto Mempelai Wanita */}
                      <PhotoUploadSlot
                        label="Foto Mempelai Wanita"
                        slot="bridePhoto"
                        currentUrl={form.bridePhoto}
                        isUploading={uploadingSlot === "bridePhoto"}
                        onUpload={handlePhotoUpload}
                        onRemove={() => set("bridePhoto", "")}
                      />
                    </div>
                  </div>

                  {/* Galeri Foto */}
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-1 flex items-center gap-2">
                      <ImagePlus className="w-4 h-4 text-[#6b002c]" /> Galeri Foto
                      <span className="text-xs font-normal text-slate-400">(maks 5 foto)</span>
                    </h4>
                    <p className="text-xs text-slate-400 mb-3">Foto-foto kenangan yang akan ditampilkan di galeri undangan.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <PhotoUploadSlot
                          key={idx}
                          label={`Foto ${idx + 1}`}
                          slot={`gallery_${idx}`}
                          currentUrl={form.gallery[idx] || ""}
                          isUploading={uploadingSlot === `gallery_${idx}`}
                          onUpload={handlePhotoUpload}
                          onRemove={() => {
                            const g = [...form.gallery];
                            g[idx] = "";
                            set("gallery", g);
                          }}
                          compact
                        />
                      ))}
                    </div>
                  </div>

                  {/* Video YouTube */}
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                      <Music className="w-4 h-4 text-[#6b002c]" /> Video & Musik
                    </h4>
                    <div className="max-w-xl space-y-4">
                      <div>
                        <label className={labelCls}>Link Video YouTube</label>
                        <input
                          className={inputCls}
                          value={form.youtubeUrl}
                          onChange={(e) => set("youtubeUrl", e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>

                      {/* Musik Latar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className={labelCls}>Musik Latar Undangan</label>
                          {musicSaving && (
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                              </svg>
                              Menyimpan...
                            </span>
                          )}
                          {musicSaved && !musicSaving && (
                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                              ✓ Tersimpan
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          {[
                            { value: "", label: "Tanpa Musik", icon: "🔇", desc: "Tidak ada musik latar" },
                            {
                              value: "/assets/music/Cik Voor Ancika - Pidi Baiq The Panasdalam.mp3",
                              label: "Cik Voor Ancika",
                              icon: "🎵",
                              desc: "Pidi Baiq The Panasdalam",
                            },
                            {
                              value: "/assets/music/you are the reason - Calum Scott .mp3",
                              label: "You Are The Reason",
                              icon: "🎶",
                              desc: "Calum Scott",
                            },
                          ].map((music) => {
                            const isSelected = form.bgMusic === music.value;
                            return (
                              <div
                                key={music.value}
                                onClick={() => handleMusicChange(music.value)}
                                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
                                  isSelected
                                    ? "border-[#6b002c] bg-[#ffd9df]/20"
                                    : "border-[#ddbfc4] bg-white hover:border-[#6b002c]/50"
                                }`}
                              >
                                {/* Custom radio indicator */}
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                  isSelected ? "border-[#6b002c]" : "border-slate-300"
                                }`}>
                                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#6b002c]" />}
                                </div>
                                <span className="text-lg">{music.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-slate-800">{music.label}</p>
                                  <p className="text-xs text-slate-500">{music.desc}</p>
                                </div>
                                {/* Preview button */}
                                {music.value && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const audio = new Audio(music.value);
                                      audio.play().catch(() => {});
                                      setTimeout(() => audio.pause(), 5000);
                                    }}
                                    className="text-[11px] text-[#6b002c] font-semibold hover:underline flex-shrink-0 px-2 py-1 rounded hover:bg-[#6b002c]/10"
                                  >
                                    ▶ Preview
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">
                          Musik akan otomatis diputar saat tamu membuka undangan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Fitur Tambahan */}
              {activeTab === "fitur" && (
                <div className="space-y-6">
                  <div className="border-b border-[#ddbfc4] pb-4">
                    <h3 className="text-xl font-semibold text-[#6b002c]">
                      Fitur Tambahan
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Kelola interaksi tamu dan info angpao digital.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[
                        {
                          key: "enableRsvp" as const,
                          icon: CalendarCheck,
                          title: "RSVP Management",
                          desc: "Tamu bisa konfirmasi kehadiran",
                        },
                        {
                          key: "enableGuestbook" as const,
                          icon: BookOpen,
                          title: "Buku Tamu Digital",
                          desc: "Tamu bisa tinggalkan pesan",
                        },
                      ].map(({ key, icon: Icon, title, desc }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 bg-[#f3f3f6] border border-[#ddbfc4] rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-[#6b002c]" />
                            <div>
                              <p className="font-bold text-sm">{title}</p>
                              <p className="text-xs text-slate-500">{desc}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={form[key]}
                              onChange={(e) => set(key, e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-[#e8e8ea] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6b002c]"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4 p-4 bg-[#f9f9fc] border border-[#ddbfc4] rounded-xl">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-[#6b002c]" /> Angpao
                        Digital
                      </h4>
                      <div>
                        <label className={labelCls}>Bank / E-Wallet</label>
                        <select
                          className={inputCls}
                          value={form.bankName}
                          onChange={(e) => set("bankName", e.target.value)}
                        >
                          <option value="">-- Pilih --</option>
                          <option>Bank BCA</option>
                          <option>Bank Mandiri</option>
                          <option>Bank BNI</option>
                          <option>Bank BRI</option>
                          <option>GoPay</option>
                          <option>OVO</option>
                          <option>Dana</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>
                          Nomor Rekening / Akun
                        </label>
                        <input
                          className={inputCls}
                          value={form.bankAccount}
                          onChange={(e) => set("bankAccount", e.target.value)}
                          placeholder="1234567890"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Atas Nama</label>
                        <input
                          className={inputCls}
                          value={form.bankHolder}
                          onChange={(e) => set("bankHolder", e.target.value)}
                          placeholder="Nama pemilik rekening"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
