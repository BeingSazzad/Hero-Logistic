import React, { useState, useMemo } from 'react';
import {
  Search, MapPin, Phone, Star, AlertCircle, Filter,
  ArrowDownUp, MessageSquare, Clock, ShieldCheck,
  UserCog, Plus, Users, ChevronDown, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const RAW_DRIVERS = [
  { id: 'DRV-102', branchId: 'SYD-CENTRAL', name: 'Jack Taylor', phone: '+61 411 000 001', rank: 'Senior', status: 'On Duty', assigned: 'SHP-20481', rating: 4.8, shift: 'Day Shift (06:00 - 18:00)', compliance: 'Valid', certs: ['DG', 'MSIC', 'White Card'], avatar: '/driver_avatar_2.png' },
  { id: 'DRV-105', branchId: 'SYD-CENTRAL', name: 'Liam Smith', phone: '+61 412 000 002', rank: 'Regular', status: 'On Duty', assigned: 'SHP-20482', rating: 4.5, shift: 'Night Shift (18:00 - 06:00)', compliance: 'Valid', certs: ['White Card'], avatar: '/driver_avatar_4.png' },
  { id: 'DRV-118', branchId: 'MEL-Depot', name: 'Noah Williams', phone: '+61 413 000 003', rank: 'Regular', status: 'Delay Alert', assigned: 'SHP-20483', rating: 4.2, shift: 'Day Shift (08:00 - 20:00)', compliance: 'Warning', certs: ['MSIC'], avatar: '/driver_avatar_1.png' },
  { id: 'DRV-134', branchId: 'SYD-CENTRAL', name: 'Oliver Brown', phone: '+61 414 000 004', rank: 'Junior', status: 'In Break', assigned: '-', rating: 4.0, shift: 'Night Shift (22:00 - 10:00)', compliance: 'Valid', certs: [], avatar: '/driver_avatar_3.png' },
  { id: 'DRV-145', branchId: 'SYD-CENTRAL', name: 'Lucas Jones', phone: '+61 415 000 005', rank: 'Senior', status: 'Off Duty', assigned: '-', rating: 4.9, shift: 'Day Shift', compliance: 'Valid', certs: ['DG'], avatar: '/driver_avatar_2.png' },
];

export default function DispatchDrivers() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('desc'); // Changed to desc for most recent first

  const filteredDrivers = useMemo(() => {
    return RAW_DRIVERS.filter(drv => {
      // Logic: Only show current branch UNLESS searching specifically for someone
      const isMyBranch = drv.branchId === user.branchId;
      const matchesFilter = filter === 'All' || drv.status === filter;
      const searchStr = `${drv.id} ${drv.name} ${drv.phone}`.toLowerCase();
      const matchesSearch = searchStr.includes(search.toLowerCase());

      if (search) return matchesSearch; // If searching, show cross-branch (but mark them later)
      return isMyBranch && matchesFilter;
    }).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search, sortKey, sortOrder, user]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 ">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Users size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Roster Control</h1>
            <p className="hero-body text-gray-600 mt-1">Active Fleet Operators and Live Status Monitoring</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-md btn-outline px-6">
            Export CSV
          </button>
          <button onClick={() => navigate('/dispatch/drivers/add')} className="btn-md btn-primary px-6">
            <Plus size={18} strokeWidth={3} /> Add Driver
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* Modern High-Density Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200/60 w-full xl:w-auto overflow-x-auto shadow-sm">
            {['All', 'On Duty', 'In Break', 'Delay Alert', 'Off Duty'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded transition-all whitespace-nowrap ${filter === tab ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 border border-transparent'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
            <div className="relative w-full md:w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-yellow transition-colors" size={16} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by ID or Name..."
                className="input pl-10 focus:border-brand-yellow focus:ring-brand-yellow/20"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="pl-10 font-bold"
              >
                <option value="name">Sort by Name</option>
                <option value="id">Sort by ID</option>
                <option value="rating">Sort by Rating</option>
                <option value="rank">Sort by Rank</option>
              </select>
              <ArrowDownUp size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Driver Details</th>
                <th className="px-6 py-4">Current Shift</th>
                <th className="px-6 py-4">Status & Assignment</th>
                <th className="px-6 py-4">Compliance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDrivers.map(drv => (
                <tr className="hover:bg-gray-50 transition-all cursor-pointer group" key={drv.id} onClick={() => navigate(`/dispatch/drivers/${drv.id}`)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border-2 border-transparent overflow-hidden bg-hero-dark flex items-center justify-center text-brand-yellow font-semibold text-xs shrink-0 group-hover:border-brand-yellow transition-colors">
                        {drv.avatar ? (
                          <img src={drv.avatar} alt={drv.name} className="w-full h-full object-cover" />
                        ) : (
                          drv.name.split(' ').map(n => n[0]).join('')
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-[#111] text-sm flex items-center gap-2">
                          {drv.name}
                          <span className={`badge ${drv.branchId === user.branchId ? 'badge-gray' : 'badge-blue'}`}>
                            {drv.branchId === user.branchId ? drv.rank : `Other: ${drv.branchId}`}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mt-0.5">{drv.id} • {drv.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      {drv.shift}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-yellow-600">
                      <Star size={10} className="fill-brand-orange" /> {drv.rating} / 5.0
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <span className={`badge ${drv.status === 'On Duty' ? 'badge-green' :
                        drv.status === 'Delay Alert' ? 'badge-red animate-pulse' :
                          drv.status === 'In Break' ? 'badge-yellow' :
                            'badge-gray'
                        }`}>
                        {drv.status}
                      </span>
                      <div className={`text-xs uppercase font-bold mt-0.5 flex items-center gap-1.5 tracking-widest ${drv.assigned === '-' ? 'text-gray-400' : 'text-gray-700 font-semibold'}`}>
                        <MapPin size={10} /> {drv.assigned === '-' ? 'No Active Job' : drv.assigned}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {drv.compliance === 'Valid' ? (
                          <span className="badge badge-green">
                            <ShieldCheck size={12} strokeWidth={3} /> Valid
                          </span>
                        ) : (
                          <span className="badge badge-red">
                            <AlertCircle size={12} strokeWidth={3} /> Renew
                          </span>
                        )}
                      </div>
                      {drv.certs?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {drv.certs.map(c => (
                            <span key={c} className="text-xs font-semibold uppercase tracking-widest bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {drv.branchId === user.branchId ? (
                        <>
                          <button className="btn-xs btn-outline px-4">
                            <Phone size={14} /> Call
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); navigate('/dispatch/messages'); }} className="btn-xs btn-primary px-4">
                            <MessageSquare size={14} /> Chat
                          </button>
                        </>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); alert(`Requesting permission to pull ${drv.name} from ${drv.branchId}...`); }} className="btn-xs bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4">
                          Request Pull-in
                        </button>
                      )}
                    </div>
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


