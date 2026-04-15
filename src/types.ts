export type Role = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export type ViewType = 
  | 'dashboard' 
  | 'contracts' 
  | 'transactions' 
  | 'tasks' 
  | 'employees' 
  | 'documents'
  | 'salary'
  | 'assets'
  | 'objects';

export interface ObjectSite {
  id: string;
  name: string;
  address: string;
  manager: string;
  status: 'active' | 'completed' | 'on-hold';
  budget: number;
  startDate: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  price: number;
  status: 'active' | 'maintenance' | 'written-off';
  assignedTo: string;
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  cashAmount: number;
  cardAmount: number;
  bonus: number;
  total: number;
  status: 'paid' | 'pending';
}

export interface Contract {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'active' | 'completed' | 'pending';
  date: string;
}

export interface Invoice {
  id: string;
  contractId: string;
  client: string;
  amount: number;
  date: string;
  status: 'paid' | 'unpaid' | 'overdue';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  status: 'active' | 'on-leave';
}

export interface Document {
  id: string;
  type: 'incoming' | 'outgoing';
  title: string;
  senderOrRecipient: string;
  date: string;
  status: 'registered' | 'in-review' | 'archived';
}
