import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, Plus, Trash2, Package, Truck, 
  MapPin, Clock, Shield, Layers, Building2, AlertTriangle, 
  Zap, Info, CheckCircle2, X, ChevronRight, Fuel, Weight
} from 'lucide-react';

const createItem = (id) => ({
  id,
  niche: 'vehicle', // 'vehicle' | 'dangerous' | 'general'
  // Car specific
  vin: '',
  rego: '',
  makeModel: '',
  stockNumber: '',
  // Dangerous Goods specific
  unNumber: '',
  hazardClass: '',
  dgName: '',
  // General specific
  description: '',
  weight: '',
  dimensions: ''
});

export default function DriverEditJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  // Multi-item state
  const [items, setItems] = useState([
    { ...createItem(1), makeModel: 'Toyota Hilux', vin: '7T1...882', rego: 'XQG-984', stockNumber: 'STK-4405' }
  ]);
  const [nextId, setNextId] = useState(2);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const addItem = () => {
    setItems([...items, createItem(nextId)]);
    setNextId(nextId + 1);
  };

  const removeItem = (id) => {
    if (items.length === 1) return;
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    // Simulate save
    navigate(`/driver/loads/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-yellow"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24">
      {/* Mobile Header */}
      <div className="bg-white px-5 py-4 border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/driver/loads/${id}`)}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-none">Edit Manifest</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{id}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="bg-brand-yellow text-black px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm active:scale-95"
        >
          Save
        </button>
      </div>

      <div className="p-4 space-y-6">
        
        {/* INFO BOX */}
        <div className="bg-violet-600 rounded-3xl p-5 text-white shadow-xl shadow-violet-100 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                 <Shield size={16} className="text-brand-yellow" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-violet-200">Editor Authority</h3>
              </div>
              <p className="text-sm font-bold leading-relaxed">
                 You are modifying the shipment manifest. All changes are logged for terminal audit.
              </p>
           </div>
           <div className="absolute -right-4 -bottom-4 opacity-10">
              <Zap size={80} />
           </div>
        </div>

        {/* ITEMS LIST */}
        <div className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Shipment Items ({items.length})</h2>
              <button 
                onClick={addItem}
                className="text-xs font-bold text-violet-600 flex items-center gap-1.5"
              >
                 <Plus size={14} /> Add Item
              </button>
           </div>

           {items.map((item, index) => (
             <div key={item.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Item #{index + 1}</span>
                   {items.length > 1 && (
                     <button onClick={() => removeItem(item.id)} className="text-red-400 p-1">
                        <Trash2 size={14} />
                     </button>
                   )}
                </div>
                
                <div className="p-6 space-y-6">
                   {/* Niche Icons for Mobile */}
                   <div className="flex gap-2">
                      {[
                        { id: 'vehicle', icon: Truck, label: 'Vehicle' },
                        { id: 'dangerous', icon: AlertTriangle, label: 'Hazmat' },
                        { id: 'general', icon: Package, label: 'Freight' },
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => updateItem(item.id, 'niche', type.id)}
                          className={`flex-1 py-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
                            item.niche === type.id 
                            ? 'bg-violet-50 border-violet-200 text-violet-600 shadow-sm' 
                            : 'bg-white border-gray-100 text-gray-400'
                          }`}
                        >
                          <type.icon size={18} />
                          <span className="text-[9px] font-black uppercase tracking-widest">{type.label}</span>
                        </button>
                      ))}
                   </div>

                   {/* Form Fields */}
                   {item.niche === 'vehicle' ? (
                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">VIN / Chassis #</label>
                           <input 
                             type="text" 
                             value={item.vin}
                             onChange={e => updateItem(item.id, 'vin', e.target.value)}
                             placeholder="Enter VIN" 
                             className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock / Item #</label>
                           <input 
                             type="text" 
                             value={item.stockNumber}
                             onChange={e => updateItem(item.id, 'stockNumber', e.target.value)}
                             placeholder="e.g. STK-440" 
                             className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Make / Model</label>
                              <input 
                                type="text" 
                                value={item.makeModel}
                                onChange={e => updateItem(item.id, 'makeModel', e.target.value)}
                                placeholder="Toyota..." 
                                className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                              />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rego</label>
                              <input 
                                type="text" 
                                value={item.rego}
                                onChange={e => updateItem(item.id, 'rego', e.target.value)}
                                placeholder="XQG..." 
                                className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                              />
                           </div>
                        </div>
                     </div>
                   ) : (
                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                           <input 
                             type="text" 
                             value={item.description}
                             onChange={e => updateItem(item.id, 'description', e.target.value)}
                             placeholder="Cargo description" 
                             className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                              <input 
                                type="text" 
                                value={item.weight}
                                onChange={e => updateItem(item.id, 'weight', e.target.value)}
                                placeholder="500" 
                                className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                              />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dimensions</label>
                              <input 
                                type="text" 
                                value={item.dimensions}
                                onChange={e => updateItem(item.id, 'dimensions', e.target.value)}
                                placeholder="1x1x1m" 
                                className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-violet-500/20" 
                              />
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </div>
           ))}
        </div>

        {/* COMPLIANCE NOTE */}
        <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
           <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-tight leading-relaxed">
                 Double-check VIN and Stock Numbers. Mismatched identifiers may delay terminal clearance and billing.
              </p>
           </div>
        </div>

      </div>

      {/* Bottom Nav Spacer */}
      <div className="h-20"></div>
    </div>
  );
}
