import { useState } from 'react';
import { Plus, Search, ArrowUpRight, ArrowDownRight, MoreVertical, Settings, X, Edit2, Trash2 } from 'lucide-react';
import { Transaction } from '../types';

const mockTransactions: Transaction[] = [
  { id: 'TR-101', type: 'income', amount: 15000000, category: 'Sotuv', description: 'Mahsulot sotuvi (Alpha MChJ)', date: '2026-04-11 14:30' },
  { id: 'TR-102', type: 'expense', amount: 4500000, category: 'Ijara', description: 'Ofis ijarasi aprel oyi uchun', date: '2026-04-10 10:15' },
  { id: 'TR-103', type: 'expense', amount: 1200000, category: 'Xizmatlar', description: 'Internet va aloqa', date: '2026-04-09 16:45' },
  { id: 'TR-104', type: 'income', amount: 8500000, category: 'Xizmatlar', description: 'IT konsalting', date: '2026-04-08 09:20' },
  { id: 'TR-105', type: 'expense', amount: 25000000, category: 'Oylik maosh', description: 'Mart oyi ish haqi', date: '2026-04-05 11:00' },
];

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

const initialCategories: Category[] = [
  { id: '1', name: 'Sotuv', type: 'income' },
  { id: '2', name: 'Ijara', type: 'expense' },
  { id: '3', name: 'Xizmatlar', type: 'income' },
  { id: '4', name: 'Xizmatlar', type: 'expense' },
  { id: '5', name: 'Oylik maosh', type: 'expense' },
];

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'income' | 'expense'>('expense');
  
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatName, setEditCatName] = useState('');

  const handleAddCategory = () => {
    if (newCatName.trim()) {
      setCategories([...categories, { id: Date.now().toString(), name: newCatName.trim(), type: newCatType }]);
      setNewCatName('');
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const startEditing = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditCatName(cat.name);
  };

  const saveEdit = (id: string) => {
    if (editCatName.trim()) {
      setCategories(categories.map(c => c.id === id ? { ...c, name: editCatName.trim() } : c));
      setEditingCatId(null);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kirim-chiqimlar</h2>
          <p className="text-gray-500 mt-1">Moliya va buxgalteriya operatsiyalari tarixi</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors font-medium"
          >
            <Settings className="w-5 h-5" />
            <span>Kategoriyalar</span>
          </button>
          <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors font-medium">
            <ArrowDownRight className="w-5 h-5" />
            <span>Xarajat qo'shish</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors font-medium">
            <ArrowUpRight className="w-5 h-5" />
            <span>Kirim qo'shish</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Operatsiya izlash..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
             <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Barcha turlar</option>
                <option>Kirim</option>
                <option>Chiqim</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Tavsif</th>
                <th className="p-4 font-medium">Kategoriya</th>
                <th className="p-4 font-medium">Sana</th>
                <th className="p-4 font-medium text-right">Summa (UZS)</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-medium text-gray-900">{tx.id}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      </div>
                      <span className="font-medium text-gray-900">{tx.description}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{tx.category}</span>
                  </td>
                  <td className="p-4 text-gray-600">{tx.date}</td>
                  <td className={`p-4 font-bold text-right ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Kategoriyalarni boshqarish</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex space-x-2 mb-6">
              <input 
                type="text" 
                placeholder="Yangi kategoriya..." 
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <select 
                className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={newCatType}
                onChange={(e) => setNewCatType(e.target.value as 'income' | 'expense')}
              >
                <option value="expense">Xarajat</option>
                <option value="income">Kirim</option>
              </select>
              <button 
                onClick={handleAddCategory}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-2">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  {editingCatId === cat.id ? (
                    <div className="flex items-center space-x-2 flex-1 mr-2">
                      <input 
                        type="text" 
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editCatName}
                        onChange={(e) => setEditCatName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(cat.id)}
                        autoFocus
                      />
                      <button onClick={() => saveEdit(cat.id)} className="text-green-600 font-medium text-sm px-2 hover:text-green-700">Saqlash</button>
                      <button onClick={() => setEditingCatId(null)} className="text-gray-500 font-medium text-sm px-2 hover:text-gray-700">Bekor</button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${cat.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="font-medium text-gray-900">{cat.name}</span>
                        <span className="text-xs text-gray-500">({cat.type === 'income' ? 'Kirim' : 'Xarajat'})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => startEditing(cat)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Kategoriyalar mavjud emas
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
