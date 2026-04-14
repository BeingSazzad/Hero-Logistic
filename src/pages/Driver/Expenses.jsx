import React, { useState } from 'react';
import { 
  Plus, Camera, Fuel, CreditCard, 
  Receipt, MapPin, Calendar, Clock,
  CheckCircle2, AlertCircle, ChevronRight, 
  Search, Filter, History, Wrench, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LOGS = [
  { id: 'LOG-8821', type: 'Fuel', amount: '84.50', status: 'Approved', date: 'Today, 09:12', vendor: 'Shell Sydney', hasPhoto: true },
  { id: 'LOG-8819', type: 'Toll', amount: '12.20', status: 'Pending', date: 'Today, 07:45', vendor: 'Linkt M2', hasPhoto: true },
  { id: 'LOG-8790', type: 'Parking', amount: '25.00', status: 'Rejected', date: 'Yesterday', vendor: 'CBD Secure', hasPhoto: true, reason: 'Invalid Receipt' },
  { id: 'LOG-8765', type: 'Expense', amount: '15.00', status: 'Approved', date: '12 Apr', vendor: 'Cleaning Hub', hasPhoto: true },
];

export default function DriverExpenses() {
  const navigate = useNavigate();
   if (step === 'form') {
     return (
        <div className="flex flex-col bg-gray-50 min-h-screen pb-24 w-full max-w-[480px] mx-auto animate-in slide-in-from-bottom-5 duration-300">
           {/* Form Header */}
           <div className="bg-[#111] px-6 py-6 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center text-black shadow-lg">
                    <Receipt size={24} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">New Expense</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">Submit For Reimbursement</p>
                 </div>
              </div>
              <button onClick={() => { setStep('list'); setCategory(null); }} className="text-white bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><X size={20}/></button>
           </div>

           <div className="p-6 space-y-6">
              <div className="space-y-5">
                 {/* Flexible Category Dropdown */}
                 <div>
                   <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 px-1">Expense Category</label>
                   <div className="relative">
                      <select 
                         value={category?.id || ''} 
                         onChange={(e) => setCategory(categories.find(c => c.id === e.target.value))}
                         className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl text-sm font-black appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all shadow-sm cursor-pointer"
                      >
                         <option value="" disabled>Select Category...</option>
                         {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                         ))}
                         <option value="Other">Other / Misc</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                         <ChevronRight size={18} className="rotate-90" />
                      </div>
                   </div>
                 </div>

                 <div>
                   <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 px-1">Amount ($)</label>
                   <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">$</span>
                      <input type="number" placeholder="0.00" className="w-full bg-white border border-gray-100 py-4 pl-10 pr-5 rounded-2xl text-2xl font-black focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all shadow-sm" />
                   </div>
                 </div>

                 <div>
                   <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 px-1">Vendor / Details</label>
                   <input type="text" placeholder="e.g. Shell Melbourne, City Parking..." className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl text-sm font-black focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 transition-all shadow-sm" />
                 </div>

                 <div className="pt-2">
                    <button className="w-full py-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-white hover:border-yellow-300 hover:text-[#111] transition-all cursor-pointer shadow-inner">
                       <Camera size={28} />
                       <span className="text-[10px] font-black uppercase">Capture Receipt Photo</span>
                    </button>
                 </div>

                 <button 
                   onClick={() => setStep('success')}
                   className="w-full py-5 bg-[#111] hover:bg-black text-[#FFCC00] font-black uppercase text-xs rounded-2xl shadow-xl shadow-black/10 transition-all active:scale-[0.98] mt-4"
                 >
                   Submit Reimbursement
                 </button>
              </div>
           </div>
        </div>
     );
   }

  if (step === 'success') {
    return (
       <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen p-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-[#FFCC00] rounded-full flex items-center justify-center text-black mb-8 shadow-xl shadow-yellow-500/20 animate-bounce">
             <CheckCircle2 size={48} strokeWidth={2.5}/>
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase">Submitted!</h2>
          <p className="text-sm font-bold text-gray-400 mt-2 max-w-[240px] leading-tight">Your reimbursement log has been queued for Accounts review.</p>
          <button 
            onClick={() => { setStep('list'); setCategory(null); }}
            className="mt-10 px-10 py-5 bg-[#111] text-[#FFCC00] rounded-2xl font-black uppercase text-xs hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Back to Expenses
          </button>
       </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24 w-full max-w-[480px] mx-auto">
      
      {/* ── 1. Audit Header ── */}
      <div className="bg-[#111] px-6 py-6 shadow-xl relative overflow-hidden shrink-0">
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 opacity-70">Fleet Reimbursement Balance</p>
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-3xl font-black text-white">$145.20</h2>
               <p className="text-[9px] font-black text-[#FFCC00] uppercase mt-1 tracking-widest">Pending Verification</p>
            </div>
            <div className="text-right">
               <h2 className="text-base font-black text-gray-500">$1,240.00</h2>
               <p className="text-[9px] font-black text-gray-600 uppercase mt-1 tracking-widest">Paid This Month</p>
            </div>
         </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* ── 2. Create Audit Action ── */}
        <button 
           onClick={() => setStep('form')}
           className="w-full bg-[#FFCC00] hover:bg-yellow-500 text-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg border border-yellow-400"
        >
           <Plus size={20} strokeWidth={3} />
           <span className="text-xs font-black uppercase">New Expense Log</span>
        </button>

        {/* ── 3. Recent Audit Feed ── */}
        <div className="flex items-center justify-between px-2 pt-2">
           <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.15em]">Recent Activity</h3>
           <button className="text-[10px] font-black text-gray-400 flex items-center gap-1.5 uppercase hover:text-gray-600 transition-colors">
              <History size={12}/> Timeline
           </button>
        </div>

        <div className="space-y-4 pb-4">
           {LOGS.map(log => (
              <div key={log.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.99] transition-all">
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center border transition-colors ${
                       log.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-500' :
                       log.status === 'Rejected' ? 'bg-red-50 border-red-100 text-red-500' :
                                                  'bg-amber-50 border-amber-100 text-amber-500'
                    }`}>
                       {log.type === 'Fuel' ? <Fuel size={20} /> : 
                        log.type === 'Toll' ? <CreditCard size={20} /> : 
                                               <Receipt size={20} />}
                    </div>
                    <div>
                       <p className="text-sm font-black text-gray-900 tracking-tight mb-0.5">{log.vendor}</p>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{log.date}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${
                             log.status === 'Approved' ? 'text-emerald-500' :
                             log.status === 'Rejected' ? 'text-red-500' :
                                                        'text-amber-500'
                          }`}>
                             {log.status}
                          </span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-lg font-black text-gray-900 tracking-tighter">${log.amount}</p>
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{log.id}</span>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
