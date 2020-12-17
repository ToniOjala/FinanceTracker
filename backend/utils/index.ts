import toNewTransaction from './toNewTransaction';
import { toNewCategory, toCategoryWithId } from './toCategory';
import toNewBudgets from './toNewBudgets';
import { filterByMonth } from './filters';
import { IBudget } from '../models/budget';

export const budgetExists = (budget: IBudget, budgets: IBudget[]): boolean => {
  for (const b of budgets) {
    if (b.amount === budget.amount &&
        b.category === budget.category &&
        b.startDate === budget.startDate) return true;
  }

  return false;
};

export {
  toNewTransaction,
  toNewCategory,
  toCategoryWithId,
  toNewBudgets,
  filterByMonth
};