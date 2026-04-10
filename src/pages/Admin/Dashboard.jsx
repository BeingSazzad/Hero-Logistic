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


           {/* Top Growth Charts Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipment Growth Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Shipment Volume</h3>
                       <p className="hero-metadata text-hero-neutral mt-1">12-Month Performance Trend</p>
                    </div>
                    <div className="relative">
                       <select 
                         value={shipmentYear} 
                         onChange={(e) => setShipmentYear(e.target.value)}
                         className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white transition-all"
                       >
                          <option value="2026">2026 FY</option>
                          <option value="2025">2025 FY</option>
                       </select>
                       <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                 </div>
                 <div className="flex-1 flex items-end gap-1.5 h-32 w-full mb-6 px-1">
                    {[12, 18, 15, 22, 28, 25, 32, 38, 45, 42, 48, 55].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 group cursor-pointer">
                         <div className="w-full bg-blue-50 rounded-t-sm group-hover:bg-brand transition-all relative" style={{ height: `${(v/60)*100}%` }}>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                               {v}k
                            </div>
                         </div>
                         <span className="text-[7px] font-bold text-gray-400 text-center uppercase">
                           {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                         </span>
                      </div>
                    ))}
                 </div>
                 <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Yearly Total</p>
                       <p className="text-md font-black text-hero-dark">342.5k <span className="text-[9px] text-hero-success">↑ 12%</span></p>
                    </div>
                 </div>
              </div>

              {/* Financial Revenue Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-hidden flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Financial Revenue</h3>
                       <p className="hero-metadata text-hero-neutral mt-1">12-Month Revenue Pulse</p>
                    </div>
                    <div className="relative">
                       <select 
                         value={revenueYear} 
                         onChange={(e) => setRevenueYear(e.target.value)}
                         className="appearance-none bg-emerald-50/50 border border-emerald-100 rounded-lg pl-3 pr-8 py-1.5 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white transition-all"
                       >
                          <option value="2026">2026 FY</option>
                          <option value="2025">2025 FY</option>
                       </select>
                       <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none"/>
                    </div>
                 </div>
                 <div className="flex-1 flex items-end gap-1.5 h-32 w-full mb-6 px-1">
                    {[140, 165, 155, 180, 210, 195, 230, 250, 280, 265, 305, 342].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 group cursor-pointer">
                         <div className="w-full bg-emerald-50 rounded-t-sm group-hover:bg-emerald-500 transition-all relative" style={{ height: `${(v/380)*100}%` }}>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                               ${v}k
                            </div>
                         </div>
                         <span className="text-[7px] font-bold text-gray-400 text-center uppercase">
                           {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                         </span>
                      </div>
                    ))}
                 </div>
                 <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Net Earnings</p>
                       <p className="text-md font-black text-emerald-600">$2.84M <span className="text-[9px] text-emerald-500">↑ 18%</span></p>
                    </div>
                 </div>
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
