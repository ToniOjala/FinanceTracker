/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { IBudget } from '../models/budget';
import { parseDate, parseNumber, parseString } from './parsers';

const toNewBudgets = (arr: any[]): IBudget[] => {
  const newBudgets: IBudget[] = [];
  arr.forEach(object => {
    const newBudget: IBudget = {
      amount: parseNumber(object.amount, 'amount'),
      category: parseString(object.category, 'category'),
      startDate: parseDate(object.startDate, 'startDate')
    };
    newBudgets.push(newBudget);
  });

  return newBudgets;
};

export default toNewBudgets;