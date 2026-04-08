import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Plus, Clock,
  MapPin, ChevronDown, AlertTriangle,
  CheckCircle2, UserCheck, Inbox, Zap,
  ArrowRight, AlertCircle, Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const QUEUES = [
  { id: 'unassigned', label: 'Unassigned Queue', icon: Inbox,       color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200', desc: 'Confirmed – awaiting driver assignment' },
  { id: 'assigned',   label: 'Active Trips',     icon: Zap,          color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: 'Assigned & in transit' },
  { id: 'exception',  label: 'Exception Queue',  icon: AlertCircle,  color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    desc: 'Delayed, GPS lost, or blocked' },
  { id: 'completed',  label: 'Completed',         icon: CheckCircle2, color: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-200',   desc: 'Successfully delivered' },
];

export default function DispatchJobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [queue, setQueue] = useState('unassigned');
  const [search, setSearch] = useState('');

  const rawJobs = [
    // Unassigned (confirmed, no driver yet)
    { id: 'SHP-9055', branchId: 'SYD-CENTRAL', customer: 'Acme Freight Co', origin: 'Sydney Hub', dest: 'Canberra DC', queue: 'unassigned', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: '11:00 AM', window: '12:00–14:00', load: '6.2t', notes: 'Temperature-controlled cargo' },
    { id: 'SHP-9054', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Port Botany', dest: 'Penrith Hub', queue: 'unassigned', driver: null, vehicle: null, priority: 'Medium', eta: '—', pickup: '12:30 PM', window: '13:00–15:00', load: '2.1t', notes: '' },
    { id: 'SHP-9053', branchId: 'SYD-CENTRAL', customer: 'Fresh Markets AU', origin: 'Flemington Market', dest: 'Randwick DC', queue: 'unassigned', driver: null, vehicle: null, priority: 'High', eta: '—', pickup: '09:00 AM', window: '10:00–11:30', load: '4.8t', notes: 'Perishables — strict window' },

    // Assigned (active trips)
    { id: 'SHP-9042', branchId: 'SYD-CENTRAL', customer: 'Acme Corp Logistics', origin: 'Sydney Hub', dest: 'Melbourne Hub', queue: 'assigned', driver: 'Jack Taylor', vehicle: 'XQG-984', priority: 'High', eta: '14:30', pickup: '06:00 AM', window: 'Delivered by 16:00', load: '18.4t', notes: '' },
    { id: 'SHP-9035', branchId: 'SYD-CENTRAL', customer: 'Southport Logistics', origin: 'Adelaide Hub', dest: 'Sydney Hub', queue: 'assigned', driver: 'Oliver Brown', vehicle: 'V-102', priority: 'High', eta: '10:00', pickup: '05:00 AM', window: 'Delivered by 11:00', load: '12.0t', notes: '' },

    // Exception
    { id: 'SHP-9041', branchId: 'SYD-CENTRAL', customer: 'Tech Solutions Ltd', origin: 'Port Botany', dest: 'Penrith Hub', queue: 'exception', driver: 'Liam Smith', vehicle: 'BGT-221', priority: 'Medium', eta: 'Delayed', pickup: '07:00 AM', window: 'Delivered by 14:00', load: '9.5t', notes: 'Driver reports heavy traffic — ETA +1h', exception: 'Delay' },
    { id: 'SHP-9048', branchId: 'SYD-CENTRAL', customer: 'Blue River Exports', origin: 'Newcastle Port', dest: 'Sydney Hub', queue: 'exception', driver: 'Lucas Jones', vehicle: 'TRK-08', priority: 'High', eta: 'GPS Lost', pickup: '04:00 AM', window: 'Delivered by 09:00', load: '14.2t', notes: 'No GPS update for 18 minutes', exception: 'GPS Lost' },

    // Completed
    { id: 'SHP-9039', branchId: 'SYD-CENTRAL', customer: 'Global Traders AU', origin: 'Brisbane Port', dest: 'Gold Coast DC', queue: 'completed', driver: 'Liam Smith', vehicle: 'KLY-004', priority: 'Low', eta: 'Done', pickup: '03:00 AM', window: 'Delivered by 08:00', load: '5.5t', notes: '' },
  ];

  const branchJobs = useMemo(() =>
    rawJobs.filter(j => j.branchId === user.branchId),
  [user.branchId]);

  const counts = useMemo(() => ({
    unassigned: branchJobs.filter(j => j.queue === 'unassigned').length,
    assigned:   branchJobs.filter(j => j.queue === 'assigned').length,
    exception:  branchJobs.filter(j => j.queue === 'exception').length,
    completed:  branchJobs.filter(j => j.queue === 'completed').length,
  }), [branchJobs]);

  const filtered = useMemo(() => {
    return branchJobs.filter(j => {
      const matchesQueue  = j.queue === queue;
      const matchesSearch = !search || `${j.id} ${j.customer} ${j.driver || ''}`.toLowerCase().includes(search.toLowerCase());
      return matchesQueue && matchesSearch;
    });
  }, [branchJobs, queue, search]);

  const priorityStyle = (p) => {
    if (p === 'High')   return 'bg-red-50 text-red-600 border-red-100';
    if (p === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-gray-50 text-gray-500 border-gray-100';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shipment Queue</h1>
            <p className="text-sm text-gray-500 mt-1">{user.branchName} · Live dispatch operations and exception management</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dispatch/jobs/create')}
          className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Create Shipment
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* ── Queue Selector Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUEUES.map(q => {
          const isActive = queue === q.id;
          const count = counts[q.id];
          return (
            <button
              key={q.id}
              onClick={() => setQueue(q.id)}
              className={`flex flex-col items-start p-5 rounded-xl border-2 transition-all text-left ${
                isActive
                  ? `${q.bg} ${q.border} shadow-md`
                  : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? `${q.bg} ${q.color}` : 'bg-gray-100 text-gray-400'} border ${isActive ? q.border : 'border-gray-200'}`}>
                  <q.icon size={18} />
                </div>
                <span className={`text-2xl font-black ${isActive ? q.color : 'text-gray-900'}`}>{count}</span>
              </div>
              <p className={`text-xs font-black uppercase tracking-widest ${isActive ? q.color : 'text-gray-500'}`}>{q.label}</p>
              <p className="text-[10px] text-gray-400 mt-1 font-medium leading-snug">{q.desc}</p>
            </button>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Filter Bar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center gap-4 bg-[#FAFAFA]">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{QUEUES.find(q=>q.id===queue)?.label}</h3>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5">{filtered.length} shipment{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ID, customer, driver..."
              className="w-72 bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Shipment</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Pickup Window</th>
                <th className="px-6 py-4">Assigned Unit</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <Package size={36} strokeWidth={1} />
                      <p className="text-sm font-bold">No shipments in this queue</p>
                      <p className="text-[11px] font-medium">All clear for this terminal</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(job => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50/80 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-[#FFCC00]"
                  onClick={() => navigate(`/dispatch/jobs/${job.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="font-black text-[#111] text-sm tracking-tight">{job.id}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 truncate max-w-[160px]">{job.customer}</div>
                    {job.notes && (
                      <div className="flex items-center gap-1 mt-1.5 text-[9px] font-bold text-amber-600 uppercase tracking-widest">
                        <AlertTriangle size={10}/> {job.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <span>{job.origin}</span>
                      <ArrowRight size={12} className="text-gray-300 shrink-0"/>
                      <span>{job.dest}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      <Package size={10}/> {job.load}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-gray-700">{job.pickup}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                      <Clock size={10}/> {job.window}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {job.driver ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center font-black text-[10px] text-[#FFCC00] shrink-0 group-hover:border-[#FFCC00] border-2 border-transparent transition-colors">
                          {job.driver.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-[#111] text-xs">{job.driver}</div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{job.vehicle}</div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/dispatch/jobs/${job.id}`); }}
                        className="flex items-center gap-2 text-[10px] font-black text-[#111] bg-[#FFCC00] hover:bg-[#E6B800] px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest shadow-sm"
                      >
                        <UserCheck size={13}/> Assign Now
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border uppercase tracking-widest ${priorityStyle(job.priority)}`}>
                      {queue === 'exception' && job.exception ? job.exception : job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/dispatch/jobs/${job.id}`); }}
                      className={`text-[10px] font-black border px-4 py-1.5 rounded-lg transition-all uppercase tracking-widest ${
                        queue === 'unassigned'
                          ? 'bg-[#FFCC00] border-[#E6B800] text-black hover:bg-[#E6B800]'
                          : queue === 'exception'
                          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {queue === 'unassigned' ? 'Assign →' : queue === 'exception' ? 'Resolve' : 'View'}
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
