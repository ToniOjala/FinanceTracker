export type CategoryType = 'expense' | 'income';

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  balance: number;
  created: string;
  removed?: string;
}
export type NewCategory = Omit<Category, 'id' | 'removed'>

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  label?: string;
  categoryId: number;
}
export interface NewTransaction extends Omit<Transaction, 'id'> {
  type: 'income' | 'expense';
  [categoryName: string]: string | number | undefined;
}

export interface Budget {
  id: number;
  amount: number;
  startDate: string;
  categoryId: number;
}
export type NewBudget = Omit<Budget, 'id'>

export interface BalanceLog {
  id: number;
  categoryId: number;
  transactionId?: number;
  amount: number;
  date: string;
  label?: string;
}
export type NewBalanceLog = Omit<BalanceLog, 'id'>

export interface RecurringExpense {
  id: number;
  categoryId: number;
  name: string;
  amount: number;
  recurs: 'monthly' | 'yearly';
  day: number;
  month?: number;
  notifyDaysBefore: number;
}
export type NewRecurringExpense = Omit<RecurringExpense, 'id'>

export interface Notification {
  id: number;
  message: string;
  read: number;
  date: string;
}
export type NewNotification = Omit<Notification, 'id' | 'read'>

export type DBTable =
    'categories' 
  | 'transactions' 
  | 'budgets'
  | 'balanceLogs'
  | 'recurringExpenses'
  | 'notifications';
  
export interface DBRequestParams {
  table: DBTable;
  method: string;
  data?: KeyValuePair,
  query?: KeyValuePair
}

export interface IpcRequest {
  responseChannel?: string;
  params?: DBRequestParams;
}

export interface KeyValuePair {
  [key: string]: unknown;
}

export interface KeyNumberPairs {
  [key: string]: number;
}