import React from 'react';

interface MenuCardProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isWide?: boolean;
  badge?: string;
}

export default function MenuCard({ icon, label, onClick, isWide, badge }: MenuCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-2 sm:p-4 bg-[#000000] text-white rounded-xl hover:bg-[#171717] transition-all shadow-md group ${
        isWide ? 'col-span-3 flex-row gap-2 sm:gap-4 py-4 sm:py-6' : 'aspect-square'
      }`}
    >
      {badge && (
        <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-emerald-500 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
          {badge}
        </span>
      )}
      <div className={`text-white transition-transform group-hover:scale-110 ${isWide ? '' : 'mb-1 sm:mb-3'}`}>
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight">{label}</span>
    </button>
  );
}
