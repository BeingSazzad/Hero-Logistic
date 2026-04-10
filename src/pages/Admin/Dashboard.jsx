import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, 
  Building2, UserCog, Briefcase, AlertTriangle, Blocks,
  Plus, ChevronDown, Activity, Globe, ShieldAlert, Zap,
  Navigation, CheckCircle, Smartphone, ExternalLink, Filter,
  Clock, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [shipmentYear, setShipmentYear] = useState('2026');
  const [revenueYear, setRevenueYear] = useState('2026');

  const recentActivities = [
    { id: 'SHP-9042', action: 'Delivery Completed', user: 'Jack Taylor', time: '12 mins ago', status: 'Success' },
    { id: 'SHP-9041', action: 'Route Optimized', user: 'Sarah Mitchell', time: '1 hr ago', status: 'System' },
    { id: 'SHP-9039', action: 'Override Executed', user: 'Liam Smith', time: '2 hrs ago', status: 'Warning' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-hero-sm text-hero-dark shadow-sm">
            <Blocks size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Main Dashboard</h1>
            <p className="hero-body mt-1">Overview of your branch performance and delivery activity.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/shipments')} 
            className="btn btn-primary"
          >
            <Plus size={16} strokeWidth={3} /> Shipments Queue
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 mb-6"></div>

      {/* ── KPI HUD ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        {[
          { label: 'Active Shipments', value: '428', trend: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Network Drivers', value: '142', trend: 'Live', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Operational Alerts', value: '03', trend: 'Critical', icon: ShieldAlert, color: 'text-hero-danger', bg: 'bg-hero-danger/10' },
          { label: 'Active Branches', value: '03', trend: 'Global', icon: Globe, color: 'text-hero-success', bg: 'bg-hero-success/10' },
        ].map((kpi, i) => (
          <div key={i} className="card p-5 flex items-center justify-between group hover:border-brand/40">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="hero-metadata leading-none text-hero-neutral">{kpi.label}</p>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-hero-sm uppercase tracking-widest ${kpi.bg} ${kpi.color}`}>{kpi.trend}</span>
              </div>
              <p className="text-3xl font-black text-hero-dark leading-none">{kpi.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-hero-sm flex items-center justify-center ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
              <kpi.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        
        {/* Dashboard Intelligence (Pro Solution) */}
        <div className="lg:col-span-2 space-y-6">


           {/* Revenue & Metrics Overview */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue Pulse (Now more compact) */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm overflow-hidden relative flex flex-col justify-between">
                 <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Revenue Growth</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight mt-1">Global Network Trends</p>
                    </div>
                    <TrendingUp size={14} className="text-hero-success"/>
                 </div>

                 <div className="w-full">
                    <div className="flex items-end gap-1 h-24 w-full mb-4 px-1">
                       {[40, 65, 45, 80, 55, 90, 70, 100, 85, 120, 95, 140, 110, 150].map((h, i) => (
                         <div key={i} className="flex-1 bg-blue-50/50 rounded-t-sm relative group cursor-pointer hover:bg-brand transition-colors" style={{ height: `${(h/220)*100}%` }}>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all z-20">
                              ${h}k
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-lg font-black text-hero-dark">$2.42M</span>
                    <span className="text-[9px] font-black text-hero-success uppercase">+18.4%</span>
                 </div>
              </div>

              {/* Performance Health (Fill the grid) */}
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Avg Delivery Time', val: '42m', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                   { label: 'Fleet Reliability', val: '98%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                   { label: 'Customer Rating',  val: '4.9',  icon: Zap,        color: 'text-amber-500', bg: 'bg-amber-50' },
                   { label: 'Return Rate',      val: '0.4%', icon: ArrowUpRight, color: 'text-hero-neutral', bg: 'bg-gray-50' },
                 ].map((stat, i) => (
                   <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between group hover:border-brand/40 transition-all">
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}>
                         <stat.icon size={14}/>
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                         <p className="text-lg font-black text-hero-dark mt-0.5">{stat.val}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Shipment Velocity (Full width card under the top 2) */}
           <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Network Shipment Velocity</h3>
                    <p className="hero-metadata text-hero-neutral mt-1">Real-time throughput across all active transit nodes</p>
                 </div>
                 <button className="text-[9px] font-black text-gray-500 hover:text-black uppercase tracking-widest border border-gray-200 px-3 py-1.5 rounded-xl">Generate PDF Report</button>
              </div>
              <div className="flex items-end gap-1.5 h-32 w-full">
                 {[120, 150, 130, 220, 175, 200, 180, 240, 210, 230, 250, 220, 190, 260, 240, 280, 265, 300, 280, 320, 290, 310, 330, 310, 340].map((h, i) => (
                   <div key={i} className="flex-1 bg-gray-50 rounded-t-sm relative group cursor-pointer hover:bg-emerald-500 transition-colors" style={{ height: `${(h/340)*100}%` }}></div>
                 ))}
              </div>
           </div>
        </div>

        {/* Operational Status & Shortcuts (Pro Sidebar) */}
        <div className="space-y-6">
           
           {/* Shortcuts Card */}
           <div className="bg-[#111] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#FFCC00]/20 transition-all"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-[#FFCC00] flex items-center gap-2">
                  <Zap size={14} fill="#FFCC00"/> Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-3 relative z-10">
                 {[
                    { label: 'View Shipments', path: '/admin/shipments', icon: Plus },
                   { label: 'View Fleet', path: '/admin/fleet', icon: Truck },
                   { label: 'Manage Staff', path: '/admin/users', icon: UserCog },
                   { label: 'Global Settings', path: '/admin/settings', icon: Globe },
                 ].map((btn, i) => (
                   <button 
                     key={i}
                     onClick={() => navigate(btn.path)}
                     className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FFCC00] hover:text-black transition-all group/btn"
                   >
                     <div className="flex items-center gap-3">
                        <btn.icon size={16} className="text-[#FFCC00] group-hover/btn:text-black"/>
                        <span className="text-[11px] font-black uppercase tracking-widest">{btn.label}</span>
                     </div>
                     <ChevronDown size={14} className="-rotate-90 opacity-40 group-hover/btn:opacity-100"/>
                   </button>
                 ))}
              </div>
           </div>

           {/* Live Operational Feed */}
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
                 <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Smartphone size={14} className="text-blue-500"/> Real-time Activity
                 </h3>
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="p-2 max-h-[480px] overflow-y-auto">
                 {recentActivities.map((act, i) => (
                   <div key={i} className="p-4 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] font-black text-[#FFCC00] bg-black px-2 py-0.5 rounded uppercase tracking-widest">{act.id}</span>
                         <span className="text-[9px] font-bold text-gray-400 uppercase">{act.time}</span>
                      </div>
                      <p className="text-[11px] font-bold text-gray-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors">{act.action}</p>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center font-black text-[8px] text-gray-600">
                            {act.user.split(' ').map(n=>n[0]).join('')}
                         </div>
                         <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{act.user}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-4 border-t border-gray-50 text-center">
                 <button className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Launch System Audit Log →</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
