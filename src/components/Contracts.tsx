import { useState } from 'react';
import { Plus, Search, FileText, MoreVertical, Receipt } from 'lucide-react';
import { Contract, Invoice } from '../types';

const mockContracts: Contract[] = [
  { id: 'SH-001', title: 'Xom-ashyo yetkazib berish', client: 'Alpha MChJ', amount: 45000000, status: 'active', date: '2026-04-10' },
  { id: 'SH-002', title: 'Ijara shartnomasi', client: 'Biznes Markaz', amount: 12000000, status: 'active', date: '2026-04-01' },
  { id: 'SH-003', title: 'IT xizmatlari', client: 'TechSoft', amount: 8500000, status: 'pending', date: '2026-04-15' },
  { id: 'SH-004', title: 'Uskunalar xaridi', client: 'Mega Stroy', amount: 120000000, status: 'completed', date: '2026-03-20' },
];

const mockInvoices: Invoice[] = [
  { id: 'HF-2026-001', contractId: 'SH-001', client: 'Alpha MChJ', amount: 45000000, date: '2026-04-10', status: 'paid' },
  { id: 'HF-2026-002', contractId: 'SH-002', client: 'Biznes Markaz', amount: 12000000, date: '2026-04-05', status: 'unpaid' },
  { id: 'HF-2026-003', contractId: 'SH-003', client: 'TechSoft', amount: 8500000, date: '2026-03-28', status: 'overdue' },
];

export function Contracts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'contracts' | 'invoices'>('contracts');

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getContractStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Faol';
      case 'pending': return 'Kutilmoqda';
      case 'completed': return 'Yakunlangan';
      default: return status;
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'unpaid': return 'bg-orange-100 text-orange-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInvoiceStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'To\'langan';
      case 'unpaid': return 'To\'lanmagan';
      case 'overdue': return 'Muddati o\'tgan';
      default: return status;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shartnomalar va Hisob-fakturalar</h2>
          <p className="text-gray-500 mt-1">Barcha shartnomalar va to'lov hujjatlari ro'yxati</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>{activeTab === 'contracts' ? 'Yangi shartnoma' : 'Yangi hisob-faktura'}</span>
        </button>
      </div>

      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button
          className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'contracts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('contracts')}
        >
          Shartnomalar
        </button>
        <button
          className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'invoices' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('invoices')}
        >
          Hisob-fakturalar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={activeTab === 'contracts' ? "Shartnoma izlash..." : "Hisob-faktura izlash..."}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          {activeTab === 'contracts' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Shartnoma nomi</th>
                  <th className="p-4 font-medium">Mijoz / Hamkor</th>
                  <th className="p-4 font-medium">Summa (UZS)</th>
                  <th className="p-4 font-medium">Sana</th>
                  <th className="p-4 font-medium">Holati</th>
                  <th className="p-4 font-medium w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4 font-medium text-gray-900">{contract.id}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-900">{contract.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{contract.client}</td>
                    <td className="p-4 font-medium text-gray-900">{contract.amount.toLocaleString()}</td>
                    <td className="p-4 text-gray-600">{contract.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getContractStatusColor(contract.status)}`}>
                        {getContractStatusText(contract.status)}
                      </span>
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
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">Faktura ID</th>
                  <th className="p-4 font-medium">Shartnoma ID</th>
                  <th className="p-4 font-medium">Mijoz / Hamkor</th>
                  <th className="p-4 font-medium">Summa (UZS)</th>
                  <th className="p-4 font-medium">Sana</th>
                  <th className="p-4 font-medium">Holati</th>
                  <th className="p-4 font-medium w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4 font-medium text-gray-900">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Receipt className="w-4 h-4" />
                        </div>
                        <span>{invoice.id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{invoice.contractId}</td>
                    <td className="p-4 text-gray-600">{invoice.client}</td>
                    <td className="p-4 font-medium text-gray-900">{invoice.amount.toLocaleString()}</td>
                    <td className="p-4 text-gray-600">{invoice.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                        {getInvoiceStatusText(invoice.status)}
                      </span>
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
          )}
        </div>
      </div>
    </div>
  );
}
