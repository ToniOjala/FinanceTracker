import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

export enum CategoryType {
  Expense = 'expense',
  Income = 'income'
}

export interface Category {
  _id: string;
  name: string;
  type: CategoryType;
}

export interface Transaction {
  _id: string;
  amount: number;
  date: string;
  category: string;
}

export interface Budget {
  _id: string;
  amount: number;
  category: string;
  startDate: Date;
}

export interface BudgetsByCategory {
  [key: string]: number
}

export interface YearlyData {
  [key: string]: number[]
}
export interface DateSelection {
  selectedDate: ParsableDate,
  year: number,
  month: number
}