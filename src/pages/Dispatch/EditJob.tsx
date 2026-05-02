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

export default function DispatchEditJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  // Header State
  const [customer, setCustomer] = useState('Acme Corp Logistics');
  const [customerLoadNum, setCustomerLoadNum] = useState('ACME-221');
  const [origin, setOrigin] = useState('Sydney Depot');
  const [destination, setDestination] = useState('Melbourne Branch');
  const [priority, setPriority] = useState('High');
  
  // Multi-item state
  const [items, setItems] = useState([
    { ...createItem(1), makeModel: 'Toyota Hilux', vin: '7T1...882', rego: 'XQG-984', stockNumber: 'STK-4405' }
  ]);
  const [nextId, setNextId] = useState(2);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
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
    navigate(`/dispatch/loads/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/dispatch/loads/${id}`)}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Edit Job <span className="text-brand">{id}</span></h1>
              <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">Command Overwrite</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 font-medium italic">Adjusting operational manifest & shipment flow</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate(`/dispatch/loads/${id}`)}
            className="flex-1 md:flex-none px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            Discard
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 md:flex-none px-10 py-3 bg-gray-900 hover:bg-black text-brand rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Save size={20} strokeWidth={2.5} /> Commit Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: PRIMARY CONFIG */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* ADMINISTRATIVE REFERENCES */}
          <div className="bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 shadow-sm border border-violet-100">
                  <Shield size={24} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">Administrative References</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-widest">Billing & Compliance Identifiers</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Customer Load Number (Ref #) *</label>
                  <div className="relative group">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={customerLoadNum}
                      onChange={e => setCustomerLoadNum(e.target.value)}
                      placeholder="e.g. COKE-12345" 
                      className="w-full bg-gray-50 border border-gray-100 focus:border-violet-400 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 shadow-inner transition-all focus:outline-none focus:ring-4 focus:ring-violet-500/10" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Internal Dept. Code</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input type="text" placeholder="Optional cost center" className="w-full bg-gray-50 border border-gray-100 focus:border-violet-400 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 shadow-inner transition-all focus:outline-none focus:ring-4 focus:ring-violet-500/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOAD ITEMS SECTION */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                  <Package size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">Shipment Manifest</h2>
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-brand rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
              >
                <Plus size={16} strokeWidth={3} /> Add Item
              </button>
            </div>

            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gray-900 text-brand flex items-center justify-center font-black text-sm shadow-sm">{index + 1}</span>
                      <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Cargo Detail</h3>
                    </div>
                    {items.length > 1 && (
                      <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-8">
                    {/* Niche Selector */}
                    <div className="flex gap-4 mb-8">
                      {[
                        { id: 'vehicle', label: 'Vehicle', icon: Truck, color: 'blue' },
                        { id: 'dangerous', label: 'Hazmat', icon: AlertTriangle, color: 'orange' },
                        { id: 'general', label: 'Freight', icon: Package, color: 'gray' },
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => updateItem(item.id, 'niche', type.id)}
                          className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold text-sm ${
                            item.niche === type.id 
                            ? `bg-${type.color}-50 border-${type.color}-500 text-${type.color}-700 shadow-md scale-[1.02]` 
                            : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                          }`}
                        >
                          <type.icon size={18} /> {type.label}
                        </button>
                      ))}
                    </div>

                    {/* Dynamic Fields based on Niche */}
                    {item.niche === 'vehicle' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/30 p-6 rounded-2xl border border-blue-100/50">
                        <div>
                          <label className="block text-xs font-bold text-blue-800 uppercase tracking-widest mb-2.5 ml-1">VIN / Chassis # *</label>
                          <input 
                            type="text" 
                            value={item.vin}
                            onChange={e => updateItem(item.id, 'vin', e.target.value)}
                            placeholder="e.g. 7T1...882" 
                            className="w-full bg-white border border-blue-200 focus:border-blue-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-blue-800 uppercase tracking-widest mb-2.5 ml-1">Registration #</label>
                          <input 
                            type="text" 
                            value={item.rego}
                            onChange={e => updateItem(item.id, 'rego', e.target.value)}
                            placeholder="e.g. XQG-984" 
                            className="w-full bg-white border border-blue-200 focus:border-blue-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-blue-800 uppercase tracking-widest mb-2.5 ml-1">Make / Model</label>
                          <input 
                            type="text" 
                            value={item.makeModel}
                            onChange={e => updateItem(item.id, 'makeModel', e.target.value)}
                            placeholder="e.g. Toyota Hilux" 
                            className="w-full bg-white border border-blue-200 focus:border-blue-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-blue-800 uppercase tracking-widest mb-2.5 ml-1">Stock / Item # *</label>
                          <input 
                            type="text" 
                            value={item.stockNumber}
                            onChange={e => updateItem(item.id, 'stockNumber', e.target.value)}
                            placeholder="e.g. STK-9901" 
                            className="w-full bg-white border border-blue-200 focus:border-blue-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10" 
                          />
                        </div>
                      </div>
                    ) : item.niche === 'dangerous' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-orange-50/30 p-6 rounded-2xl border border-orange-100/50">
                        <div>
                          <label className="block text-xs font-bold text-orange-800 uppercase tracking-widest mb-2.5 ml-1">UN Number</label>
                          <input type="text" value={item.unNumber} onChange={e => updateItem(item.id, 'unNumber', e.target.value)} placeholder="e.g. 1263" className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-orange-500/10" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-orange-800 uppercase tracking-widest mb-2.5 ml-1">Class</label>
                          <input type="text" value={item.hazardClass} onChange={e => updateItem(item.id, 'hazardClass', e.target.value)} placeholder="e.g. 3" className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-orange-500/10" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-orange-800 uppercase tracking-widest mb-2.5 ml-1">Proper Shipping Name</label>
                          <input type="text" value={item.dgName} onChange={e => updateItem(item.id, 'dgName', e.target.value)} placeholder="e.g. Paint" className="w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-orange-500/10" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200/50">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2.5 ml-1">Description</label>
                          <input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="e.g. General Cargo" className="w-full bg-white border border-gray-200 focus:border-gray-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-500/10" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2.5 ml-1">Weight (kg)</label>
                          <input type="text" value={item.weight} onChange={e => updateItem(item.id, 'weight', e.target.value)} placeholder="e.g. 500" className="w-full bg-white border border-gray-200 focus:border-gray-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-500/10" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2.5 ml-1">Dimensions</label>
                          <input type="text" value={item.dimensions} onChange={e => updateItem(item.id, 'dimensions', e.target.value)} placeholder="e.g. 1x1x1m" className="w-full bg-white border border-gray-200 focus:border-gray-500 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-gray-500/10" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ROUTING & SUMMARY */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* LOGISTICS ROUTING */}
          <div className="bg-[#111] rounded-[2.5rem] p-8 text-white shadow-2xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand/5 rounded-full w-fit blur-3xl group-hover:bg-brand/10 transition-all"></div>
            
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-brand flex items-center gap-3 relative z-10">
              <Zap size={18} className="animate-pulse" /> Routing Override
            </h3>
            
            <div className="space-y-10 relative z-10">
              <div className="relative pl-8 border-l-2 border-dashed border-gray-800 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full w-fit bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <MapPin size={12} className="text-white" />
                </div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Origin Location</label>
                <input 
                  type="text" 
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  placeholder="e.g. Sydney Terminal" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-brand/50 transition-all" 
                />
              </div>

              <div className="relative pl-8 border-l-2 border-transparent">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full w-fit bg-brand flex items-center justify-center shadow-[0_0_15px_rgba(255,191,0,0.3)]">
                  <Truck size={12} className="text-black" />
                </div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Final Destination</label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="e.g. Perth Depot" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-brand/50 transition-all" 
                />
              </div>

              <div className="pt-8 border-t border-gray-800 space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Priority Status</label>
                  <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        onClick={() => setPriority(level)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${
                          priority === level ? 'bg-brand text-black shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK SUMMARY CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl flex flex-col gap-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Modification Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-500">Items to Process</span>
                <span className="text-lg font-black text-gray-900">{items.length}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-500">Job Reference</span>
                <span className="text-xs font-black px-3 py-1 bg-brand text-black rounded-lg uppercase tracking-widest">Active Link</span>
              </div>
            </div>
            
            <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100/50">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold text-blue-700 leading-relaxed uppercase tracking-tight">
                  Updates will sync to the driver's device immediately upon saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
