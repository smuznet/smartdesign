import { useState } from 'react';
import { Plus, Search, ArrowRight, ArrowLeft, MoreVertical, FileText } from 'lucide-react';
import { Document } from '../types';

const mockDocuments: Document[] = [
  { id: 'DOC-2026-001', type: 'incoming', title: 'Soliq tekshiruvi haqida xabarnoma', senderOrRecipient: 'Davlat Soliq Qo\'mitasi', date: '2026-04-10', status: 'registered' },
  { id: 'DOC-2026-002', type: 'outgoing', title: 'Hamkorlik taklifi', senderOrRecipient: 'Beta MChJ', date: '2026-04-09', status: 'in-review' },
  { id: 'DOC-2026-003', type: 'incoming', title: 'Tijorat taklifi', senderOrRecipient: 'Gamma Group', date: '2026-04-08', status: 'archived' },
  { id: 'DOC-2026-004', type: 'outgoing', title: 'Shartnoma bekor qilinishi', senderOrRecipient: 'Delta MChJ', date: '2026-04-05', status: 'registered' },
];

export function Documents() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-blue-100 text-blue-700';
      case 'in-review': return 'bg-orange-100 text-orange-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered': return 'Ro\'yxatga olingan';
      case 'in-review': return 'Ko\'rib chiqilmoqda';
      case 'archived': return 'Arxivlangan';
      default: return status;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Xatlar nazorati</h2>
          <p className="text-gray-500 mt-1">Kiruvchi va chiquvchi hujjatlar aylanmasi</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            <span>Kiruvchi xat</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors font-medium">
            <ArrowRight className="w-5 h-5" />
            <span>Chiquvchi xat</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Hujjat izlash..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
             <select className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Barcha xatlar</option>
                <option>Kiruvchi</option>
                <option>Chiquvchi</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">ID / Sana</th>
                <th className="p-4 font-medium">Hujjat nomi</th>
                <th className="p-4 font-medium">Kimdan / Kimga</th>
                <th className="p-4 font-medium">Turi</th>
                <th className="p-4 font-medium">Holati</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{doc.id}</p>
                    <p className="text-sm text-gray-500">{doc.date}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-900">{doc.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{doc.senderOrRecipient}</td>
                  <td className="p-4">
                    <span className={`flex items-center space-x-1 text-sm font-medium ${doc.type === 'incoming' ? 'text-green-600' : 'text-blue-600'}`}>
                      {doc.type === 'incoming' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      <span>{doc.type === 'incoming' ? 'Kiruvchi' : 'Chiquvchi'}</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {getStatusText(doc.status)}
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
        </div>
      </div>
    </div>
  );
}
