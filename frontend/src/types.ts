export interface Category {
  name: string;
}

export enum TransactionType {
  Expense = 'expense',
  Income = 'income'
}

export interface Transaction {
  type: TransactionType,
  amount: number,
  date: string,
  category: string
}