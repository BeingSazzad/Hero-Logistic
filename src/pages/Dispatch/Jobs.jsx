import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Plus, Clock, 
  MapPin, Truck, ChevronDown, CheckCircle2, 
  AlertTriangle, MoreHorizontal 
} from 'lucide-react';

export default function DispatchJobs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const rawJobs = [
    { id: 'JOB-9042', customer: 'Acme Corp Logistics', origin: 'Sydney', dest: 'Melbourne', status: 'Active', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', eta: '14:30' },
    { id: 'JOB-9041', customer: 'Tech Solutions Ltd', origin: 'Port Botany', dest: 'Penrith', status: 'Delayed', driver: 'Sarah Mitchell', vehicle: 'BGT-221', priority: 'Medium', eta: '16:45' },
    { id: 'JOB-9039', customer: 'Global Traders Australia', origin: 'Brisbane Port', dest: 'Gold Coast', status: 'Completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', eta: 'Done' },
    { id: 'JOB-9035', customer: 'Southport Logistics', origin: 'Adelaide', dest: 'Sydney Hub', status: 'Active', driver: 'Noah Williams', vehicle: 'V-102', priority: 'High', eta: '10:00' }
  ];

  const filteredJobs = useMemo(() => {
    return rawJobs.filter(job => {
      const matchesFilter = filter === 'All' || job.status === filter;
      const matchesSearch = `${job.id} ${job.customer} ${job.driver}`.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Updated Header - Matching Reference Style */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Fleet Operations</h1>
          <p className="text-sm text-gray-500 mt-1">Live dispatch control and real-time flight status monitoring.</p>
        </div>
        <button 
          onClick={() => navigate('/dispatch/jobs/create')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> Manifest New
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex bg-gray-100 p-1 rounded-lg">
             {['All', 'Active', 'Delayed', 'Completed'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setFilter(tab)}
                 className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${filter === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 {tab}
               </button>
             ))}
           </div>

           <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-[320px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search manifests, drivers..." 
                  className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all" 
                />
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Sort <ChevronDown size={16} className="text-gray-400" />
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4">Manifest ID</th>
                 <th className="px-6 py-4">Route Info</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Assigned Unit</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filteredJobs.map(job => (
                 <tr className="hover:bg-gray-50/50 transition-all cursor-pointer group" key={job.id} onClick={() => navigate(`/dispatch/jobs/${job.id}`)}>
                   <td className="px-6 py-5">
                      <div className="font-bold text-[#111] text-[15px]">{job.id}</div>
                      <div className="text-[11px] text-gray-400 font-medium tracking-tight mt-0.5 truncate max-w-[160px]">{job.customer}</div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                         <span className="font-bold">{job.origin}</span>
                         <span className="text-gray-300">→</span>
                         <span className="font-bold">{job.dest}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium mt-1 uppercase flex items-center gap-1">
                        <Clock size={10}/> ETA: {job.eta}
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-md border ${
                         job.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                         job.status === 'Delayed' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' : 
                         'bg-[#F8FAFC] text-gray-400 border-gray-100'
                      }`}>
                         {job.status}
                      </span>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-400">
                            {job.driver[0]}
                         </div>
                         <div>
                            <div className="font-bold text-gray-900 text-sm leading-tight">{job.driver}</div>
                            <div className="text-[10px] text-gray-400 uppercase font-medium mt-0.5">{job.vehicle}</div>
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
