export enum CategoryType {
  Expense = 'expense',
  Income = 'income'
}

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  balance: number;
  created: string;
  removed: string;
}
export type NewCategory = Omit<Category, 'id' | 'removed'>

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  categoryId: number;
}
export type NewTransaction = Omit<Transaction, 'id'>

interface BaseBudget {
  id: number;
  amount: number;
  startDate: string;
  categoryId: number;
  category: Category;
}
export type Budget = Omit<BaseBudget, 'categoryId'>
export type NewBudget = Omit<BaseBudget, 'id' | 'category'>
export type DbBudget = Omit<BaseBudget, 'category'>

export interface BalanceLog {
  id: number;
  amount: number;
  categoryId: number;
  date: string;
}
export type NewBalanceLog = Omit<BalanceLog, 'id'>

export enum DBTable {
  CATEGORIES = 'categories',
  TRANSACTIONS = 'transactions',
  BUDGETS = 'budgets',
  BALANCELOGS = 'balanceLogs'
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

export interface KeyNumberPairs {
  [key: string]: number;
}