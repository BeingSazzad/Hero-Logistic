import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Simulating a logged in Dispatcher assigned to "Sydney Central"
  const [user, setUser] = useState<any>({
    name: 'Sarah Mitchell',
    role: 'dispatcher',
    branchId: 'SYD-CENTRAL',
    branchName: 'Sydney Central Depot',
    email: 'sarah.m@herologistics.com',
    avatar: '/driver_avatar_1_1777708494778.png'
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
