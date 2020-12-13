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

export interface Transaction {
  id: string;
  type: TransactionType,
  amount: number,
  date: string,
  category: string
}

export interface YearlyData {
  [key: string]: number[]
}
export interface DateSelection {
  selectedDate: ParsableDate,
  year: number,
  month: number
}