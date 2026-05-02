import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, MessageSquare, Paperclip, Mic, User, Bell, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DispatchMessages() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [threads, setThreads] = useState([
    { id: 1, name: 'Noah Williams',  role: 'Driver (TRK-05)', msg: 'Traffic is fully stopped now...', time: '10:42 AM', unread: 2 },
    { id: 2, name: 'Jack Taylor',    role: 'Driver (TRK-12)', msg: 'ETA is looking good. Reaching in 45m.', time: '09:15 AM', unread: 0 },
    { id: 3, name: 'Warehouse A',    role: 'Inbound Team',    msg: 'Manifest LOD-044 is ready for assignment.', time: 'Yesterday', unread: 0 },
  ]);

  const [activeThreadId, setActiveThreadId] = useState(1);
  const [messageStore, setMessageStore] = useState({
    1: [
      { id: 1, text: "Hi Dispatch. Encountering severe traffic on the Pacific Highway bypass.", time: "10:30 AM", sender: "driver" },
      { id: 2, text: "Noted Noah. ETA updated to 1h 15m in the system. Let me know if you need a reroute.", time: "10:35 AM", sender: "dispatch" },
      { id: 3, text: "Traffic is fully stopped now. There's an accident ahead. Trying to find an alternate local road.", time: "10:42 AM", sender: "driver" }
    ],
    2: [
      { id: 1, text: "ETA is looking good. Reaching in 45m.", time: "09:15 AM", sender: "driver" }
    ],
    3: [
      { id: 1, text: "Manifest LOD-044 is ready for assignment.", time: "Yesterday", sender: "driver" }
    ]
  });

  const [inputValue, setInputValue] = useState("");

  const activeThread = threads.find(t => t.id === activeThreadId);
  const activeMessages = messageStore[activeThreadId] || [];

  const handleSelectThread = (id) => {
    setActiveThreadId(id);
    setThreads(threads.map(t => t.id === id ? { ...t, unread: 0 } : t));
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'dispatch'
    };

    setMessageStore(prev => ({
      ...prev,
      [activeThreadId]: [...(prev[activeThreadId] || []), newMsg]
    }));
    
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 ">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-[#111] shadow-sm">
            <MessageSquare size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Communication Depot</h1>
            <p className="hero-body text-gray-600 mt-1">Real-time driver dispatch alerts and terminal broadcasts</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="flex bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden h-[calc(100vh-14rem)] min-h-[600px]">
        {/* ── Chat List ── */}
        <div className="w-80 border-r border-gray-100 flex flex-col bg-[#FAFAFA] shrink-0">
          <div className="p-5 border-b border-gray-100 bg-white space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 tracking-tight">Messages</h3>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-yellow transition-colors" size={16} />
              <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-yellow/20 focus:border-brand-yellow transition-all" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {threads.map(t => (
              <div 
                key={t.id} 
                onClick={() => handleSelectThread(t.id)}
                className={`p-5 border-b border-gray-100 cursor-pointer transition-all ${
                  activeThreadId === t.id 
                    ? 'bg-blue-50 border-l-4 border-l-brand-yellow shadow-sm' 
                    : t.unread ? 'bg-white shadow-sm border-l-4 border-l-brand-yellow' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`font-bold text-[13px] tracking-tight ${t.unread || activeThreadId === t.id ? 'text-gray-900' : 'text-gray-700'}`}>{t.name}</span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.time}</span>
                </div>
                <div className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">{t.role}</div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate pr-4 ${t.unread ? 'text-gray-800 font-bold' : 'text-gray-500 font-medium'}`}>{t.msg}</p>
                  {t.unread > 0 && (
                    <span className="w-5 h-5 rounded-md bg-[#111] text-brand-yellow flex items-center justify-center text-xs font-semibold shrink-0 shadow-sm">{t.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Active Chat Window ── */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10 shadow-sm">
            <div 
              onClick={() => navigate('/dispatch/drivers/DRV-102')}
              className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-all"
            >
               <div className="w-11 h-11 rounded border-2 border-transparent bg-[#111] flex items-center justify-center font-semibold text-brand-yellow text-sm group-hover:scale-105 transition-transform">
                 {activeThread.name.split(' ').map(n=>n[0]).join('')}
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 text-sm tracking-tight group-hover:underline">{activeThread.name}</h3>
                 <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="w-1.5 h-1.5 rounded-full w-fit bg-emerald-500"></span>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Status</p>
                 </div>
               </div>
            </div>
            <div className="flex gap-2 relative">
              <button className="p-2.5 text-gray-400 border border-gray-100 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Phone size={18}/></button>
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className={`p-2.5 border rounded-lg transition-all ${showOptions ? 'bg-[#111] text-brand-yellow border-black shadow-md' : 'text-gray-400 border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                >
                  <MoreVertical size={18}/>
                </button>
                
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 origin-top-right">
                    <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors uppercase tracking-widest">
                      <User size={14} className="text-gray-400" /> View Driver Profile
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors uppercase tracking-widest">
                      <Bell size={14} className="text-gray-400" /> Mute Conversation
                    </button>
                    <div className="h-px bg-gray-50 my-1 mx-2"></div>
                    <button 
                      onClick={() => { setMessageStore(prev => ({ ...prev, [activeThreadId]: [] })); setShowOptions(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors uppercase tracking-widest"
                    >
                      <Trash2 size={14} /> Clear Conversation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA] flex flex-col gap-5">
            <div className="text-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 border border-gray-200/60 px-3 py-1 rounded-md">Today, 10:30 AM</span>
            </div>
            
            {activeMessages.map((m) => (
               <div key={m.id} className={`flex flex-col gap-1.5 max-w-[70%] ${m.sender === 'dispatch' ? 'self-end' : ''}`}>
                  <div className={`p-4 rounded-xl shadow-sm text-[13px] font-medium leading-relaxed ${m.sender === 'dispatch' ? 'bg-brand-yellow text-black rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'}`}>
                    {m.text}
                  </div>
                  <span className={`text-xs font-bold text-gray-400 uppercase tracking-widest ${m.sender === 'dispatch' ? 'text-right mr-1' : 'ml-1'}`}>{m.time} {m.sender === 'dispatch' ? '✓✓' : ''}</span>
               </div>
            ))}
          </div>

          <div className="p-5 bg-white border-t border-gray-100 shrink-0">
            <div className="relative group">
               <textarea 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder={`Message ${activeThread.name.split(' ')[0]}...`} 
                 className="w-full border border-gray-200 bg-white rounded-2xl px-4 pt-3.5 pb-14 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-yellow/20 focus:border-brand-yellow transition-all min-h-[110px] font-medium shadow-sm"
               />
               <div className="absolute bottom-3 left-3 flex gap-1">
                  <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-all">
                     <Paperclip size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-all">
                     <Mic size={18} />
                  </button>
               </div>
               <div className="absolute bottom-3 right-3">
                  <button onClick={handleSendMessage} className="bg-[#111] hover:bg-black text-brand-yellow px-5 py-2 rounded-xl transition-all shadow-md h-[40px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest active:scale-95">
                    <Send size={16} /> Send
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




