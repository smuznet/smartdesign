import { useState } from 'react';
import { Plus, Search, Box, MoreVertical, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Asset } from '../types';

const mockAssets: Asset[] = [
  { id: 'INV-1001', name: 'Noutbuk MacBook Pro M2', category: 'Elektronika', purchaseDate: '2025-01-15', price: 25000000, status: 'active', assignedTo: 'Rustam Qodirov' },
  { id: 'INV-1002', name: 'Ofis stoli (Katta)', category: 'Mebel', purchaseDate: '2024-11-10', price: 1500000, status: 'active', assignedTo: 'Umumiy' },
  { id: 'INV-1003', name: 'Konditsioner Artel', category: 'Texnika', purchaseDate: '2023-06-05', price: 4500000, status: 'maintenance', assignedTo: 'Majlislar zali' },
  { id: 'INV-1004', name: 'Printer HP LaserJet', category: 'Elektronika', purchaseDate: '2024-02-20', price: 3200000, status: 'active', assignedTo: 'Buxgalteriya' },
  { id: 'INV-1005', name: 'Eski server apparati', category: 'Elektronika', purchaseDate: '2020-03-10', price: 15000000, status: 'written-off', assignedTo: 'Omborxona' },
];

export function Assets() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': 
        return <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"><CheckCircle2 className="w-3 h-3" /><span>Yaroqli</span></span>;
      case 'maintenance': 
        return <span className="inline-flex items-center space-x-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"><Wrench className="w-3 h-3" /><span>Ta'mirda</span></span>;
      case 'written-off': 
        return <span className="inline-flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium"><AlertTriangle className="w-3 h-3" /><span>Hisobdan chiqarilgan</span></span>;
      default: 
        return null;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Asosiy vositalar</h2>
          <p className="text-gray-500 mt-1">Korxona inventarlari va moddiy boyliklari ro'yxati</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Yangi vosita qo'shish</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Inventar raqami yoki nomini izlash..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
             <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Barcha toifalar</option>
                <option>Elektronika</option>
                <option>Mebel</option>
                <option>Texnika</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Inventar ID</th>
                <th className="p-4 font-medium">Vosita nomi</th>
                <th className="p-4 font-medium">Toifa</th>
                <th className="p-4 font-medium">Xarid sanasi</th>
                <th className="p-4 font-medium">Boshlang'ich qiymati</th>
                <th className="p-4 font-medium">Biriktirilgan</th>
                <th className="p-4 font-medium">Holati</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-medium text-gray-900">{asset.id}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        <Box className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-900">{asset.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{asset.category}</span>
                  </td>
                  <td className="p-4 text-gray-600">{asset.purchaseDate}</td>
                  <td className="p-4 font-medium text-gray-900">{asset.price.toLocaleString()} UZS</td>
                  <td className="p-4 text-gray-600">{asset.assignedTo}</td>
                  <td className="p-4">
                    {getStatusBadge(asset.status)}
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
    </div>
  );
}
