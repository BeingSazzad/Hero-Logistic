import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, AlertTriangle, 
  Navigation, CheckCircle2, Camera, 
  Signature, Clock, ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActiveTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState('EnRoute'); // EnRoute, Arrived, Unloading, Finalizing
  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    let interval;
    if (step === 'Arrived') {
      interval = setInterval(() => setWaitTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col bg-gray-50 pb-20">
      
      {/* ── 1. Header ── */}
      <div className="bg-gray-900 px-5 py-4 flex items-center justify-between text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <Navigation size={18} className="text-yellow-400" />
           </div>
           <div>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Active Manifest</p>
              <h1 className="text-base font-bold tracking-tight leading-none">SHP-20481</h1>
           </div>
        </div>
        <button className="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center border border-red-500/20 active:scale-90 transition-transform">
           <ShieldAlert size={20} className="animate-pulse" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        
        {/* ── 2. Main action Card ── */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-5">
           
           <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Drop-off Point</span>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">127 York St, Sydney CBD</h2>
              <p className="text-xs font-medium text-gray-500 mt-0.5 flex items-center gap-1.5">
                <MapPin size={12} className="text-blue-500"/> Level 4 · John Smith (Manager)
              </p>
           </div>

           <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                 <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Distance</p>
                 <p className="font-bold text-gray-900 text-base">2.4<span className="text-[10px] font-medium ml-0.5">km</span></p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                 <p className="text-[10px] font-medium text-amber-600 uppercase tracking-wider mb-1">ETA</p>
                 <p className="font-bold text-amber-700 text-base">07:35</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                 <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Window</p>
                 <p className="font-bold text-gray-900 text-base">08:00</p>
              </div>
           </div>

           {/* Dynamic Action Zone */}
           <div>
              {step === 'EnRoute' && (
                <div className="flex gap-3">
                   <button 
                     onClick={() => setStep('Arrived')}
                     className="flex-[5] bg-gray-900 hover:bg-black text-[#FACC15] font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                   >
                      <CheckCircle2 size={16} /> Confirm Arrival
                   </button>
                   <button className="flex-1 bg-white border border-gray-200 text-gray-400 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                      <Phone size={18} />
                   </button>
                </div>
              )}

              {step === 'Arrived' && (
                <div className="space-y-3">
                   <div className="bg-emerald-50 text-emerald-700 px-5 py-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider mb-1">Wait Timer</p>
                         <p className="text-xl font-bold">{formatTime(waitTime)}</p>
                      </div>
                      <CheckCircle2 size={28} className="opacity-30" />
                   </div>
                   <button 
                     onClick={() => setStep('Unloading')}
                     className="w-full bg-[#FACC15] hover:bg-yellow-500 text-black font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                   >
                     Start Delivery Process
                   </button>
                </div>
              )}

              {step === 'Unloading' && (
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center gap-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors group">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                           <Camera size={20}/>
                         </div>
                         <span className="text-xs font-semibold text-gray-600">Photo Proof</span>
                      </button>
                      <button className="flex flex-col items-center justify-center gap-2 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-colors group">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                           <Signature size={20}/>
                         </div>
                         <span className="text-xs font-semibold text-gray-600">Signature</span>
                      </button>
                   </div>
                   <button 
                     onClick={() => setStep('Finalizing')}
                     className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                   >
                     Complete & Upload
                   </button>
                </div>
              )}

              {step === 'Finalizing' && (
                <div className="text-center py-4">
                   <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                   </div>
                   <h2 className="text-xl font-bold text-gray-900">Delivery Complete</h2>
                   <p className="text-xs font-medium text-gray-500 mt-2 mb-6 leading-relaxed">Photos and signatures synced to central hub.</p>
                   <button 
                     onClick={() => navigate('/driver')}
                     className="w-full bg-gray-900 hover:bg-black text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                   >
                     Back to Dashboard
                   </button>
                </div>
              )}
           </div>
        </div>

        {/* ── 3. Shift Summary ── */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-800">Shift Summary</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Online</span>
           </div>
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                 <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Time Driven</p>
                 <p className="text-lg font-bold text-gray-900">0h 12m</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                 <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Duty Left</p>
                 <p className="text-lg font-bold text-[#FACC15]">11h 48m</p>
              </div>
           </div>
        </div>

        {/* ── 4. Route Stops ── */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
           <h3 className="text-sm font-bold text-gray-800 mb-5">Route Stops</h3>
           <div className="space-y-6 relative">
              <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-gray-100"></div>
              
              <div className="flex items-center gap-4 relative">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 outline outline-4 outline-white shadow-sm shrink-0 z-10"></div>
                 <div>
                    <p className="text-sm font-semibold text-gray-400 line-through">Safety Check Alpha</p>
                    <p className="text-xs font-medium text-emerald-600 mt-0.5">Completed · 07:15</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 relative">
                 <div className={`w-2.5 h-2.5 rounded-full outline outline-4 outline-white shadow-sm shrink-0 z-10 ${step === 'Finalizing' ? 'bg-emerald-500' : 'bg-[#FACC15] animate-pulse'}`}></div>
                 <div>
                    <p className={`text-sm font-semibold ${step === 'Finalizing' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>Pickup #1 · York St</p>
                    {step !== 'Finalizing' && <p className="text-xs font-medium text-amber-600 mt-0.5 flex items-center gap-1"><Clock size={10}/> In Progress</p>}
                 </div>
              </div>

              <div className="flex items-center gap-4 relative">
                 <div className="w-2.5 h-2.5 rounded-full bg-gray-200 outline outline-4 outline-white shadow-sm shrink-0 z-10"></div>
                 <div>
                    <p className="text-sm font-semibold text-gray-300">Final Stop · Warehouse SYD</p>
                 </div>
              </div>

           </div>
        </div>

      </div>

    </div>
  );
}
