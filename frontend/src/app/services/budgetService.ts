import { Budget, BudgetsByCategory } from '../types';
import { get, post } from './apiService';

const url = 'http://localhost:3001/api/budgets';

export const getLatestBudgets = (year: number, month: number): Promise<BudgetsByCategory> => {
  return get<BudgetsByCategory>(`${url}/latest?year=${year}&month=${month}`);
}

export const postBudgets = (budgets: Budget[]): Promise<Budget[]> => {
  return post<Budget[]>(url, budgets);
}