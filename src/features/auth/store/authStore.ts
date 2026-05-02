import { create } from 'zustand';
import { User } from '../types';

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
