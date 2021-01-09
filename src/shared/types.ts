export enum CategoryType {
  Expense = 'expense',
  Income = 'income'
}

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  balance: number;
}

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  category: string;
}

export interface Budget {
  id: number;
  amount: number;
  category: string;
  startDate: string;
}

export type NewCategory = Omit<Category, 'id'>
export type NewTransaction = Omit<Transaction, 'id'>
export type NewBudget = Omit<Budget, 'id'>
export type NewModel = NewCategory | NewTransaction | NewBudget

export enum DBTable {
  CATEGORIES = 'categories',
  TRANSACTIONS = 'transactions',
  BUDGETS = 'budgets'
}

export interface DBRequestParams {
  table: DBTable;
  requestType: string;
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