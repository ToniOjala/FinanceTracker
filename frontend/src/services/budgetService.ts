import { Budget } from '../types';
import { get, post } from './apiService';

const url = 'http://localhost:3001/api/budgets';

export const getBudgets = (): Promise<Budget[]> => {
  return get<Budget[]>(`${url}`);
}

export const saveBudget = (budget: Budget): Promise<Budget> => {
  return post<Budget>(url, budget);
}