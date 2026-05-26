import React from 'react';
import MenuCard from './MenuCard';
import { 
  Users, Palette, Calendar, Image as ImageIcon, Music, MessageSquare, 
  Gift, MailCheck, MonitorPlay, Heart, Camera, Quote, 
  Settings, BookOpen, Send, CalendarCheck
} from 'lucide-react';

interface MenuGridProps {
  onMenuClick: (id: string) => void;
}

const iconClasses = "w-6 h-6 sm:w-8 sm:h-8 stroke-1";

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
  { id: 'setting', label: 'Setting', icon: <Settings className={iconClasses} /> },
  { id: 'buku_tamu', label: 'Buku Tamu', icon: <BookOpen className={iconClasses} /> },
  { id: 'kirim', label: 'Kirim', icon: <Send className={`${iconClasses} text-amber-400`} /> },
  { 
    id: 'event_planner', 
    label: 'Event Planner', 
    icon: <CalendarCheck className="w-8 h-8 sm:w-10 sm:h-10 stroke-1" />, 
    isWide: true,
    badge: 'New Feature | Trial'
  },
];

export default function MenuGrid({ onMenuClick }: MenuGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          icon={item.icon}
          label={item.label}
          isWide={item.isWide}
          badge={item.badge}
          onClick={() => onMenuClick(item.id)}
        />
      ))}
    </div>
  );
}
