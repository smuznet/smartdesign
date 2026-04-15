import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText,
  DollarSign
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Umumiy daromad', value: '125,000,000 UZS', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Umumiy xarajat', value: '45,200,000 UZS', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'Faol shartnomalar', value: '24 ta', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Xodimlar soni', value: '42 ta', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bosh sahifa</h2>
        <p className="text-gray-500 mt-1">Korxonaning umumiy moliya va holat ko'rsatkichlari</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">So'nggi kirim-chiqimlar</h3>
          <div className="space-y-4">
            {[
              { desc: 'Mahsulot sotuvi', amount: '+12,000,000', type: 'income', date: 'Bugun, 14:30' },
              { desc: 'Ijara to\'lovi', amount: '-4,500,000', type: 'expense', date: 'Bugun, 10:15' },
              { desc: 'Xizmat ko\'rsatish', amount: '+3,200,000', type: 'income', date: 'Kecha, 16:45' },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <DollarSign className={`w-5 h-5 ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.desc}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount} UZS
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Buxgalteriya hisoboti</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Rejalashtirilgan daromad</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Xarajatlar limiti</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Soliq to'lovlari</span>
                <span className="font-medium">100%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
