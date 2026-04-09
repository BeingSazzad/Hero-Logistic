import React, { useState } from 'react';
import { 
  CreditCard, TrendingUp, Zap, Plus, X, Shield, CheckCircle2,
  Target, BarChart3, Users, ChevronRight, Activity, 
  Settings2, Package, Search, Filter, ArrowUpRight
} from 'lucide-react';

export default function Subscriptions() {
  const [activeTab, setActiveTab] = useState('architect'); // architect, active, history
  const [planModal, setPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const stats = [
    { label: 'Monthly Revenue (MRR)', val: '$42,850', trend: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Yearly Revenue (ARR)', val: '$514.2k', trend: '+8%', icon: BarChart3, color: 'text-blue-500' },
    { label: 'Active Companies', val: '154', trend: '+4', icon: Users, color: 'text-[#FFCC00]' },
    { label: 'Churn Rate', val: '1.2%', trend: '-0.2%', icon: Activity, color: 'text-rose-500' },
  ];

  const plans = [
    { id: 'str', name: 'Starter', price: '$0', users: '3 Users', fleet: '5 Assets', color: 'bg-gray-400', tenants: 12 },
    { id: 'pro', name: 'Professional', price: '$149', users: 'Unlimited', fleet: '50 Assets', color: 'bg-[#FFCC00]', tenants: 89, recommended: true },
    { id: 'ent', name: 'Enterprise', price: 'Custom', users: 'Unlimited', fleet: 'Unlimited', color: 'bg-black', tenants: 53 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 px-2">
      
      {/* Page Header — matching Dashboard/Fleet standard */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subscriptions & Plans</h1>
          <p className="text-sm text-gray-500 mt-1">Manage revenue tiers, monitor tenant subscriptions, and track platform growth.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
           {['architect', 'active', 'history'].map((t) => (
             <button
               key={t}
               onClick={() => setActiveTab(t)}
               className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                 activeTab === t ? 'bg-[#FFCC00] text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'
               }`}
             >
               {t === 'architect' ? 'Plan Designer' : t === 'active' ? 'Active Subscriptions' : 'Revenue History'}
             </button>
           ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Matrix */}
      {/* KPI Cards — matching Dashboard pattern */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2 mb-2">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group">
             <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-gray-900 mt-0.5">{s.val}</p>
                <p className={`text-[10px] font-bold mt-1 ${s.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{s.trend}</p>
             </div>
             <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
                <s.icon size={20} />
             </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      {activeTab === 'architect' && (
         <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
               <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-[#FFCC00]">
                        <Settings2 size={20} />
                     </div>
                     <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Plan Tiers</h3>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">Design the pricing packages available to your tenants</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => { setEditingPlan(null); setPlanModal(true); }}
                    className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm"
                  >
                     <Plus size={18} strokeWidth={3}/> Add Plan
                  </button>
               </div>
               
               <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((p, i) => (
                    <div key={i} className="flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-[#FFCC00] hover:shadow-2xl transition-all group relative">
                       {p.recommended && (
                          <div className="absolute top-4 right-4 bg-[#FFCC00] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Gold Standard</div>
                       )}
                       <div className={`h-1.5 w-full ${p.color}`}></div>
                       <div className="p-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{p.tenants} Active Tenants</p>
                          <h4 className="text-2xl font-black text-gray-900 mb-1">{p.name}</h4>
                          <div className="flex items-baseline gap-1 mt-4 mb-6 text-2xl font-black text-gray-900">
                             {p.price}
                             {p.price !== 'Custom' && <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">/ Mo</span>}
                          </div>
                          <div className="space-y-3 mb-8">
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-600"><CheckCircle2 size={12} className="text-emerald-500"/> {p.users}</div>
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-600"><CheckCircle2 size={12} className="text-emerald-500"/> {p.fleet}</div>
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-600"><CheckCircle2 size={12} className="text-emerald-500"/> PWA Driver Suit</div>
                          </div>
                          <button onClick={() => { setEditingPlan(p); setPlanModal(true); }} className="w-full py-3 bg-gray-50 hover:bg-[#FFCC00] hover:text-black border border-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest transition-all">Configure Logic</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-[#111] rounded-xl p-8 border border-gray-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#FFCC00] opacity-[0.03] rounded-full blur-3xl"></div>
               <div>
                  <h4 className="text-[#FFCC00] font-bold text-lg tracking-tight mb-1">Enterprise Upgrade Triggers</h4>
                  <p className="text-xs text-gray-400 max-w-lg leading-relaxed">Automatically flag companies when they exceed plan limits and prompt them to upgrade to an enterprise agreement.</p>
               </div>
               <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm shrink-0">Configure</button>
            </div>
         </div>
      )}

      {activeTab === 'active' && (
         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
               <div className="relative group flex-1 max-w-md">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00]" />
                  <input type="text" placeholder="Search companies..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-bold outline-none" />
               </div>
               <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600">
                  <Filter size={14}/> All Plans
               </button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Monthly Revenue</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {[
                       { name: 'FastMove AU', plan: 'Professional', status: 'Active', mrr: '$149.00', start: 'Oct 2025' },
                       { name: 'OzFreight Co.', plan: 'Enterprise', status: 'Active', mrr: '$1,250.00', start: 'Jan 2026' },
                       { name: 'Direct Logistics', plan: 'Starter', status: 'Trialing', mrr: '$0.00', start: 'Apr 2026' },
                     ].map((t, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                           <td className="px-6 py-5">
                              <div>
                                 <p className="font-bold text-gray-900 text-sm leading-none mb-1">{t.name}</p>
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Joined {t.start}</p>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${t.plan === 'Enterprise' ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{t.plan}</span>
                           </td>
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                 <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'Active' ? 'bg-emerald-500' : 'bg-[#FFCC00]'}`}></div>
                                 <span className="text-xs font-bold text-gray-700">{t.status}</span>
                              </div>
                           </td>
                           <td className="px-6 py-5 font-bold text-gray-900 text-sm">{t.mrr}</td>
                           <td className="px-6 py-5 text-right">
                              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 group-hover:text-[#FFCC00] transition-colors"><ArrowUpRight size={18}/></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* Plan Architect Modal */}
      {planModal && <PlanEditorModal onClose={() => setPlanModal(false)} editMode={!!editingPlan} />}
    </div>
  );
}

function PlanEditorModal({ onClose, editMode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg animate-in fade-in duration-300 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-7 border-b border-gray-50 bg-[#FAFAFA] flex justify-between items-center text-black">
           <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{editMode ? 'Edit Plan' : 'Create New Plan'}</h3>
              <p className="text-sm text-gray-500 mt-1">Set pricing, limits, and features for this subscription tier.</p>
           </div>
           <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"><X size={20}/></button>
        </div>
        
        <div className="p-10 max-h-[70vh] overflow-y-auto hidden-scrollbar">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2 px-1">Plan Name</label>
                    <input type="text" placeholder="e.g. Professional" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-6 text-sm font-black text-gray-900 outline-none focus:bg-white focus:border-[#FFCC00]" />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2 px-1">Monthly Price ($)</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black">$</span>
                       <input type="number" placeholder="149" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-10 pr-6 text-xl font-black text-gray-900 outline-none" />
                    </div>
                 </div>
                 
                 <div className="pt-6 border-t border-gray-50 space-y-4">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block px-1 flex items-center gap-2"><TrendingUp size={12}/> Plan Limits</label>
                    <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                       <div className="space-y-2">
                          <div className="flex justify-between px-1">
                             <span className="text-[9px] font-bold text-gray-400 uppercase">Max Vehicles</span>
                             <span className="text-xs font-black text-gray-900">150 Trucks</span>
                          </div>
                          <input type="range" className="w-full h-1 bg-gray-300 rounded-full appearance-none accent-[#FFCC00]" />
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between px-1">
                             <span className="text-[9px] font-bold text-gray-400 uppercase">Max Branches</span>
                             <span className="text-xs font-bold text-gray-900">5</span>
                          </div>
                          <input type="range" className="w-full h-1 bg-gray-300 rounded-full appearance-none accent-[#FFCC00]" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block px-1 flex items-center gap-2"><Zap size={14} className="text-[#FFCC00]"/> Add-on Features</label>
                 <div className="space-y-3">
                    {[
                      { l: 'AI Route Optimization', d: 'Smart routing and auto-dispatch' },
                      { l: 'Cold Chain Monitoring', d: 'Temperature sensor tracking' },
                      { l: 'Stripe Payments', d: 'Automated invoicing for clients' },
                      { l: 'Custom Branding', d: 'Your logo and colors on driver app' }
                    ].map((mod, i) => (
                      <label key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#FFCC00]/5 transition-all cursor-pointer group">
                         <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg border-gray-200 text-[#FFCC00] focus:ring-[#FFCC00]" defaultChecked={i < 2} />
                         <div>
                            <p className="text-sm font-bold text-gray-900 leading-none mb-1.5">{mod.l}</p>
                            <p className="text-[10px] font-bold text-gray-400 leading-tight">{mod.d}</p>
                         </div>
                      </label>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="px-10 py-7 bg-[#FAFAFA] border-t border-gray-50 flex justify-between items-center">
           <button onClick={onClose} className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">Cancel</button>
           <div className="flex gap-4">
              <button onClick={onClose} className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 shadow-sm">Save as Draft</button>
              <button onClick={onClose} className="px-8 py-3 bg-[#FFCC00] hover:bg-[#E6B800] text-black rounded-xl text-sm font-bold shadow-sm active:scale-95">Save & Publish</button>
           </div>
        </div>
      </div>
    </div>
  );
}
