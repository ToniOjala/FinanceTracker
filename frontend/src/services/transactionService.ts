import { Transaction, YearMonth } from "../types";
import { get, post } from "./apiService";

const url = 'http://localhost:3001/api/transactions';

export const getTransactionsOfMonth = ({year, month}: YearMonth): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/?year=${year}&month=${month}`);
}

export const getTransactionsOfYear = (year: number): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/?year=${year}`);
}

export const getYearlyData = (year: number): Promise<[]> => {
  return get<[]>(`${url}/yearly-data?year=${year}`);
}

export const saveTransaction = (transaction: Transaction): Promise<Transaction> => {
  return post<Transaction>(url, transaction);
}