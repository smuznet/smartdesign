/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Contracts } from './components/Contracts';
import { Transactions } from './components/Transactions';
import { Tasks } from './components/Tasks';
import { Employees } from './components/Employees';
import { Documents } from './components/Documents';
import { Salary } from './components/Salary';
import { Assets } from './components/Assets';
import { Objects } from './components/Objects';
import { Login } from './components/Login';
import { ViewType } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainApp() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  useEffect(() => {
    if (user) {
      if (user.role === 'employee') {
        setCurrentView('tasks');
      } else {
        setCurrentView('dashboard');
      }
    }
  }, [user]);

  if (!user) {
    return <Login />;
  }

  const renderView = () => {
    // Role-based rendering protection
    if (user.role === 'employee' && !['tasks', 'documents'].includes(currentView)) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Sizda bu bo'limni ko'rish uchun ruxsat yo'q.</p>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'contracts': return <Contracts />;
      case 'transactions': return <Transactions />;
      case 'tasks': return <Tasks />;
      case 'employees': return <Employees />;
      case 'documents': return <Documents />;
      case 'salary': return <Salary />;
      case 'assets': return <Assets />;
      case 'objects': return <Objects />;
      default: return <Tasks />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

