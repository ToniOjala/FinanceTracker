export enum TransactionType {
  Expense = 'expense',
  Income = 'income'
}

export interface NewTransaction {
  type: TransactionType;
  amount: number;
  date: string;
}