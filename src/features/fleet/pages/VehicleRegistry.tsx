import React, { useState, useRef } from 'react';
import {
  Search, Plus, Truck, X, CheckCircle2, AlertCircle,
  Printer, Barcode, Filter, ChevronDown, Tag, Calendar,
  Hash, Car, MapPin, Loader2, Fingerprint, Edit3, Trash2,
  LayoutGrid, List, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Vehicle {
  id: number;
  vin: string;
  plate: string;
  make: string;
  model: string;
  year: string;
  color: string;
  type: string;
  weight: string;
  status: string;
  currentLoad: string | null;
  destination: string;
  customer: string;
  tags: string[];
  image?: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_VEHICLES: Vehicle[] = [
  { id: 1, vin: '1HGCM82633A004352', plate: 'ABC 123', make: 'Toyota', model: 'Camry', year: '2022', color: 'White', type: 'Sedan', weight: '1,450 kg', status: 'In Depot', currentLoad: 'LD-2041', destination: 'Brisbane QLD', customer: 'AutoDeal Pty Ltd', tags: ['Priority', 'Express'], image: 'https://images.unsplash.com/photo-1549194382-246df982469e?q=80&w=800&auto=format&fit=crop' },
  { id: 2, vin: '2T1BURHE0JC034820', plate: 'XYZ 987', make: 'Honda', model: 'CR-V', year: '2023', color: 'Black', type: 'SUV', weight: '1,720 kg', status: 'In Transit', currentLoad: 'LD-2039', destination: 'Melbourne VIC', customer: 'Smith Motors', tags: ['Fragile'], image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop' },
  { id: 3, vin: '5YJSA1DG9PFJ12345', plate: 'EV 0001', make: 'Tesla', model: 'Model S', year: '2024', color: 'Red', type: 'Sedan', weight: '2,162 kg', status: 'Delivered', currentLoad: 'LD-2031', destination: 'Sydney NSW', customer: 'EV Fleet Co', tags: [], image: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=800&auto=format&fit=crop' },
  { id: 4, vin: '3FADP4BJ7FM123456', plate: 'TRK 444', make: 'Ford', model: 'Ranger', year: '2021', color: 'Silver', type: 'Ute', weight: '2,030 kg', status: 'Awaiting Load', currentLoad: null, destination: 'Perth WA', customer: 'WA Motors', tags: ['Oversize'], image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop' },
  { id: 5, vin: '1N4AL3AP7JC234567', plate: 'NIS 202', make: 'Nissan', model: 'X-Trail', year: '2022', color: 'Blue', type: 'SUV', weight: '1,680 kg', status: 'In Depot', currentLoad: 'LD-2042', destination: 'Adelaide SA', customer: 'SA Auto Group', tags: [], image: 'https://images.unsplash.com/photo-1586191582151-f73972d10942?q=80&w=800&auto=format&fit=crop' },
];

const STATUS_META = {
  'In Depot':      { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  'In Transit':    { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500' },
  'Delivered':     { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500' },
  'Awaiting Load': { bg: 'bg-gray-100',  text: 'text-gray-600',   dot: 'bg-gray-400' },
};

const EMPTY_FORM = {
  vin: '', plate: '', make: '', model: '', year: '', color: '',
  type: 'Sedan', weight: '', height: '', length: '', customer: '',
  destination: '', notes: '', tags: '',
};

export default function VehicleRegistry() {
  const navigate = useNavigate();
  const [vehicles, setVehicles]       = useState<Vehicle[]>(MOCK_VEHICLES);
  const [search, setSearch]           = useState('');
  const [showModal, setShowModal]     = useState(false);
  const [form, setForm]               = useState<any>(EMPTY_FORM);
  const [errors, setErrors]           = useState<any>({});
  const [vinChecking, setVinChecking] = useState(false);
  const [vinOk, setVinOk]            = useState<string | null>(null);
  const [labelVehicle, setLabelVehicle] = useState<Vehicle | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const [assignLoadModal, setAssignLoadModal] = useState<Vehicle | null>(null);
  const [loadInput, setLoadInput] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = vehicles.filter(v => {
    const matchesSearch = v.vin.toLowerCase().includes(search.toLowerCase()) ||
                        v.plate.toLowerCase().includes(search.toLowerCase()) ||
                        v.make.toLowerCase().includes(search.toLowerCase()) ||
                        v.model.toLowerCase().includes(search.toLowerCase()) ||
                        v.destination.toLowerCase().includes(search.toLowerCase()) ||
                        v.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateVehicleStatus = (id: number, status: string) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const handleEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setForm({
      ...v,
      tags: v.tags.join(', ')
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingVehicle) {
      setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? {
        ...v,
        ...form,
        tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : v.tags
      } : v));
    } else {
      const newVehicle = {
        ...form,
        id: Math.max(...vehicles.map(v => v.id)) + 1,
        status: 'Awaiting Load',
        currentLoad: null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop'
      };
      setVehicles(prev => [newVehicle, ...prev]);
    }
    setShowModal(false);
  };

  const statuses = ['All', 'Awaiting Load', 'In Depot', 'In Transit', 'Delivered'];

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1440px] mx-auto pb-12 px-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="hero-h1">Asset Inventory</h1>
          <p className="hero-body text-gray-600 mt-1">{vehicles.length} assets registered · Global VIN Search</p>
        </div>
        <button
          onClick={() => { setEditingVehicle(null); setShowModal(true); setForm(EMPTY_FORM); setErrors({}); setVinOk(null); }}
          className="btn btn-dark"
        >
          <Plus size={18} strokeWidth={3} /> Register Asset
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Batch Actions ── */}
      {selectedIds.length > 0 && (
        <div className="bg-[#111] text-white p-4 rounded-3xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2 border border-gray-800 mb-2">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded bg-brand-yellow text-black flex items-center justify-center font-bold">{selectedIds.length}</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Assets Selected</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Synchronized Registry Operations</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all">Audit VIN</button>
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all">Export Tags</button>
            <button onClick={() => setSelectedIds([])} className="p-2.5 hover:bg-white/10 rounded-xl transition-all"><X size={16}/></button>
          </div>
        </div>
      )}

      {/* ── Search + Filter Bar ── */}
      <div className="flex items-center gap-4 flex-wrap mb-2">
        <div className="relative flex-1 min-w-[300px] group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-yellow transition-colors" />
          <input
            type="text"
            placeholder="Search VIN, Plate, Make, Model, Destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-brand-yellow/10 focus:border-brand-yellow transition-all shadow-sm"
          />
        </div>

        <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1 border border-gray-200">
           <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-gray-900' : 'text-gray-400'}`}><List size={18}/></button>
           <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-gray-900' : 'text-gray-400'}`}><LayoutGrid size={18}/></button>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${
                statusFilter === s
                  ? 'bg-white text-gray-900 shadow-md border border-gray-200'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Vehicle Content ── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-[#FAFAFA]">
                  <th className="py-5 px-6 w-4">
                    <input
                      type="checkbox"
                      onChange={(e) => setSelectedIds(e.target.checked ? filtered.map(v => v.id) : [])}
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      className="w-4 h-4 rounded border-gray-300 accent-[#111] cursor-pointer"
                    />
                  </th>
                  <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Registered Asset</th>
                  <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">VIN / Plate</th>
                  <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Operational Status</th>
                  <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Current Task</th>
                  <th className="py-5 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Target</th>
                  <th className="py-5 px-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-24 text-center text-gray-400 uppercase tracking-widest font-bold">No assets found</td>
                  </tr>
                ) : filtered.map(v => {
                  const sm = STATUS_META[v.status] || STATUS_META['Awaiting Load'];
                  return (
                    <tr
                      key={v.id}
                      onClick={() => navigate(`/admin/fleet/${v.plate}`)}
                      className={`hover:bg-gray-50/70 transition-all group cursor-pointer border-l-4 ${selectedIds.includes(v.id) ? 'border-l-brand-yellow bg-yellow-50/10' : 'border-l-transparent'}`}
                    >
                      <td className="py-5 px-6 w-4" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(v.id)}
                          onChange={() => toggleSelect(v.id)}
                          className="w-4 h-4 rounded border-gray-300 accent-[#111] cursor-pointer"
                        />
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden group-hover:border-transparent transition-all">
                             {v.image ? (
                               <img src={v.image} alt={v.make} className="w-full h-full object-cover" />
                             ) : (
                               <Car size={24} className="text-gray-400 group-hover:text-hero-dark" />
                             )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm leading-none">{v.year} {v.make} {v.model}</p>
                            <p className="text-xs font-medium text-gray-500 mt-1.5">{v.color} · {v.type} · {v.weight}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="inline-block py-1 bg-gray-50 border border-gray-200 rounded font-mono text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          {v.vin}
                        </div>
                        <p className="text-xs font-medium text-gray-500 ml-1">{v.plate}</p>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-widest border ${sm.bg} ${sm.text} border-transparent shadow-sm`}>
                          <span className={`w-1.5 h-1.5 rounded-full w-fit ${sm.dot}`} />
                          {v.status}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        {v.currentLoad
                          ? <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm">{v.currentLoad}</span>
                          : <span className="text-xs font-medium text-gray-400">Available</span>}
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-gray-900 text-xs font-semibold">
                          <MapPin size={14} className="text-emerald-500 shrink-0" />
                          {v.destination}
                        </div>
                        <p className="text-xs font-medium text-gray-500 mt-1">{v.customer}</p>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                          <button onClick={() => handleEdit(v)} className="p-2.5 rounded-xl bg-violet-50 text-violet-600 hover:bg-black hover:text-white transition-all border border-violet-100 shadow-sm active:scale-95"><Edit3 size={16}/></button>
                          <button className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm active:scale-95"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50/50">
             {filtered.map(v => {
                const sm = STATUS_META[v.status] || STATUS_META['Awaiting Load'];
                return (
                   <div 
                     key={v.id}
                     onClick={() => navigate(`/admin/fleet/${v.plate}`)}
                     className={`relative bg-white rounded-3xl border transition-all cursor-pointer group overflow-hidden ${selectedIds.includes(v.id) ? 'border-brand-yellow ring-4 ring-brand-yellow/10 shadow-2xl' : 'border-gray-100 hover:shadow-2xl hover:-translate-y-2'}`}
                   >
                      {/* Checkbox Overlay */}
                      <div className="absolute top-4 left-4 z-10" onClick={e => e.stopPropagation()}>
                         <input 
                           type="checkbox"
                           checked={selectedIds.includes(v.id)}
                           onChange={() => toggleSelect(v.id)}
                           className="w-5 h-5 rounded-lg border-white/20 accent-brand-yellow shadow-xl cursor-pointer"
                         />
                      </div>

                      {/* Image Header */}
                      <div className="aspect-[16/10] w-full bg-gray-900 relative overflow-hidden">
                         <img src={v.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={v.id.toString()} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div>
                               <h3 className="text-white font-bold text-lg leading-none">{v.year} {v.make}</h3>
                               <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1.5">{v.vin}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${sm.bg} ${sm.text} border-none`}>
                               {v.status}
                            </span>
                         </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Target Office</p>
                               <p className="text-sm font-bold text-gray-900">{v.destination}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Plate</p>
                               <p className="text-sm font-bold text-gray-900">{v.plate}</p>
                            </div>
                         </div>

                         <div className="w-full h-px bg-gray-100 mb-4"></div>

                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                                  <Car size={14}/>
                               </div>
                               <div>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</p>
                                  <p className="text-xs font-bold text-gray-700">{v.type}</p>
                               </div>
                            </div>
                            <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                               <button onClick={() => handleEdit(v)} className="p-2 bg-gray-50 hover:bg-black hover:text-white rounded-lg transition-all border border-gray-100">
                                  <Edit3 size={14}/>
                               </button>
                               <button className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all border border-red-100">
                                  <Trash2 size={14}/>
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                );
             })}
          </div>
        )}
      </div>
    </div>
  );
}
