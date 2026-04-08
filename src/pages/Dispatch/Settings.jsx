import React, { useState } from 'react';
import { 
  User, Mail, Building2, Lock, Save, Camera, 
  Bell, Globe, Shield, LogOut, ChevronRight,
  Settings, UserCircle, Key
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { id: 'profile', label: 'My Account', icon: UserCircle, desc: 'Personal details and hub info' },
  { id: 'security', label: 'Security', icon: Lock, desc: 'Passwords and 2FA' },
  { id: 'preferences', label: 'Preferences', icon: Settings, desc: 'Theme and terminal alerts' },
];

export default function DispatchSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* ── 1. Standardized Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Configure your operator profile and terminal preferences</p>
          </div>
        </div>
        <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 group">
          <Save size={18} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" /> Save All Changes
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="flex flex-col lg:flex-row gap-8 items-start px-2">
        
        {/* ── 2. Premium Sidebar Nav ── */}
        <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all border text-left ${
                activeTab === tab.id
                  ? 'bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-gray-900 border-gray-100'
                  : 'text-gray-500 hover:bg-white hover:text-gray-900 border-transparent hover:border-gray-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${activeTab === tab.id ? 'bg-[#FFCC00] text-black' : 'bg-gray-100 text-gray-400'}`}>
                 <tab.icon size={20} strokeWidth={2}/>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[13px] tracking-tight">{tab.label}</p>
                <p className="text-[10px] text-gray-400 font-medium truncate">{tab.desc}</p>
              </div>
            </button>
          ))}
          
          <div className="mt-6 p-5 bg-red-50/50 rounded-2xl border border-red-100 group cursor-pointer hover:bg-red-50 transition-all flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm border border-red-50">
               <LogOut size={18} />
            </div>
            <div>
               <p className="text-[12px] font-bold text-red-600">Secure Logout</p>
               <p className="text-[10px] text-red-400 font-medium">End active session</p>
            </div>
          </div>
        </div>

        {/* ── 3. Optimized Content Area ── */}
        <div className="flex-1 w-full flex flex-col gap-6">

          {/* Tab: My Account */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
              
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                  <h3 className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.2em]">Operator Identity</h3>
                </div>
                <div className="p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white to-gray-50/30">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl bg-[#111] flex items-center justify-center text-[#FFCC00] text-3xl font-black shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-500">
                      {user.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-lg shadow-xl border border-gray-100 text-gray-900">
                      <Camera size={14} />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{user.name}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                       <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-md uppercase tracking-widest border border-gray-200/50">{user.role}</span>
                       <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md uppercase tracking-widest border border-emerald-100">Live Status</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                  <h3 className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.2em]">Credential & Access</h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Login Handle</label>
                    <div className="relative">
                      <input type="text" defaultValue={user.name} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] outline-none transition-all shadow-sm pl-11" />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Primary Email</label>
                    <div className="relative">
                      <input type="email" defaultValue={user.email} readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-400 cursor-not-allowed outline-none pl-11 shadow-inner" />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    </div>
                  </div>
                  <div className="md:col-span-2 pt-4 border-t border-gray-100 mt-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4 ml-1">Assigned Operational Hub</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-[#111] p-5 rounded-2xl border border-gray-800 flex items-center gap-5 relative overflow-hidden group shadow-xl">
                          <div className="absolute right-0 top-0 w-24 h-24 bg-[#FFCC00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FFCC00]/10 transition-colors"></div>
                          <div className="w-12 h-12 bg-[#FFCC00] rounded-xl flex items-center justify-center text-black shrink-0 shadow-[0_0_20px_rgba(255,204,0,0.3)]">
                             <Building2 size={24} />
                          </div>
                          <div className="min-w-0">
                             <p className="text-white text-base font-black tracking-tight leading-none mb-1">{user.branchName}</p>
                             <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{user.branchId} • Main Depot</p>
                          </div>
                       </div>
                       <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col justify-center">
                          <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">"Branch location is locked to your dispatcher license. For inter-hub duty, please submit a transfer request."</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Security */}
          {activeTab === 'security' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
               <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">Credential Rotation</h4>
                </div>
                <div className="p-8 space-y-6 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block px-1">Active Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block px-1">New Terminal Key</label>
                      <input type="password" placeholder="Min. 8 chars" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block px-1">Confirm Key</label>
                      <input type="password" placeholder="Confirm" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] outline-none transition-all" />
                    </div>
                  </div>
                  <button className="bg-[#111] hover:bg-black text-[#FFCC00] px-8 py-3.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    <Shield size={16} /> Update Security Profile
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
                 <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#FFCC00] shadow-inner">
                       <Key size={32} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                       <h5 className="text-lg font-black tracking-tight mb-1">Two-Factor Authentication</h5>
                       <p className="text-gray-400 text-sm font-medium">Add a secondary verification layer for high-priority terminal actions.</p>
                       <div className="flex gap-4 mt-6">
                          <button className="bg-[#FFCC00] text-black px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-yellow-500 transition-all">Enable 2FA</button>
                          <button className="bg-white/5 text-white border border-white/10 px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Learn More</button>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Tab: Preferences */}
          {activeTab === 'preferences' && (
             <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
                <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden font-bold">
                   <div className="p-5 border-b border-gray-100 bg-[#FAFAFA]">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">Terminal Alerting</h4>
                   </div>
                   <div className="p-4 space-y-2">
                      {[
                        { label: 'Real-time GPS movement sound alerts', val: true, icon: Bell },
                        { label: 'Critical breakdown / Delay SMS alerts', val: true, icon: AlertTriangle },
                        { label: 'Driver "New Message" desktop notifications', val: true, icon: Mail },
                        { label: 'High-density table layout mode', val: true, icon: Globe },
                        { label: 'Daily operational summary PDF to email', val: false, icon: Save }
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:bg-gray-50/50 transition-all border-l-4 border-l-transparent hover:border-l-[#FFCC00]">
                           <div className="flex items-center gap-4">
                              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                 <s.icon size={16} className="text-gray-400" />
                              </div>
                              <span className="text-sm font-bold text-gray-700">{s.label}</span>
                           </div>
                           <input type="checkbox" defaultChecked={s.val} className="w-5 h-5 accent-[#FFCC00]" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
