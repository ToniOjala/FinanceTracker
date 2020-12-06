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

export type NewTransaction = Omit<Transaction, 'id'>;

export enum Months {
  Jan = 'January',
  Feb = 'February',
  Mar = 'March',
  Apr = 'April',
  May = 'May',
  Jun = 'June',
  Jul = 'July',
  Aug = 'August',
  Sep = 'September',
  Oct = 'October',
  Nov = 'November',
  Dec ='December'
}