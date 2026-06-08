'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Wallet, Plus, Trash2, Gift, Pencil, MoreVertical, X, ChevronDown, Check, GripVertical } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface DigitalEnvelope {
  bankName: string;
  bankAccount: string;
  bankHolder: string;
}

interface KadoFormProps {
  projectId: string;
  initialData: {
    bankName: string;
    bankAccount: string;
    bankHolder: string;
    digitalEnvelopes?: DigitalEnvelope[];
  };
  onBack: () => void;
}

// Static logos served from /public/bank-logos/
const LOGO_BASE = '/bank-logos';

// Slugs match filenames in /public/bank-logos/
const BANK_OPTIONS = [
  // Banks
  { name: 'BCA',        slug: 'bca.png',        category: 'Bank' },
  { name: 'Mandiri',    slug: 'mandiri.png',    category: 'Bank' },
  { name: 'BNI',        slug: 'bni.png',        category: 'Bank' },
  { name: 'BRI',        slug: 'bri.png',        category: 'Bank' },
  { name: 'BSI',        slug: 'bsi.png',        category: 'Bank' },
  { name: 'CIMB Niaga', slug: 'cimb-niaga.png', category: 'Bank' },
  { name: 'Jenius',     slug: 'Jenius-logo.png',category: 'Bank' },
  // E-Wallets
  { name: 'GoPay',      slug: 'gopay.png',      category: 'E-Wallet' },
  { name: 'DANA',       slug: 'dana.png',       category: 'E-Wallet' },
  { name: 'OVO',        slug: 'ovo.png',        category: 'E-Wallet' },
  { name: 'ShopeePay',  slug: 'shoppepay.png',  category: 'E-Wallet' },
  { name: 'LinkAja',    slug: 'link-aja.png',   category: 'E-Wallet' },
];

const logoUrl = (slug: string) => `${LOGO_BASE}/${slug}`;

const getOption = (name: string) =>
  BANK_OPTIONS.find(b => b.name.toLowerCase() === name.toLowerCase());

const inputCls = "w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 bg-white text-neutral-800 transition-all";
const labelCls = "block text-xs font-semibold text-neutral-500 mb-1.5 uppercase tracking-wider";

// ── Bank Logo Image (with fallback to initial) ────────────────────
function BankLogo({ name, slug, size = 'md' }: { name: string; slug: string; size?: 'sm' | 'md' }) {
  const [err, setErr] = useState(false);
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const initSize = size === 'sm' ? 'text-[9px]' : 'text-[11px]';

  if (err || !slug) {
    return (
      <div className={`${dim} rounded-xl bg-neutral-200 flex items-center justify-center shrink-0`}>
        <span className={`${initSize} font-extrabold text-neutral-600`}>{name.substring(0, 3).toUpperCase()}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl(slug)}
      alt={name}
      onError={() => setErr(true)}
      className={`${dim} rounded-xl object-contain bg-white border border-neutral-100 p-0.5 shrink-0`}
    />
  );
}

// ── Bank Select Dropdown ──────────────────────────────────────────
function BankSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = getOption(value);
  const grouped = ['Bank', 'E-Wallet'].map(cat => ({
    cat,
    items: BANK_OPTIONS.filter(b => b.category === cat),
  }));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 border border-neutral-200 rounded-xl px-4 py-3 bg-white text-sm text-neutral-800 outline-none focus:border-neutral-900 transition-all hover:border-neutral-300"
      >
        {value && selected ? (
          <>
            <BankLogo name={selected.name} slug={selected.slug} size="sm" />
            <span className="flex-1 text-left font-semibold">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-neutral-400">Pilih bank atau dompet digital...</span>
        )}
        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 left-0 right-0 bg-white border border-neutral-100 rounded-2xl shadow-2xl overflow-hidden">
          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {grouped.map(({ cat, items }) => (
              <div key={cat}>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1.5">{cat}</p>
                {items.map(bank => (
                  <button
                    key={bank.name}
                    type="button"
                    onClick={() => { onChange(bank.name); setOpen(false); }}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left transition-colors ${
                      value === bank.name ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-800'
                    }`}
                  >
                    <BankLogo name={bank.name} slug={bank.slug} size="sm" />
                    <span className="text-sm font-semibold flex-1">{bank.name}</span>
                    {value === bank.name && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
function EnvelopeModal({
  open,
  initialForm,
  onClose,
  onSave,
  isEdit,
}: {
  open: boolean;
  initialForm: DigitalEnvelope;
  onClose: () => void;
  onSave: (form: DigitalEnvelope) => void;
  isEdit: boolean;
}) {
  const [form, setForm] = useState<DigitalEnvelope>(initialForm);

  useEffect(() => { setForm(initialForm); }, [initialForm, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bankName.trim() || !form.bankAccount.trim()) {
      toast.error('Nama bank dan nomor rekening wajib diisi.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-100">
          <h3 className="text-base font-bold text-neutral-900">
            {isEdit ? 'Edit Rekening' : 'Tambah Rekening'}
          </h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelCls}>Bank / Dompet Digital</label>
            <BankSelect value={form.bankName} onChange={v => setForm(f => ({ ...f, bankName: v }))} />
          </div>
          <div>
            <label className={labelCls}>Nomor Rekening / No HP</label>
            <input
              className={inputCls}
              placeholder="Contoh: 1234567890"
              value={form.bankAccount}
              onChange={e => setForm(f => ({ ...f, bankAccount: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelCls}>Nama Pemilik</label>
            <input
              className={inputCls}
              placeholder="Contoh: Ahmad Fulan"
              value={form.bankHolder}
              onChange={e => setForm(f => ({ ...f, bankHolder: e.target.value }))}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 py-3 bg-neutral-900 hover:bg-black text-white rounded-xl text-sm font-bold transition-colors">
              {isEdit ? 'Simpan' : 'Tambahkan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function KadoForm({ projectId, initialData, onBack }: KadoFormProps) {
  const queryClient = useQueryClient();
  const [envelopes, setEnvelopes] = useState<DigitalEnvelope[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [modalForm, setModalForm] = useState<DigitalEnvelope>({ bankName: '', bankAccount: '', bankHolder: '' });
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData.digitalEnvelopes && initialData.digitalEnvelopes.length > 0) {
      setEnvelopes(initialData.digitalEnvelopes);
    } else if (initialData.bankName || initialData.bankAccount) {
      setEnvelopes([{ bankName: initialData.bankName || '', bankAccount: initialData.bankAccount || '', bankHolder: initialData.bankHolder || '' }]);
    } else {
      setEnvelopes([]);
    }
  }, [initialData]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuIdx(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openAdd = () => { setModalForm({ bankName: '', bankAccount: '', bankHolder: '' }); setEditingIdx(null); setModalOpen(true); };
  const openEdit = (idx: number) => { setModalForm({ ...envelopes[idx] }); setEditingIdx(idx); setModalOpen(true); setOpenMenuIdx(null); };
  const handleDelete = (idx: number) => { 
    const newEnvelopes = envelopes.filter((_, i) => i !== idx);
    setEnvelopes(newEnvelopes); 
    setOpenMenuIdx(null); 
    saveMutation.mutate(newEnvelopes);
  };

  const handleModalSave = (form: DigitalEnvelope) => {
    let newEnvelopes;
    if (editingIdx === null) {
      newEnvelopes = [...envelopes, form];
    } else {
      newEnvelopes = envelopes.map((e, i) => i === editingIdx ? form : e);
    }
    setEnvelopes(newEnvelopes);
    setModalOpen(false);
    saveMutation.mutate(newEnvelopes);
  };

  const saveMutation = useMutation({
    mutationFn: async (newEnvelopes: DigitalEnvelope[]) => {
      const legacy = newEnvelopes[0] ?? { bankName: '', bankAccount: '', bankHolder: '' };
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankName: legacy.bankName, bankAccount: legacy.bankAccount, bankHolder: legacy.bankHolder, digitalEnvelopes: newEnvelopes }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal menyimpan');
      return data;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['project', projectId] }); toast.success('Data kado & amplop berhasil disimpan!'); },
    onError: (err: Error) => { toast.error(err.message || 'Gagal menyimpan. Coba lagi.'); },
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <button onClick={onBack} className="flex items-center gap-2 text-neutral-600 font-semibold hover:text-neutral-900 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <div className="flex items-center gap-3 text-right">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Kado & Amplop Digital</h2>
              <p className="text-xs text-neutral-500">Kelola nomor rekening atau e-wallet</p>
            </div>
            <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Metode yang diaktifkan!
            </h3>
            <button onClick={openAdd} className="flex items-center gap-1.5 text-[11px] font-bold bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Tambah Rekening
            </button>
          </div>

          {envelopes.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-neutral-200">
              <p className="text-sm text-neutral-400 mb-3">Belum ada rekening atau dompet digital yang ditambahkan.</p>
              <button onClick={openAdd} className="inline-flex items-center gap-1.5 text-xs font-bold bg-black text-white px-4 py-2 rounded-xl hover:bg-neutral-800 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Tambah Sekarang
              </button>
            </div>
          ) : (
            <div className="space-y-2" ref={menuRef}>
              {envelopes.map((env, idx) => {
                const opt = getOption(env.bankName);
                return (
                  <div key={idx} className="flex items-center gap-3 bg-white border border-neutral-100 rounded-2xl px-4 py-3.5 shadow-sm">
                    <GripVertical className="w-4 h-4 text-neutral-300 shrink-0" />
                    <BankLogo name={env.bankName} slug={opt?.slug ?? ''} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-neutral-900">{env.bankName}</p>
                      <p className="text-xs text-neutral-500 font-mono">{env.bankAccount}</p>
                      <p className="text-xs text-neutral-400">{env.bankHolder}</p>
                    </div>
                    <div className="relative shrink-0">
                      <button
                        onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenuIdx === idx && (
                        <div className="absolute right-0 top-10 z-20 bg-white border border-neutral-100 shadow-xl rounded-xl overflow-hidden w-36">
                          <button onClick={() => openEdit(idx)} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button onClick={() => handleDelete(idx)} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" /> Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>


      </div>

      <EnvelopeModal
        open={modalOpen}
        initialForm={modalForm}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        isEdit={editingIdx !== null}
      />
    </>
  );
}
