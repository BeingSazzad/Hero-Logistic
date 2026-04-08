import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Truck, Package, MapPin, TrendingUp, ArrowUpRight, 
  Building2, UserCog, Briefcase, AlertTriangle, Blocks,
  Plus, ChevronDown
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
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Updated Header - Matching Reference Style */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Super Admin Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Company-wide overview of operations, network topology, and financial growth.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/dispatch/jobs/create')} 
            className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus size={18} strokeWidth={3} /> New Shipment
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI HUD - Unified Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
        {[
          { label: 'Active Shipments', value: '42', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Drivers', value: '142', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Network Nodes', value: '3', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{kpi.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Growth Charts - Clean Card Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Yearly Revenue Growth</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Target: $2.5M YTD</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                 {revenueYear} <ChevronDown size={14} />
              </button>
           </div>
           
           <div className="h-48 flex items-end gap-2 group">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-3">
                   <div className="w-full bg-emerald-50 rounded-t-md relative group/bar cursor-pointer overflow-hidden border border-emerald-50" style={{ height: `${20 + (i*5)}%` }}>
                      <div className="absolute inset-x-0 bottom-0 bg-emerald-500 transition-all duration-500 h-full opacity-20 group-hover/bar:opacity-100"></div>
                   </div>
                   <span className="text-[9px] font-bold text-gray-400 uppercase">{m}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Shipment Volume</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Total Manifests Processed</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                 {shipmentYear} <ChevronDown size={14} />
              </button>
           </div>
           
           <div className="h-48 flex items-end gap-2">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-3">
                   <div className="w-full bg-gray-50 rounded-t-md relative group/bar cursor-pointer overflow-hidden border border-gray-100" style={{ height: `${60 - (i*2)}%` }}>
                      <div className="absolute inset-x-0 bottom-0 bg-gray-900 transition-all duration-500 h-full opacity-10 group-hover/bar:opacity-100"></div>
                   </div>
                   <span className="text-[9px] font-bold text-gray-400 uppercase">{m}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Activity Table - Unified Management Look */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mx-2">
        <div className="px-6 py-4 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Global Platform Activity</h3>
            <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Full Audit Log →</button>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
               <tr>
                 <th className="px-6 py-3">Reference</th>
                 <th className="px-6 py-3">Event Description</th>
                 <th className="px-6 py-3">Operator</th>
                 <th className="px-6 py-3 text-right">Timestamp</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {recentActivities.map(act => (
                 <tr className="hover:bg-gray-50/50 transition-all" key={act.id}>
                   <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-xs tracking-tight">{act.id}</div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-700">{act.action}</div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">{act.user[0]}</div>
                        {act.user}
                      </div>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{act.time}</span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
