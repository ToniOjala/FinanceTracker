export enum TransactionType {
  Expense = 'expense',
  Income = 'income'
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
}

export type NewCategory = Omit<Category, 'id'>;

export interface Transaction {
  id: string;
  type: TransactionType,
  amount: number,
  date: string,
  category: string
}