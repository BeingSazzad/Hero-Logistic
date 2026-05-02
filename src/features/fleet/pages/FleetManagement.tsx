import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, Search, Plus, Filter, Droplet, Wrench, 
  ChevronDown, Activity, ShieldCheck, X, LayoutGrid, List
} from 'lucide-react';

export default function AdminFleetManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showSort, setShowSort] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const fleet = [
    { id: 'TRK-102', branch: 'SYDNEY', reg: 'XQG-984', type: 'Heavy Truck', cap: '20t', status: 'Active', service: '4,500 km', fuel: '18L/100km', lastUpdate: 'Live', driver: 'Jack Taylor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop' },
    { id: 'VAN-08',  branch: 'MELBOURNE', reg: 'BZX-441', type: 'Delivery Van', cap: '2.5t', status: 'Maintenance', service: 'Overdue', fuel: '12L/100km', lastUpdate: '2h ago', driver: 'Oliver Brown', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1519003300449-424ad040507b?q=80&w=800&auto=format&fit=crop' },
    { id: 'TRL-44',  branch: 'BRISBANE', reg: 'T-9921',  type: 'Trailer Flatbed', cap: '40t', status: 'Active', service: '12,000 km', fuel: '-', lastUpdate: 'Live', driver: 'Noah Williams', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1586191582151-f73972d10942?q=80&w=800&auto=format&fit=crop' },
    { id: 'TRK-09',  branch: 'SYDNEY', reg: 'XYY-112', type: 'Heavy Truck', cap: '20t', status: 'Inbound', service: '1,200 km', fuel: '19L/100km', lastUpdate: 'Live', driver: 'Liam Smith', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop' },
  ];

  const filteredFleet = fleet.filter(v => {
    const matchesSearch = 
      v.id.toLowerCase().includes(search.toLowerCase()) || 
      v.reg.toLowerCase().includes(search.toLowerCase()) ||
      v.branch.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 ">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-hero-sm text-hero-dark shadow-sm">
            <Truck size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Vehicles & Fleet</h1>
            <p className="hero-body text-gray-600 mt-1">Manage trucks, vans, and trailers across all branches.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/admin/fleet/add')} 
          className="btn btn-primary"
        >
          <Plus size={18} strokeWidth={3} /> Add Vehicle
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Batch Actions ── */}
      {selectedIds.length > 0 && (
        <div className="bg-[#111] text-white p-4 rounded-xl flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2 border border-gray-800 mb-2 mx-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-brand-yellow text-black flex items-center justify-center font-bold">{selectedIds.length}</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Vehicles Selected</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Synchronized Fleet Operations</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all">Maintenance</button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all">Compliance Audit</button>
            <button onClick={() => setSelectedIds([])} className="p-2 hover:bg-white/10 rounded-lg transition-all"><X size={16}/></button>
          </div>
        </div>
      )}

      {/* Telemetry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 px-4">
         {[
           { label: 'Fleet Usage', value: '84%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'Needs Maintenance', value: '08 Trucks', icon: Wrench, color: 'text-hero-danger', bg: 'bg-red-50' },
           { label: 'Safety Check', value: '100%', icon: ShieldCheck, color: 'text-hero-success', bg: 'bg-emerald-50' },
           { label: 'Fuel Cost', value: '$1.42/km', icon: Droplet, color: 'text-amber-600', bg: 'bg-amber-50' },
         ].map((stat, i) => (
           <div key={i} className="card p-5 flex items-center justify-between group hover:border-brand transition-colors">
              <div>
                 <p className="hero-metadata text-gray-600 mb-2">{stat.label}</p>
                 <p className="text-2xl font-semibold text-hero-dark leading-none">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-hero-sm flex items-center justify-center ${stat.bg} ${stat.color} border border-gray-50`}>
                 <stat.icon size={20}/>
              </div>
           </div>
         ))}
      </div>

      <div className="card !rounded-hero-md shadow-sm border border-gray-100 overflow-hidden mx-4">
        
        {/* Filter Bar */}
        <div className="hero-table-header p-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
           <div className="relative w-full md:w-[320px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-brand transition-colors" size={16} />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Reg, ID or Branch..." 
                className="input pl-10 w-full" 
              />
           </div>
           
           <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1 border border-gray-200">
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                   title="List View"
                 >
                    <List size={16}/>
                 </button>
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                   title="Grid View"
                 >
                    <LayoutGrid size={16}/>
                 </button>
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className={`btn py-2 px-4 shadow-sm ${statusFilter !== 'All' ? 'btn-primary' : 'btn-outline border-hero-neutral/20 text-gray-600'}`}
                >
                   <Filter size={14}/> {statusFilter === 'All' ? 'Filter Status' : statusFilter}
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center px-4">
                       <span className="text-xs font-semibold uppercase tracking-widest">Select Status</span>
                       <X size={12} className="cursor-pointer" onClick={() => setShowFilterDropdown(false)}/>
                    </div>
                    <div className="py-1">
                      {['All', 'Active', 'Maintenance', 'Inbound'].map((status) => (
                        <button 
                          key={status} 
                          onClick={() => { setStatusFilter(status); setShowFilterDropdown(false); }} 
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-between ${statusFilter === status ? 'text-brand-yellow bg-gray-900' : 'text-gray-700'}`}
                        >
                          {status}
                          {statusFilter === status && <div className="w-1.5 h-1.5 rounded-full w-fit bg-brand-yellow" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-semibold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors"
                >
                   Sort By <ChevronDown size={14} className={`text-gray-400 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                </button>
                {showSort && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="py-1">
                      {['Vehicle ID', 'Registration', 'Type', 'Status'].map((opt) => (
                        <button key={opt} onClick={() => setShowSort(false)} className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">{opt}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {viewMode === 'list' ? (
           <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left">
                <thead className="bg-[#FAFAFA] hero-metadata border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 w-4">
                      <input 
                        type="checkbox"
                        onChange={(e) => setSelectedIds(e.target.checked ? filteredFleet.map(v => v.id) : [])}
                        checked={selectedIds.length === filteredFleet.length && filteredFleet.length > 0}
                        className="w-4 h-4 rounded border-gray-300 accent-[#111] cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4">Vehicle Details</th>
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Assigned Driver</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredFleet.length > 0 ? filteredFleet.map(v => (
                     <tr className={`hover:bg-gray-50 transition-all cursor-pointer group border-l-4 ${selectedIds.includes(v.id) ? 'border-l-brand-yellow bg-yellow-50/10' : 'border-l-transparent'}`} key={v.id} onClick={() => navigate(`/admin/fleet/${v.id}`)}>
                       <td className="px-6 py-5 w-4" onClick={e => e.stopPropagation()}>
                         <input 
                           type="checkbox"
                           checked={selectedIds.includes(v.id)}
                           onChange={() => toggleSelect(v.id)}
                           className="w-4 h-4 rounded border-gray-300 accent-[#111] cursor-pointer"
                         />
                       </td>
                       <td className="px-6 py-5">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-brand-yellow overflow-hidden">
                              {v.thumbnail ? (
                                <img src={v.thumbnail} className="w-full h-full object-cover" alt={v.id} />
                              ) : (
                                <Truck size={18} />
                              )}
                           </div>
                           <div>
                             <div className="font-semibold text-[#111] text-[15px] tracking-tight">{v.id}</div>
                             <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.1em] mt-0.5">{v.reg}</div>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full w-fit bg-brand-yellow"></span>
                             <span className="text-xs font-semibold uppercase tracking-widest text-[#111]">{v.branch}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-2.5">
                             <div className="w-8 h-8 rounded-full w-fit bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden border border-gray-100">
                                {v.avatar ? <img src={v.avatar} className="w-full h-full object-cover" /> : v.driver[0]}
                             </div>
                             <span className="text-xs font-bold text-gray-700">{v.driver}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex flex-col">
                             <span className="text-xs font-semibold text-[#111] uppercase tracking-wide">{v.type}</span>
                             <span className="text-xs text-gray-400 font-bold uppercase mt-1">Payload: {v.cap}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                         <span className={`text-xs font-semibold px-3 py-1 rounded-lg border uppercase tracking-widest ${
                            v.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                            v.status === 'Maintenance' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]' :
                            'bg-blue-50 text-blue-600 border-blue-100'
                         }`}>
                            {v.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button 
                            onClick={(e) => { e.stopPropagation(); navigate(`/admin/fleet/${v.id}`); }}
                            className="text-xs font-semibold text-[#111] hover:text-white border border-gray-200 hover:bg-black px-4 py-2 rounded-xl transition-all uppercase tracking-widest shadow-sm"
                          >
                             Manage
                          </button>
                       </td>
                     </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center text-gray-400 uppercase tracking-widest font-bold">
                        No assets found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
           </div>
        ) : (
           <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50/50">
              {filteredFleet.length > 0 ? filteredFleet.map(v => (
                 <div 
                   key={v.id}
                   onClick={() => navigate(`/admin/fleet/${v.id}`)}
                   className={`relative bg-white rounded-3xl border transition-all cursor-pointer group overflow-hidden ${selectedIds.includes(v.id) ? 'border-brand-yellow ring-4 ring-brand-yellow/10' : 'border-gray-100 hover:shadow-xl hover:-translate-y-1'}`}
                 >
                    {/* Checkbox Overlay */}
                    <div className="absolute top-4 left-4 z-10" onClick={e => e.stopPropagation()}>
                       <input 
                         type="checkbox"
                         checked={selectedIds.includes(v.id)}
                         onChange={() => toggleSelect(v.id)}
                         className="w-5 h-5 rounded-lg border-white/20 accent-brand-yellow shadow-sm cursor-pointer"
                       />
                    </div>

                    {/* Image Header */}
                    <div className="aspect-[16/10] w-full bg-gray-900 relative overflow-hidden">
                       <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={v.id} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                       <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div>
                             <h3 className="text-white font-bold text-lg leading-none">{v.id}</h3>
                             <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1.5">{v.reg}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                             v.status === 'Active' ? 'bg-emerald-500 text-white' : 
                             v.status === 'Maintenance' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                          }`}>
                             {v.status}
                          </span>
                       </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Assigned Branch</p>
                             <p className="text-sm font-bold text-gray-900">{v.branch}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payload</p>
                             <p className="text-sm font-bold text-gray-900">{v.cap}</p>
                          </div>
                       </div>

                       <div className="w-full h-px bg-gray-100 mb-4"></div>

                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full w-fit border-2 border-white shadow-sm overflow-hidden">
                                <img src={v.avatar} className="w-full h-full object-cover" alt={v.driver} />
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Driver</p>
                                <p className="text-xs font-bold text-gray-700">{v.driver}</p>
                             </div>
                          </div>
                          <button className="p-2.5 bg-gray-50 hover:bg-gray-900 hover:text-brand-yellow rounded-xl transition-all border border-gray-100">
                             <Activity size={14}/>
                          </button>
                       </div>
                    </div>
                 </div>
              )) : (
                <div className="col-span-full py-20 text-center uppercase tracking-widest font-bold text-gray-400">No assets found</div>
              )}
           </div>
        )}
      </div>
    </div>
  );
}
