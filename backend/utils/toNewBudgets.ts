/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { IBudget } from '../models/budget';
import { isString } from './validation';

const toNewBudgets = (arr: any[]): IBudget[] => {
  const newBudgets: IBudget[] = [];
  arr.forEach(object => {
    const newBudget: IBudget = {
      amount: parseAmount(object.amount),
      category: parseCategory(object.category),
      startDate: parseDate(object.startDate)
    };
    newBudgets.push(newBudget);
  });

  return newBudgets;
};

const parseAmount = (amount: any): number => {
  if (amount === null || amount === undefined || typeof amount !== 'number')
    throw new Error('Incorrect or missing amount: ' + amount);

  return amount;
};

const parseCategory = (category: any): string => {
  if (!category || !isString(category)) 
    throw new Error('Incorrect or missing category: ' + category);

  return category;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) 
    throw new Error('Incorrect or missing date: ' + date);

  return date;
};

export default toNewBudgets;