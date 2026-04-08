import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Building2, CreditCard, ChevronDown, Building } from 'lucide-react';

export default function AdminCustomers() {
  const navigate = useNavigate();
  const clients = [
    { id: 'CUST-001', name: 'Acme Corp Logistics',      contact: 'John Smith',   phone: '+61 411 000 001', creditLimit: '$50,000', terms: 'Net 30', status: 'Active' },
    { id: 'CUST-002', name: 'Tech Solutions Ltd',       contact: 'Emma Watson',  phone: '+61 412 000 002', creditLimit: '$10,000', terms: 'Net 14', status: 'Active' },
    { id: 'CUST-003', name: 'Global Traders Australia', contact: 'Lucas Brown',  phone: '+61 413 000 003', creditLimit: '$150,000',terms: 'Net 60', status: 'Hold' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Updated Header - Exact match to your reference */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Customer Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage B2B clients, contact persons, credit limits, and payment terms.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/customers/add')} 
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} strokeWidth={3} /> New Customer
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
                placeholder="Search companies or contacts..." 
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
                 <th className="px-6 py-4">Company Details</th>
                 <th className="px-6 py-4">Primary Contact</th>
                 <th className="px-6 py-4">Credit Limit</th>
                 <th className="px-6 py-4">Payment Terms</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {clients.map(c => (
                 <tr className="hover:bg-gray-50/50 transition-all cursor-pointer group" key={c.id}>
                   <td className="px-6 py-5">
                     <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0">
                          <Building size={16} className="text-gray-400" />
                       </div>
                       <div>
                         <div className="font-bold text-[#111] text-[15px]">{c.name}</div>
                         <div className="text-[11px] text-gray-400 font-medium tracking-tight mt-0.5">{c.id}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-[#111]">{c.contact}</span>
                         <span className="text-[11px] text-gray-400 mt-0.5">{c.phone}</span>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <span className="text-sm font-black text-[#111]">{c.creditLimit}</span>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 w-max px-3 py-1.5 rounded-md border border-gray-200">
                        <CreditCard size={12}/> {c.terms}
                      </div>
                   </td>
                   <td className="px-6 py-5">
                     <span className={`text-[10px] font-bold px-3 py-1 rounded-md border ${
                        c.status === 'Active' ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' : 
                        'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                     }`}>
                        {c.status}
                     </span>
                   </td>
                   <td className="px-6 py-5">
                      <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                        Edit Terms
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
