import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, DollarSign, Network,
  BarChart2, MessageSquare, Settings, Shield
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';

const navConfig = [
  { type: 'link', label: 'Dashboard', icon: LayoutDashboard, to: '/admin', end: true },
  {
    type: 'group', label: 'Operations', icon: Package,
    items: [
      { to: '/admin/shipments',   label: 'Shipments' },
      { to: '/admin/exceptions',  label: 'Delivery Issues' },
      { to: '/admin/customers',   label: 'Customers' },
      { to: '/admin/jobs-config', label: 'Jobs Config' },
    ]
  },
  { type: 'link', label: 'Financial Control', icon: DollarSign, to: '/admin/finance' },
  {
    type: 'group', label: 'Network Control', icon: Network,
    items: [
      { to: '/admin/branches', label: 'Branches' },
      { to: '/admin/fleet',    label: 'Fleet' },
      { to: '/admin/drivers',  label: 'Drivers' },
    ]
  },
  {
    type: 'group', label: 'Insights', icon: BarChart2,
    items: [
      { to: '/admin/reports', label: 'Operational Analytics' },
      { to: '/admin/audit',   label: 'System Audit Logs' },
    ]
  },
  {
    type: 'group', label: 'Help & Support', icon: MessageSquare,
    items: [
      { to: '/admin/messaging', label: 'Messages' },
      { to: '/admin/helpline',  label: 'Support' },
    ]
  },
  {
    type: 'group', label: 'General Settings', icon: Settings,
    items: [
      { to: '/admin/company',       label: 'Company Profile' },
      { to: '/admin/users',         label: 'Users & Permissions' },
      { to: '/admin/notifications', label: 'Alert Notifications' },
      { to: '/admin/integrations',  label: 'API & Connections' },
      { to: '/admin/settings',      label: 'System Config' },
    ]
  }
];

const user = { name: 'Michael Adams', role: 'Super Admin', initials: 'MA' };

export default function AdminLayout() {
  return (
    <SidebarLayout
      roleName="Admin Portal"
      roleIcon={<Shield size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="Enterprise Fleet Operations"
    >
      <Outlet />
    </SidebarLayout>
  );
}
