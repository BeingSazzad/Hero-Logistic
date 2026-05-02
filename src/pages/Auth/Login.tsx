import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const roles = [
  { value: 'platform', label: 'Platform Owner — SaaS Management Console' },
  { value: 'admin', label: 'Super Admin — Company Oversight & Governance' },
  { value: 'dispatch', label: 'Dispatcher — Core Operations Workspace' },
  { value: 'accounts', label: 'Accounts — Finance & Billing Control' },
  { value: 'warehouse', label: 'Warehouse — Floor & Inventory Management' },
  { value: 'driver', label: 'Driver — Mobile PWA App' },
  { value: 'customer', label: 'Customer Portal — Tracking & Invoices' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('dispatch');
  const [showPass, setShowPass] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();

    // Map internal role values to display roles used in state logic
    const roleMap = {
      'platform': 'Platform Admin',
      'admin': 'Super Admin',
      'dispatch': 'Dispatcher',
      'accounts': 'Accounts',
      'warehouse': 'Warehouse',
      'driver': 'Driver',
      'customer': 'Customer'
    };

    const userData = {
      name: 'Sarah Mitchell',
      role: roleMap[role] || role,
      branchId: 'SYD-CENTRAL',
      branchName: 'Sydney Central Depot',
      email: 'sarah.m@herologistics.com'
    };

    setUser(userData);
    navigate('/' + role);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero_bg.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />
        
        <div className="relative z-10 flex items-center mb-8">
          <img
            src="/logo.png"
            alt="HERO Logistics"
            className="h-28 w-auto object-contain cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        <div className="relative z-10">
          <div className="inline-block bg-brand-yellow text-black text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-6 tracking-wider uppercase">
            Logistics &amp; Trucking SaaS
          </div>
          <h2 className="text-white text-5xl font-bold leading-tight mb-4 tracking-tight">
            Operations at<br />the speed of trust.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-sm font-medium">
            Manage dispatch, fleet, drivers, and deliveries from a single powerful workspace built for enterprise logistics.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {['Real-time fleet tracking', 'Multi-role access control', 'Offline-capable driver app'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full w-fit bg-brand-yellow/20 flex items-center justify-center border border-brand-yellow/30">
                  <div className="w-2.5 h-2.5 rounded-full w-fit bg-brand-yellow shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                </div>
                <span className="text-gray-100 text-base font-semibold">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-gray-400 text-xs font-medium">© 2026 HERO Logistics. All rights reserved.</p>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center justify-center mb-10">
            <img
              src="/logo.png"
              alt="HERO Logistics"
              className="h-24 w-auto object-contain cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 text-base mt-2">Sign in to your workspace</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2.5 ml-1">Email Address</label>
              <input
                type="email"
                defaultValue="sarah@hero.com"
                required
                className="input"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2.5 ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                <a href="#" className="text-xs text-brand-orange font-bold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  defaultValue="password123"
                  required
                  className="input pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2.5 ml-1">Select Your Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full"
              >
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 accent-brand-yellow cursor-pointer" />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium cursor-pointer">Keep me signed in</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
            >
              Sign in to Dashboard →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

