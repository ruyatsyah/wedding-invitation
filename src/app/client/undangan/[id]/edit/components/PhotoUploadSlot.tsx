import React, { useRef } from 'react';
import { Camera, X, ImagePlus } from 'lucide-react';

interface PhotoUploadSlotProps {
  label?: string;
  slot: string;
  currentUrl: string;
  isUploading: boolean;
  onUpload: (slot: string, file: File) => void;
  onRemove: () => void;
  shape?: 'circle' | 'square';
  className?: string;
}

export default function PhotoUploadSlot({
  label,
  slot,
  currentUrl,
  isUploading,
  onUpload,
  onRemove,
  shape = 'square',
  className = '',
}: PhotoUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const isCircle = shape === 'circle';
  const shapeClass = isCircle ? 'rounded-full aspect-square w-28 h-28' : 'rounded-xl aspect-square w-full h-full min-h-[120px]';

  return (
    <div className={`flex flex-col ${isCircle ? 'items-center' : ''} gap-2 ${className}`}>
      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        className={`relative ${shapeClass} overflow-hidden border-2 border-dashed border-neutral-300 bg-neutral-50 cursor-pointer hover:border-neutral-600 transition-colors group flex items-center justify-center`}
      >
        {currentUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentUrl} alt={label || 'Photo'} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
              {!isCircle && <span className="text-white text-[10px] font-semibold">Ganti</span>}
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
              title="Hapus"
            >
              <X className="w-3 h-3" />
            </button>
            {label && !isCircle && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 py-1 text-center">
                <span className="text-white text-[10px] font-semibold">{label}</span>
              </div>
            )}
          </>
        ) : isUploading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <svg className="animate-spin w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {!isCircle && <span className="text-[10px] text-neutral-500 font-medium">Upload...</span>}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 text-neutral-400 p-2 text-center">
            {isCircle ? <Camera className="w-6 h-6" /> : <ImagePlus className="w-6 h-6" />}
            <span className="text-[10px] font-semibold leading-tight">{isCircle ? 'Upload' : label || 'Upload Foto'}</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(slot, file);
            e.target.value = '';
          }}
          disabled={isUploading}
        />
      </div>
      {label && isCircle && <span className="text-xs font-medium text-neutral-500">{label}</span>}
    </div>
  );
}
