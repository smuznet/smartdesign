import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('erp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock authentication logic with passwords
    const allowedUsers = [
      { id: 'EMP-000', name: 'Admin', email: 'admin@erp.uz', password: 'admin', role: 'admin' as Role },
      { id: 'EMP-001', name: 'Menejer', email: 'manager@erp.uz', password: 'manager', role: 'manager' as Role },
      { id: 'EMP-002', name: 'Aziz Rahimov', email: 'aziz@erp.uz', password: '123', role: 'employee' as Role },
      { id: 'EMP-003', name: 'Malika Karimova', email: 'malika@erp.uz', password: '123', role: 'employee' as Role },
      { id: 'EMP-004', name: 'Dilshod Aliyev', email: 'dilshod@erp.uz', password: '123', role: 'employee' as Role },
      { id: 'EMP-005', name: 'Zarina Umarova', email: 'zarina@erp.uz', password: '123', role: 'employee' as Role },
      { id: 'EMP-006', name: 'Rustam Qodirov', email: 'rustam@erp.uz', password: '123', role: 'employee' as Role },
    ];

    const foundUser = allowedUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const newUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };

      setUser(newUser);
      localStorage.setItem('erp_user', JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('erp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
