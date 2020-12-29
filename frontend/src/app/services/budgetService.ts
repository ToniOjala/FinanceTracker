import { DBTable, KeyValuePair } from '../../shared/types';
import { Budget } from '../types';
import { getCustom, postMany } from './dbService';

const table = DBTable.BUDGETS;

export const getLatestBudgets = (year: number, month: number): Promise<KeyValuePair> => {
  return getCustom<KeyValuePair>(table, 'get-latest', { year, month });
}

export const postBudgets = (budgets: Budget[]): Promise<Budget[]> => {
  return postMany<Budget[]>(table, budgets);
}