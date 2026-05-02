import { create } from 'zustand';
import { User, Driver } from '../types';

interface UserStore {
  staffRoster: User[];
  drivers: Driver[];
  customers: any[];
  addDriver: (driver: Driver) => void;
  setStaffRoster: (roster: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  staffRoster: [
    { id: 'USR-001', name: 'John Doe', role: 'admin', branchId: 'SYD-CENTRAL', email: 'john@hero.com' },
    { id: 'USR-002', name: 'Jane Smith', role: 'dispatcher', branchId: 'MEL-Depot', email: 'jane@hero.com' },
  ],
  drivers: [
    { id: 'DRV-102', branchId: 'SYD-CENTRAL', name: 'Jack Taylor', email: 'jack@hero.com', initials: 'JT', rank: 'Senior', status: 'On Duty', rating: 4.8, role: 'driver' },
    { id: 'DRV-134', branchId: 'SYD-CENTRAL', name: 'Oliver Brown', email: 'oliver@hero.com', initials: 'OB', rank: 'Junior', status: 'In Break', rating: 4.0, role: 'driver' },
  ],
  customers: [],

  // Actions
  addDriver: (driver) => set((state) => ({ drivers: [...state.drivers, driver] })),
  setStaffRoster: (roster) => set({ staffRoster: roster }),
}));
