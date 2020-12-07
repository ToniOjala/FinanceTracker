import { Transaction, YearMonth } from "../types";
import { get } from "./apiService";

const url = 'http://localhost:3001/api/transactions';

export const getTransactionsByCategory = (category: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/${category}`);
}

export const getTransactionsByDateAndCategory = (yearMonth: YearMonth, category: string): Promise<Transaction[]> => {
  const year = yearMonth.year;
  const month = yearMonth.month;
  return get<Transaction[]>(`${url}/${category}?year=${year}&month=${month}`);
}