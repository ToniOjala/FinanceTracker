import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

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

export type SumsByCategory = Map<string, number>;

export interface YearMonth {
  year: number;
  month: number;
}

export interface DateSelection {
  selectedDate: ParsableDate,
  yearMonth: YearMonth
}