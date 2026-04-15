import { useState } from 'react';
import { Plus, Search, Mail, Phone, MoreVertical } from 'lucide-react';
import { Employee } from '../types';

const mockEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Aziz Rahimov', email: 'aziz@erp.uz', position: 'Bosh Buxgalter', department: 'Moliya', salary: 12000000, status: 'active' },
  { id: 'EMP-002', name: 'Malika Karimova', email: 'malika@erp.uz', position: 'Sotuv menejeri', department: 'Sotuv', salary: 8500000, status: 'active' },
  { id: 'EMP-003', name: 'Dilshod Aliyev', email: 'dilshod@erp.uz', position: 'Yurist', department: 'Huquq', salary: 10000000, status: 'on-leave' },
  { id: 'EMP-004', name: 'Zarina Umarova', email: 'zarina@erp.uz', position: 'HR menejer', department: 'Kadrlar', salary: 7500000, status: 'active' },
  { id: 'EMP-005', name: 'Rustam Qodirov', email: 'rustam@erp.uz', position: 'IT mutaxassis', department: 'IT', salary: 15000000, status: 'active' },
];

export function Employees() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Xodimlar ro'yxati</h2>
          <p className="text-gray-500 mt-1">Korxona ishchilari va ularning ma'lumotlari</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Yangi xodim</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Xodim izlash..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
             <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Barcha bo'limlar</option>
                <option>Moliya</option>
                <option>Sotuv</option>
                <option>Kadrlar</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Xodim</th>
                <th className="p-4 font-medium">Lavozim / Bo'lim</th>
                <th className="p-4 font-medium">Oylik maosh</th>
                <th className="p-4 font-medium">Holati</th>
                <th className="p-4 font-medium">Aloqa</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{emp.position}</p>
                    <p className="text-sm text-gray-500">{emp.department}</p>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{emp.salary.toLocaleString()} UZS</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {emp.status === 'active' ? 'Faol' : 'Ta\'tilda'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2 text-gray-400">
                      <button className="hover:text-blue-600 transition-colors"><Mail className="w-4 h-4" /></button>
                      <button className="hover:text-blue-600 transition-colors"><Phone className="w-4 h-4" /></button>
                    </div>
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
