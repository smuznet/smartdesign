import { useState } from 'react';
import { Plus, Search, Building, MoreVertical, MapPin, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { ObjectSite } from '../types';

const mockObjects: ObjectSite[] = [
  { id: 'OBJ-001', name: 'Yunusobod turar-joy majmuasi', address: 'Toshkent sh., Yunusobod tumani', manager: 'Rustam Qodirov', status: 'active', budget: 15000000000, startDate: '2025-05-10' },
  { id: 'OBJ-002', name: 'Chilonzor savdo markazi', address: 'Toshkent sh., Chilonzor tumani', manager: 'Aziz Rahimov', status: 'completed', budget: 8500000000, startDate: '2024-02-15' },
  { id: 'OBJ-003', name: 'Sergeli logistika markazi', address: 'Toshkent sh., Sergeli tumani', manager: 'Dilshod Aliyev', status: 'on-hold', budget: 12000000000, startDate: '2025-11-01' },
];

export function Objects() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': 
        return <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"><Clock className="w-3 h-3" /><span>Jarayonda</span></span>;
      case 'completed': 
        return <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"><CheckCircle2 className="w-3 h-3" /><span>Yakunlangan</span></span>;
      case 'on-hold': 
        return <span className="inline-flex items-center space-x-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"><AlertCircle className="w-3 h-3" /><span>To'xtatilgan</span></span>;
      default: 
        return null;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ob'ektlar</h2>
          <p className="text-gray-500 mt-1">Qurilish va xizmat ko'rsatish ob'ektlari ro'yxati</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Yangi ob'ekt</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Ob'ekt nomini izlash..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
             <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Barcha holatlar</option>
                <option>Jarayonda</option>
                <option>Yakunlangan</option>
                <option>To'xtatilgan</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Ob'ekt nomi</th>
                <th className="p-4 font-medium">Manzil</th>
                <th className="p-4 font-medium">Mas'ul shaxs</th>
                <th className="p-4 font-medium">Budjet (UZS)</th>
                <th className="p-4 font-medium">Boshlanish sanasi</th>
                <th className="p-4 font-medium">Holati</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockObjects.filter(obj => obj.name.toLowerCase().includes(searchTerm.toLowerCase())).map((obj) => (
                <tr key={obj.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-medium text-gray-900">{obj.id}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Building className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-900">{obj.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{obj.address}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{obj.manager}</td>
                  <td className="p-4 font-medium text-gray-900">{obj.budget.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{obj.startDate}</td>
                  <td className="p-4">
                    {getStatusBadge(obj.status)}
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
