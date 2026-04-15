import { useState } from 'react';
import { Plus, Search, Calendar, Clock, CheckCircle2, Circle, AlertCircle, ArrowUpDown } from 'lucide-react';
import { Task } from '../types';

const mockTasks: Task[] = [
  { id: 'TSK-001', title: 'Oylik hisobotni tayyorlash', assignee: 'Aziz Rahimov', status: 'todo', priority: 'high', dueDate: '2026-04-15' },
  { id: 'TSK-002', title: 'Yangi mijoz bilan uchrashuv', assignee: 'Malika Karimova', status: 'in-progress', priority: 'medium', dueDate: '2026-04-12' },
  { id: 'TSK-003', title: 'Soliq hujjatlarini topshirish', assignee: 'Dilshod Aliyev', status: 'done', priority: 'high', dueDate: '2026-04-10' },
  { id: 'TSK-004', title: 'Ofis jihozlarini xarid qilish', assignee: 'Zarina Umarova', status: 'todo', priority: 'low', dueDate: '2026-04-18' },
];

export function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPriority, setSortByPriority] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'todo': return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Circle className="w-3 h-3"/> Bajarilmagan</span>;
      case 'in-progress': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3"/> Jarayonda</span>;
      case 'done': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Bajarilgan</span>;
      default: return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Yuqori</span>;
      case 'medium': return <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">O'rta</span>;
      case 'low': return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">Past</span>;
      default: return null;
    }
  };

  const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1
  };

  const getFilteredAndSortedTasks = (status: string) => {
    let tasks = mockTasks.filter(t => t.status === status);
    
    if (searchTerm) {
      tasks = tasks.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.assignee.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (sortByPriority) {
      tasks = [...tasks].sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    }

    return tasks;
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vazifalar ro'yxati</h2>
          <p className="text-gray-500 mt-1">Xodimlar uchun belgilangan ishlar va topshiriqlar</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSortByPriority(!sortByPriority)}
            className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors border ${sortByPriority ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-sm font-medium">Muhimlik bo'yicha saralash</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Yangi vazifa</span>
          </button>
        </div>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Vazifa yoki xodimni izlash..." 
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Kanban Board style columns */}
        {['todo', 'in-progress', 'done'].map((columnStatus) => {
          const tasks = getFilteredAndSortedTasks(columnStatus);
          return (
            <div key={columnStatus} className="bg-gray-50 rounded-2xl p-4 flex flex-col border border-gray-100 overflow-hidden">
              <h3 className="font-bold text-gray-900 mb-4 px-2 capitalize flex items-center justify-between">
                <span>
                  {columnStatus === 'todo' ? 'Bajarilishi kerak' : columnStatus === 'in-progress' ? 'Jarayonda' : 'Bajarilgan'}
                </span>
                <span className="text-gray-400 font-normal text-sm bg-white px-2 py-0.5 rounded-full border border-gray-100">
                  {tasks.length}
                </span>
              </h3>
              
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {tasks.map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400">{task.id}</span>
                        {getPriorityBadge(task.priority)}
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-3 line-clamp-2">{task.title}</h4>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="truncate max-w-[80px]">{task.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm italic">
                    Vazifalar yo'q
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
