import { DBTable, KeyValuePair, Budget } from '../../shared/types';
import { getCustom, postMany } from './dbService';

const table = DBTable.BUDGETS;

export const getLatestBudgets = (date: string): Promise<KeyValuePair> => {
  return getCustom<KeyValuePair>(table, 'getLatest', { date });
}

export const postBudgets = (budgets: Budget[]): Promise<Budget[]> => {
  return postMany<Budget[]>(table, budgets);
}