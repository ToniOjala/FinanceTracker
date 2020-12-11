import { Transaction, YearMonth } from "../types";
import { get, post } from "./apiService";

const url = 'http://localhost:3001/api/transactions';

export const getTransactionsByDate = (yearMonth: YearMonth): Promise<Transaction[]> => {
  const year = yearMonth.year;
  const month = yearMonth.month;
  return get<Transaction[]>(`${url}/?year=${year}&month=${month}`);
}

export const getTransactionsOfYear = (year: number): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/?year=${year}`);
}

export const getTransactionsByCategory = (category: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/${category}`);
}

export const getTransactionsByDateAndCategory = (yearMonth: YearMonth, category: string): Promise<Transaction[]> => {
  const year = yearMonth.year;
  const month = yearMonth.month;
  return get<Transaction[]>(`${url}/${category}?year=${year}&month=${month}`);
}

export const saveTransaction = (transaction: Transaction): Promise<Transaction> => {
  return post<Transaction>(url, transaction);
}