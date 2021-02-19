import { KeyValuePair, Budget, NewBudget } from '../../shared/types';
import { getCustom, postMany } from './dbService';

const table = 'budgets';

export const getLatestBudgets = (date: string): Promise<KeyValuePair> => {
  return getCustom<KeyValuePair>(table, 'getLatest', { date });
}

export const postBudgets = (budgets: NewBudget[]): Promise<Budget[]> => {
  return postMany<NewBudget[], Budget[]>(table, budgets);
}