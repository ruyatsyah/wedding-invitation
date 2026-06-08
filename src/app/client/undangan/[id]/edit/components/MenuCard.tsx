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
      className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2 bg-[#000000] text-white rounded-xl hover:bg-[#171717] transition-all shadow-md group ${
        isWide ? 'col-span-full flex-row gap-3 py-2.5 sm:py-3' : 'aspect-square'
      }`}
    >
      {badge && (
        <span className="absolute top-1 right-1 md:top-2 md:right-2 bg-emerald-500 text-white text-[7px] md:text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm z-10">
          {badge}
        </span>
      )}
      <div className={`text-white transition-transform group-hover:scale-110 ${isWide ? '' : 'mb-1 sm:mb-1.5'}`}>
        {icon}
      </div>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight px-0 sm:px-0.5 max-w-full overflow-hidden text-ellipsis">{label}</span>
    </button>
  );
}
