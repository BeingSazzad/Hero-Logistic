// Centralized Type Definitions for Hero Logistic

export type UserRole = 'admin' | 'dispatcher' | 'driver' | 'warehouse' | 'accounts' | 'platform';

export interface User {
  id?: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  branchId?: string;
  branchName?: string;
  canEditLoads?: boolean;
}

export interface Driver extends User {
  initials: string;
  rank: 'Junior' | 'Regular' | 'Senior' | 'Master';
  status: 'In Break' | 'Off Duty' | 'On Duty' | 'Available' | 'Assigned' | 'Offline';
  rating: number;
  vehicle?: string;
  availability?: string;
  license?: string;
  compliance?: 'Valid' | 'Warning' | 'Expired';
}

export interface LoadItem {
  id: string;
  description: string;
  weight: number;
  volume: number;
  vin?: string;
  rego?: string;
  stockNumber?: string;
}

export interface Load {
  id: string;
  clientRef: string;
  customerLoadNumber?: string;
  consignor: string;
  consignee: string;
  origin: string;
  destination: string;
  status: 'Pending' | 'Active' | 'Completed' | 'In Progress' | 'Exception';
  revenue: number;
  commodity: string;
  weight: string;
  volume: string;
  eta: string;
  driver?: Driver;
  items?: LoadItem[];
}

export interface Job {
  id: string;
  status: string;
  pickup: string;
  delivery: string;
  driver?: string;
  avatar?: string;
}
