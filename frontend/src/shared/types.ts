export interface IpcRequest {
  responseChannel?: string;
  params?: unknown[];
}

export enum DBRequestType {
  GET_SINGLE = 'getSingle',
  GET_MANY = 'getMany',
  POST = 'post',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum CategoryType {
  Expense = 'expense',
  Income = 'income'
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  balance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
}

export interface Budget {
  id: string;
  amount: number;
  category: string;
  startDate: Date;
}

export type NewCategory = Omit<Category, 'id'>
export type NewTransaction = Omit<Transaction, 'id'>
export type NewBudget = Omit<Budget, 'id'>

export type NewModel = NewCategory | NewTransaction | NewBudget