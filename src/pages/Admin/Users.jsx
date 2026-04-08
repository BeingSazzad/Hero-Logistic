import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, UserPlus, Shield, Filter, ArrowDownUp, Mail, Clock, MoreHorizontal, ChevronDown, User } from 'lucide-react';

export default function AdminUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const rawUsers = [
    { id: 'USR-01', name: 'Sarah Mitchell', email: 'sarah.m@hero.com', role: 'Dispatcher', systemAccess: 'Full', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'USR-02', name: 'Jack Taylor',    email: 'jack.t@hero.com',  role: 'Driver',     systemAccess: 'Mobile Only', status: 'Active', lastLogin: '2 days ago' },
    { id: 'USR-03', name: 'Oliver Brown',   email: 'oliver.b@hero.com', role: 'Warehouse',  systemAccess: 'Floor Devices', status: 'Offline', lastLogin: '1 week ago' },
    { id: 'USR-04', name: 'Liam Smith',     email: 'liam.s@hero.com',  role: 'Dispatcher', systemAccess: 'Full', status: 'Active', lastLogin: '1 hr ago' },
    { id: 'USR-05', name: 'Michael Adams',  email: 'mike.a@hero.com',  role: 'System Admin', systemAccess: 'Root', status: 'Active', lastLogin: 'Now' },
  ];

  const filteredUsers = useMemo(() => {
    return rawUsers.filter(u => {
      const searchStr = `${u.name} ${u.email} ${u.role}`.toLowerCase();
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Identity & Access</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform users, roles, and administrative permissions.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/users/invite')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <UserPlus size={18} strokeWidth={3} /> Invite Operator
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

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
                placeholder="Search by name, email or role..." 
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
                 <th className="px-6 py-4">Operator Details</th>
                 <th className="px-6 py-4">Role Assigned</th>
                 <th className="px-6 py-4">Access Level</th>
                 <th className="px-6 py-4">Last Activity</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {filteredUsers.map(u => (
                 <tr className="hover:bg-gray-50/50 transition-all group" key={u.id}>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                          <User size={16} className="text-blue-500" />
                       </div>
                       <div>
                         <div className="font-bold text-[#111] text-[15px]">{u.name}</div>
                         <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><Mail size={10}/> {u.email}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                       <span className="text-[11px] font-bold uppercase py-1 px-2.5 bg-gray-100 text-gray-600 rounded-md border border-gray-200">{u.role}</span>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                         <Shield size={14} className={u.systemAccess === 'Root' ? 'text-red-500' : 'text-gray-400'}/> {u.systemAccess}
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                         <Clock size={14} className="text-gray-300"/> {u.lastLogin}
                      </div>
                   </td>
                   <td className="px-6 py-5">
                     <span className={`text-[10px] font-bold px-3 py-1 rounded-md border ${u.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'}`}>
                        {u.status}
                     </span>
                   </td>
                   <td className="px-6 py-5">
                      <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                        Edit Access
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
