/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ITransaction } from "../models/transaction";
import { isString } from "./validation";

const toNewTransaction = (object: any): ITransaction => {
  const newTransaction: ITransaction = {
    amount: parseAmount(object.amount),
    date: parseDate(object.date),
    category: parseCategory(object.category)
  };

  return newTransaction;
};

const parseAmount = (amount: any): number => {
  if (!amount || typeof amount !== 'number')
    throw new Error('Incorrect or missing amount: ' + amount);

  return amount;
};

const parseDate = (date: any): Date => {
  try {
    if (!date || !isString(date)) 
      throw new Error('Incorrect or missing date: ' + date);
    const parsedDate = new Date(date);
    return parsedDate;
  } catch {
    throw new Error('Incorrect or missing date: ' + date);
  }
};

const parseCategory = (category: any): string => {
  if (!category || !isString(category)) {
    throw new Error('Incorrect or missing category: ' + category);
  }

  return category;
};

export default toNewTransaction;