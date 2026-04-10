import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Building2, PackageSearch, ArrowDownToLine, ArrowUpFromLine, Warehouse
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';

const navConfig = [
  { type: 'link', to: '/warehouse',           label: 'Dashboard',        icon: Building2,       end: true },
  { type: 'link', to: '/warehouse/inbound',   label: 'Inbound Receipts', icon: ArrowDownToLine },
  { type: 'link', to: '/warehouse/outbound',  label: 'Outbound Loading', icon: ArrowUpFromLine },
  { type: 'link', to: '/warehouse/inventory', label: 'Inventory Search', icon: PackageSearch },
];

const user = { name: 'Floor Manager', role: 'Warehouse Ops', initials: 'FM' };

export default function WarehouseLayout() {
  return (
    <SidebarLayout
      roleName="Warehouse Ops"
      roleIcon={<Warehouse size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="Warehouse Operations Center"
    >
      <Outlet />
    </SidebarLayout>
  );
}
