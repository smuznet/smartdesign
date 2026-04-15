import { useState } from 'react';
import { Banknote, CreditCard, Wallet, Gift, CheckCircle2, Clock, Users } from 'lucide-react';
import { SalaryRecord } from '../types';
import { useAuth } from '../context/AuthContext';

const mockSalaryData: SalaryRecord[] = [
  { id: 'SAL-001', employeeId: 'EMP-003', employeeName: 'Xodim', month: 'Aprel 2026', baseSalary: 8000000, cardAmount: 4000000, cashAmount: 4000000, bonus: 0, total: 8000000, status: 'pending' },
  { id: 'SAL-002', employeeId: 'EMP-003', employeeName: 'Xodim', month: 'Mart 2026', baseSalary: 8000000, cardAmount: 4000000, cashAmount: 4000000, bonus: 1500000, total: 9500000, status: 'paid' },
  { id: 'SAL-003', employeeId: 'EMP-001', employeeName: 'Admin', month: 'Aprel 2026', baseSalary: 15000000, cardAmount: 7500000, cashAmount: 7500000, bonus: 3000000, total: 18000000, status: 'pending' },
  { id: 'SAL-004', employeeId: 'EMP-002', employeeName: 'Menejer', month: 'Aprel 2026', baseSalary: 12000000, cardAmount: 6000000, cashAmount: 6000000, bonus: 2000000, total: 14000000, status: 'pending' },
];

export function Salary() {
  const { user } = useAuth();
  const isAdminOrManager = user?.role === 'admin' || user?.role === 'manager';
  const [selectedEmployee, setSelectedEmployee] = useState<string>(user?.id || '');

  // If user is employee, force them to only see their own.
  const effectiveEmployeeId = isAdminOrManager ? selectedEmployee : user?.id;

  const filteredData = effectiveEmployeeId === 'all' 
    ? mockSalaryData 
    : mockSalaryData.filter(r => r.employeeId === effectiveEmployeeId);

  // Aggregate data for top cards
  const currentMonthData = filteredData.filter(r => r.month === 'Aprel 2026');
  const totalBase = currentMonthData.reduce((sum, r) => sum + r.baseSalary, 0);
  const totalCard = currentMonthData.reduce((sum, r) => sum + r.cardAmount, 0);
  const totalCash = currentMonthData.reduce((sum, r) => sum + r.cashAmount, 0);
  const totalBonus = currentMonthData.reduce((sum, r) => sum + r.bonus, 0);
  const totalSum = currentMonthData.reduce((sum, r) => sum + r.total, 0);

  // Unique employees for dropdown
  const uniqueEmployees = Array.from(new Set(mockSalaryData.map(r => r.employeeId)))
    .map(id => {
      return {
        id,
        name: mockSalaryData.find(r => r.employeeId === id)?.employeeName || 'Noma\'lum'
      };
    });

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdminOrManager && effectiveEmployeeId === 'all' ? 'Umumiy ish haqi hisoboti' : 'Shaxsiy oylik hisoboti'}
          </h2>
          <p className="text-gray-500 mt-1">
            {isAdminOrManager && effectiveEmployeeId === 'all' 
              ? 'Barcha xodimlar uchun ish haqi va mukofotlar' 
              : `${filteredData[0]?.employeeName || user?.name} uchun ish haqi va mukofotlar tarixi`}
          </p>
        </div>
        
        {isAdminOrManager && (
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <select 
              className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="all">Barcha xodimlar</option>
              {uniqueEmployees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Banknote className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Joriy oy (Jami)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalSum.toLocaleString()} UZS</p>
          <p className="text-sm text-gray-500 mt-1">Asosiy maosh: {totalBase.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Plastik karta</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCard.toLocaleString()} UZS</p>
          <p className="text-sm text-gray-500 mt-1">Oylikning 50% qismi</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Naqd pul</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalCash.toLocaleString()} UZS</p>
          <p className="text-sm text-gray-500 mt-1">Oylikning 50% qismi</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Mukofot (Premiya)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalBonus.toLocaleString()} UZS</p>
          <p className="text-sm text-gray-500 mt-1">Qo'shimcha rag'batlantirish</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Oyliklar tarixi</h3>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                {isAdminOrManager && effectiveEmployeeId === 'all' && (
                  <th className="p-4 font-medium">Xodim</th>
                )}
                <th className="p-4 font-medium">Davr (Oy)</th>
                <th className="p-4 font-medium">Asosiy maosh</th>
                <th className="p-4 font-medium">Plastik karta</th>
                <th className="p-4 font-medium">Naqd pul</th>
                <th className="p-4 font-medium">Premiya</th>
                <th className="p-4 font-medium">Jami hisoblangan</th>
                <th className="p-4 font-medium">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  {isAdminOrManager && effectiveEmployeeId === 'all' && (
                    <td className="p-4 font-medium text-gray-900">{record.employeeName}</td>
                  )}
                  <td className="p-4 font-medium text-gray-900">{record.month}</td>
                  <td className="p-4 text-gray-600">{record.baseSalary.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{record.cardAmount.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{record.cashAmount.toLocaleString()}</td>
                  <td className="p-4 text-orange-600 font-medium">
                    {record.bonus > 0 ? `+${record.bonus.toLocaleString()}` : '-'}
                  </td>
                  <td className="p-4 font-bold text-gray-900">{record.total.toLocaleString()} UZS</td>
                  <td className="p-4">
                    {record.status === 'paid' ? (
                      <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>To'langan</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        <span>Kutilmoqda</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    Ma'lumot topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
