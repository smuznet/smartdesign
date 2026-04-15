import { 
  LayoutDashboard, 
  FileText, 
  Wallet, 
  CheckSquare, 
  Users, 
  Mail,
  LogOut,
  Banknote,
  Box,
  Building
} from 'lucide-react';
import { ViewType } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Bosh sahifa', icon: LayoutDashboard, roles: ['admin', 'manager'] },
    { id: 'objects', label: 'Ob\'ektlar', icon: Building, roles: ['admin', 'manager'] },
    { id: 'contracts', label: 'Shartnomalar', icon: FileText, roles: ['admin', 'manager'] },
    { id: 'transactions', label: 'Kirim-chiqim', icon: Wallet, roles: ['admin', 'manager'] },
    { id: 'tasks', label: 'Vazifalar', icon: CheckSquare, roles: ['admin', 'manager', 'employee'] },
    { id: 'employees', label: 'Xodimlar', icon: Users, roles: ['admin', 'manager'] },
    { id: 'documents', label: 'Xatlar nazorati', icon: Mail, roles: ['admin', 'manager', 'employee'] },
    { id: 'salary', label: 'Oylik hisoboti', icon: Banknote, roles: ['admin', 'manager'] },
    { id: 'assets', label: 'Asosiy vositalar', icon: Box, roles: ['admin', 'manager'] },
  ] as const;

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Korxona ERP</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold uppercase">
              {user?.name.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 truncate w-24">{user?.name}</p>
              <p className="text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Tizimdan chiqish"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
