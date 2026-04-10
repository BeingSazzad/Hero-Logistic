import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, MapPin, Users,
  MessageSquare, Settings, Truck, Zap
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuth } from '../../context/AuthContext';

const navConfig = [
  { type: 'link', to: '/dispatch',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { type: 'link', to: '/dispatch/jobs',     label: 'Jobs',      icon: Package },
  { type: 'link', to: '/dispatch/tracking', label: 'Tracking',  icon: MapPin },
  { type: 'link', to: '/dispatch/fleet',    label: 'Fleet',     icon: Truck },
  { type: 'link', to: '/dispatch/drivers',  label: 'Drivers',   icon: Users },
  { type: 'link', to: '/dispatch/messages', label: 'Messages',  icon: MessageSquare },
  { type: 'link', to: '/dispatch/settings', label: 'Settings',  icon: Settings },
];

export default function DispatchLayout() {
  const { user: authUser } = useAuth();
  const user = {
    name: authUser?.name || 'Dispatcher',
    role: authUser?.role || 'Dispatcher',
    initials: authUser?.name ? authUser.name.split(' ').map(n => n[0]).join('') : 'DX',
    branchName: authUser?.branchName,
  };

  return (
    <SidebarLayout
      roleName="Dispatcher"
      roleIcon={<Zap size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="Live Dispatch Operations"
      branchBadge={true}
    >
      <Outlet />
    </SidebarLayout>
  );
}
