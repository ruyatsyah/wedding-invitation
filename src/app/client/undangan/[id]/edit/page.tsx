'use client';

import { useState } from 'react';
import { 
  Bell, UserCircle, Save, Link as LinkIcon, Heart, CalendarDays, 
  ImagePlus, ListChecks, Lock, User, MapPin, Camera, X, Music, 
  CalendarCheck, BookOpen, Wallet
} from 'lucide-react';
import Image from 'next/image';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('link');

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f9f9fc] text-slate-800 relative z-0">
      {/* Top App Bar specific to Editor */}
      <header className="sticky top-0 z-40 flex flex-col w-full bg-[#f3f3f6] border-b border-[#ddbfc4] shadow-sm">
        <div className="flex items-center justify-between px-8 h-16">
          <div className="flex gap-6 items-center">
            <button className="text-[#6b002c] font-semibold border-b-2 border-[#6b002c] pb-1 text-sm">Link Settings</button>
            <button className="text-slate-500 hover:text-[#8d1a42] transition-all duration-300 text-sm">Content Editor</button>
            <button className="text-slate-500 hover:text-[#8d1a42] transition-all duration-300 text-sm">Guest Management</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 mr-4">
              <button className="px-4 py-1.5 border border-[#8a7175] text-slate-800 font-medium rounded-lg text-sm hover:bg-[#e8e8ea] transition-colors">Preview</button>
              <button className="px-4 py-1.5 bg-[#8d1a42] text-white font-semibold rounded-lg text-sm shadow-md active:opacity-80 transition-all">Publish</button>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-500 cursor-pointer hover:text-[#6b002c] transition-colors" />
              <UserCircle className="w-5 h-5 text-slate-500 cursor-pointer hover:text-[#6b002c] transition-colors" />
            </div>
          </div>
        </div>
        {/* New Top Sub-Navigation Bar */}
        <div className="flex px-8 bg-white border-t border-[#ddbfc4]/30">
          <div className="flex items-center gap-8">
            <button className="py-3 border-b-2 border-[#6b002c] text-[#6b002c] font-semibold text-sm">Invitation Editor</button>
            <button className="py-3 border-b-2 border-transparent text-slate-500 hover:text-[#6b002c] transition-colors font-medium text-sm">Guest List</button>
            <button className="py-3 border-b-2 border-transparent text-slate-500 hover:text-[#6b002c] transition-colors font-medium text-sm">WhatsApp Blast</button>
            <button className="py-3 border-b-2 border-transparent text-slate-500 hover:text-[#6b002c] transition-colors font-medium text-sm">RSVP Analytics</button>
          </div>
        </div>
      </header>

      {/* Editor Content Canvas */}
      <div className="p-8 flex-1">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Invitation Editor</h2>
              <p className="text-base text-slate-500 mt-1">Refine the details of your special day. Changes are saved automatically as drafts.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#ddbfc4] rounded-xl text-[#6b002c] font-semibold shadow-sm hover:bg-[#f3f3f6] transition-all">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Bento Style Tabs Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Tab Navigation Column */}
            <div className="col-span-12 lg:col-span-3 space-y-2">
              {[
                { id: 'link', icon: LinkIcon, title: 'Pengaturan Link', desc: 'URL & Subdomain' },
                { id: 'data', icon: Heart, title: 'Data Mempelai', desc: 'Names & Photos' },
                { id: 'info', icon: CalendarDays, title: 'Informasi Acara', desc: 'Date, Time & Location' },
                { id: 'media', icon: ImagePlus, title: 'Media', desc: 'Gallery & Music' },
                { id: 'fitur', icon: ListChecks, title: 'Fitur Tambahan', desc: 'RSVP & Guestbook' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all shadow-sm border ${
                    activeTab === tab.id 
                      ? 'border-[#6b002c] bg-[#ffd9df]/20' 
                      : 'border-[#ddbfc4] bg-white hover:border-[#6b002c] group'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-[#6b002c] text-white' 
                      : 'bg-[#6b002c]/5 text-[#6b002c] group-hover:bg-[#6b002c] group-hover:text-white'
                  }`}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{tab.title}</p>
                    <p className="text-xs text-slate-500">{tab.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Editor Content View */}
            <div className="col-span-12 lg:col-span-9">
              <div className="bg-white rounded-xl border border-[#ddbfc4] shadow-sm p-6 min-h-[600px] relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b002c]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                
                {/* Tab 1: Link Settings */}
                {activeTab === 'link' && (
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-[#ddbfc4] pb-4">
                      <h3 className="text-xl font-semibold text-[#6b002c]">Pengaturan Link</h3>
                      <p className="text-sm text-slate-500 mt-1">Custom your invitation address. Once published, this cannot be changed easily.</p>
                    </div>
                    <div className="max-w-xl space-y-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-slate-800">Subdomain Input</label>
                        <div className="flex">
                          <div className="flex items-center px-4 bg-[#e8e8ea] border border-r-0 border-[#ddbfc4] rounded-l-lg text-slate-500 font-medium">vestainvite.com/</div>
                          <input 
                            disabled
                            className="flex-1 border border-[#ddbfc4] rounded-r-lg px-4 py-2.5 outline-none bg-slate-50 text-slate-500" 
                            type="text" 
                            value="adrian-and-sarah" 
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-[#6b002c] bg-[#6b002c]/5 p-3 rounded-lg border border-[#6b002c]/20">
                          <Lock className="w-4 h-4" />
                          <p className="text-xs font-medium">Your invitation is already published. Subdomain editing is locked to preserve your share links.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Data Mempelai */}
                {activeTab === 'data' && (
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-[#ddbfc4] pb-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-[#6b002c]">Data Mempelai</h3>
                        <p className="text-sm text-slate-500 mt-1">Enter the identities for both bride and groom.</p>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Groom */}
                      <div className="space-y-4 p-4 bg-[#f3f3f6] rounded-xl border border-[#ddbfc4]/50">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <User className="w-5 h-5 text-[#6b002c]" /> Groom's Details
                        </h4>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" type="text" defaultValue="Adrian Wijaya"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Parents Name</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" placeholder="Putra dari Bpk. X & Ibu Y" type="text"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Instagram Username</label>
                          <div className="flex">
                            <span className="px-3 flex items-center border border-r-0 border-[#ddbfc4] rounded-l-lg bg-white text-slate-500">@</span>
                            <input className="flex-1 border border-[#ddbfc4] rounded-r-lg px-4 py-2 outline-none focus:border-[#6b002c]" type="text" defaultValue="adrian_w"/>
                          </div>
                        </div>
                      </div>
                      {/* Bride */}
                      <div className="space-y-4 p-4 bg-[#f3f3f6] rounded-xl border border-[#ddbfc4]/50">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <User className="w-5 h-5 text-[#6b002c]" /> Bride's Details
                        </h4>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" type="text" defaultValue="Sarah Lestari"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Parents Name</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" placeholder="Putri dari Bpk. A & Ibu B" type="text"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Instagram Username</label>
                          <div className="flex">
                            <span className="px-3 flex items-center border border-r-0 border-[#ddbfc4] rounded-l-lg bg-white text-slate-500">@</span>
                            <input className="flex-1 border border-[#ddbfc4] rounded-r-lg px-4 py-2 outline-none focus:border-[#6b002c]" type="text" defaultValue="s_lestari"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Informasi Acara */}
                {activeTab === 'info' && (
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-[#ddbfc4] pb-4">
                      <h3 className="text-xl font-semibold text-[#6b002c]">Informasi Acara</h3>
                      <p className="text-sm text-slate-500 mt-1">Schedule and physical locations for your event milestones.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" type="date" defaultValue="2024-12-25"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Time</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" type="time" defaultValue="09:00"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Timezone</label>
                          <select className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]">
                            <option>WIB (GMT+7)</option>
                            <option>WITA (GMT+8)</option>
                            <option>WIT (GMT+9)</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Google Maps URL</label>
                        <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" placeholder="Paste Google Maps Link here..." type="text"/>
                        <div className="w-full h-48 bg-[#e8e8ea] rounded-lg border border-[#ddbfc4] flex items-center justify-center overflow-hidden relative">
                          <div className="absolute flex flex-col items-center pointer-events-none">
                            <MapPin className="text-[#6b002c] w-8 h-8 mb-1" />
                            <span className="text-xs font-bold text-[#6b002c] bg-white px-2 py-1 rounded shadow-sm">Map Preview</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Media */}
                {activeTab === 'media' && (
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-[#ddbfc4] pb-4">
                      <h3 className="text-xl font-semibold text-[#6b002c]">Media</h3>
                      <p className="text-sm text-slate-500 mt-1">Enhance the experience with visuals and background music.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Gallery Uploads (Max 10 Photos)</label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="aspect-square bg-[#e8e8ea] rounded-lg border-2 border-dashed border-[#ddbfc4] flex items-center justify-center hover:border-[#6b002c] transition-colors cursor-pointer group">
                            <Camera className="w-6 h-6 text-slate-500 group-hover:text-[#6b002c]" />
                          </div>
                          <div className="aspect-square bg-slate-300 rounded-lg border border-[#ddbfc4] overflow-hidden relative group">
                            <button className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="aspect-square bg-slate-300 rounded-lg border border-[#ddbfc4] overflow-hidden relative group">
                            <button className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">YouTube Video Link</label>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" placeholder="https://youtube.com/watch?v=..." type="text"/>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Background Music Choice</label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 bg-[#f9f9fc] border border-[#ddbfc4] rounded-lg cursor-pointer hover:border-[#6b002c] transition-all">
                              <input className="accent-[#6b002c]" name="music" type="radio"/>
                              <Music className="w-5 h-5 text-slate-500" />
                              <span className="flex-1 font-medium text-sm">Romantic Piano Sonata</span>
                              <span className="text-xs text-slate-500">03:45</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 bg-[#f9f9fc] border border-[#ddbfc4] rounded-lg cursor-pointer hover:border-[#6b002c] transition-all">
                              <input className="accent-[#6b002c]" name="music" type="radio"/>
                              <Music className="w-5 h-5 text-slate-500" />
                              <span className="flex-1 font-medium text-sm">Classic Acoustic Guitar</span>
                              <span className="text-xs text-slate-500">04:12</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Fitur Tambahan */}
                {activeTab === 'fitur' && (
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-[#ddbfc4] pb-4">
                      <h3 className="text-xl font-semibold text-[#6b002c]">Fitur Tambahan</h3>
                      <p className="text-sm text-slate-500 mt-1">Manage guest interactions and digital gifting options.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[#f3f3f6] border border-[#ddbfc4] rounded-xl">
                          <div className="flex items-center gap-3">
                            <CalendarCheck className="w-5 h-5 text-[#6b002c]" />
                            <div>
                              <p className="font-bold text-sm">RSVP Management</p>
                              <p className="text-xs text-slate-500">Enable guests to confirm attendance</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input defaultChecked type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-[#e8e8ea] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6b002c]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#f3f3f6] border border-[#ddbfc4] rounded-xl">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-[#6b002c]" />
                            <div>
                              <p className="font-bold text-sm">Digital Guestbook</p>
                              <p className="text-xs text-slate-500">Allow guests to leave messages</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input defaultChecked type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-[#e8e8ea] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6b002c]"></div>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-4 p-4 bg-[#f9f9fc] border border-[#ddbfc4] rounded-xl">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-[#6b002c]" /> Digital Gifting (Angpao)
                        </h4>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">E-Wallet / Bank Info</label>
                          <div className="flex gap-2">
                            <select className="w-1/3 border border-[#ddbfc4] rounded-lg px-2 py-2 outline-none focus:border-[#6b002c]">
                              <option>Bank BCA</option>
                              <option>Bank Mandiri</option>
                              <option>GoPay</option>
                              <option>OVO</option>
                            </select>
                            <input className="flex-1 border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" placeholder="Account Number" type="text"/>
                          </div>
                          <input className="w-full border border-[#ddbfc4] rounded-lg px-4 py-2 outline-none focus:border-[#6b002c]" placeholder="Account Holder Name" type="text"/>
                        </div>
                        <button className="w-full py-2 border border-[#6b002c] text-[#6b002c] font-semibold rounded-lg hover:bg-[#6b002c]/5 transition-colors">
                          + Add Another Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
