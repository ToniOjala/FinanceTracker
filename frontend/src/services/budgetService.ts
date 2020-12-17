import { Budget } from '../types';
import { get, post } from './apiService';

const url = 'http://localhost:3001/api/budgets';

export const getBudgets = (): Promise<Budget[]> => {
  return get<Budget[]>(`${url}`);
}

export const getLatestBudgets = (year: number, month: number): Promise<Budget[]> => {
  return get<Budget[]>(`${url}/latest?year=${year}&month=${month}`);
}

export const postBudget = (budget: Budget): Promise<Budget> => {
  return post<Budget>(url, budget);
}

export const postBudgets = (budgets: Budget[]): Promise<Budget[]> => {
  return post<Budget[]>(url, budgets);
}