import { create } from 'zustand';

export interface User {
  name: string;
  role: 'admin' | 'dispatcher' | 'driver' | 'warehouse' | 'accounts' | 'platform';
  branchId: string;
  branchName: string;
  email: string;
  canEditLoads: boolean;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    name: 'Sarah Mitchell',
    role: 'dispatcher',
    branchId: 'SYD-CENTRAL',
    branchName: 'Sydney Central Depot',
    email: 'sarah.m@herologistics.com',
    canEditLoads: true
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));
