import React from 'react';
import MenuCard from './MenuCard';
import { 
  Users, Palette, Calendar, Image as ImageIcon, Music, MessageSquare, 
  Gift, MailCheck, MonitorPlay, Heart, Camera, Quote, 
  Settings, BookOpen, Send, CalendarCheck
} from 'lucide-react';

interface MenuGridProps {
  onMenuClick: (id: string) => void;
  projectId?: string;
}

const iconClasses = "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.5]";

const menuItems = [
  { id: 'pengantin', label: 'Pengantin', icon: <Users className={iconClasses} /> },
  { id: 'tema', label: 'Tema', icon: <Palette className={iconClasses} /> },
  { id: 'acara', label: 'Acara', icon: <Calendar className={iconClasses} /> },
  { id: 'galeri', label: 'Galeri', icon: <ImageIcon className={iconClasses} /> },
  { id: 'musik', label: 'Musik', icon: <Music className={iconClasses} /> },
  { id: 'ucapan', label: 'Ucapan', icon: <MessageSquare className={iconClasses} /> },
  { id: 'kado', label: 'Kado', icon: <Gift className={iconClasses} /> },
  { id: 'rsvp', label: 'RSVP', icon: <MailCheck className={iconClasses} /> },
  { id: 'streaming', label: 'Streaming', icon: <MonitorPlay className={iconClasses} /> },
  { id: 'kisah_cinta', label: 'Kisah Cinta', icon: <Heart className={iconClasses} /> },
  { id: 'story_ig', label: 'Story IG', icon: <Camera className={iconClasses} /> },
  { id: 'quote', label: 'Quote', icon: <Quote className={iconClasses} /> },
  { id: 'pengaturan', label: 'Setting', icon: <Settings className={iconClasses} /> },
  { id: 'buku_tamu', label: 'Buku Tamu', icon: <BookOpen className={iconClasses} /> },
  { id: 'kirim', label: 'Kirim', icon: <Send className={`${iconClasses} text-amber-400`} /> },
  { 
    id: 'event_planner', 
    label: 'Planner', 
    icon: <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[1.5]" />, 
    isWide: true,
    badge: 'New Feature | Trial'
  },
];

export default function MenuGrid({ onMenuClick, projectId }: MenuGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4 w-full">
      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          icon={item.icon}
          label={item.label}
          isWide={item.isWide}
          badge={item.badge}
          onClick={() => {
            if ((item as any).isExternal && projectId) {
              window.open(`/client/undangan/${projectId}/penerima-tamu`, '_blank');
            } else {
              onMenuClick(item.id);
            }
          }}
        />
      ))}
    </div>
  );
}
