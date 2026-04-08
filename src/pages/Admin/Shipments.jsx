import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Filter, Plus, Clock, CheckCircle2, AlertTriangle, Truck, ArrowDownUp, MapPin, ChevronDown } from 'lucide-react';

export default function AdminShipments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const rawShipments = [
    { id: 'SHP-9042', origin: 'Sydney Central Hub', dest: 'Melbourne North Hub', customer: 'Acme Corp Logistics', status: 'In Transit', progress: 45, type: 'FTL', driver: 'Jack Taylor', est: 'Today 4:00 PM' },
    { id: 'SHP-9041', origin: 'Port Botany', dest: 'Penrith Drop', customer: 'Tech Solutions Ltd', status: 'At Pickup', progress: 15, type: 'LTL', driver: 'Sarah Mitchell', est: 'Today 6:30 PM' },
    { id: 'SHP-9039', origin: 'Brisbane Port Facility', dest: 'Gold Coast DC', customer: 'Global Traders Australia', status: 'Exception', progress: 60, type: 'Express', driver: 'Liam Smith', est: 'Delayed' },
    { id: 'SHP-9035', origin: 'Adelaide Depot', dest: 'Sydney Central Hub', customer: 'Acme Corp Logistics', status: 'Delivered', progress: 100, type: 'FTL', driver: 'Noah Williams', est: 'Completed' }
  ];

  const filteredShipments = useMemo(() => {
    return rawShipments.filter(shp => {
      const searchStr = `${shp.id} ${shp.customer} ${shp.origin} ${shp.dest} ${shp.driver}`.toLowerCase();
      return searchStr.includes(search.toLowerCase());
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [search, sortKey, sortOrder]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Updated Header - Matching Reference Style */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Active Shipments</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time status tracking and lifecycle management for all active freight.</p>
        </div>
        <button 
          onClick={() => navigate('/dispatch/jobs/create')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> New Shipment
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI HUD - Simplified Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {[
          { label: 'Total Volume', value: '1,204', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'On Road Now', value: '84', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Exceptions', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Delivered Today', value: '412', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-0.5">{kpi.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
           <div className="relative w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Find SHP- ID, origins or customers..." 
                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all" 
              />
           </div>
           
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Sort By <ChevronDown size={16} className="text-gray-400" />
           </button>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4">Manifest Reference</th>
                 <th className="px-6 py-4">Route / Trajectory</th>
                 <th className="px-6 py-4">Current State</th>
                 <th className="px-6 py-4">Assignment</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filteredShipments.map(shp => (
                 <tr className="hover:bg-gray-50/50 transition-all cursor-pointer group" key={shp.id} onClick={() => navigate(`/admin/shipments/${shp.id}`)}>
                   <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-[15px]">{shp.id}</div>
                      <div className="text-[11px] text-gray-400 font-medium tracking-tight mt-0.5 truncate max-w-[160px]">{shp.customer}</div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 relative pl-4">
                         <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-100"></div>
                         <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 uppercase">
                            <MapPin size={10}/> {shp.origin}
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-900 mt-0.5">
                            <div className="w-1 h-1 rounded-full bg-yellow-400"></div> {shp.dest}
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border w-fit ${
                           shp.status === 'Delivered' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                           shp.status === 'Exception' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' : 
                           'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]'
                        }`}>
                           {shp.status}
                        </span>
                        <div className="w-20 h-1 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                           <div className={`h-full ${shp.status === 'Exception' ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${shp.progress}%` }}></div>
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-gray-900 text-[#FFCC00] flex items-center justify-center font-black text-[10px]">
                            {shp.driver[0]}
                         </div>
                         <div>
                            <div className="font-bold text-gray-900 text-sm">{shp.driver}</div>
                            <div className="text-[10px] text-gray-400 uppercase font-medium">{shp.type} Load</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-right">
                      <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                        Manage
                      </button>
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
