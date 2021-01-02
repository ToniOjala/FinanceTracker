import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

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