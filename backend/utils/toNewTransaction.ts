/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ITransaction, TransactionType } from "../models/transaction";
import {  isString, isTransactionType } from "./validation";


const toNewTransaction = (object: any): ITransaction => {
  const newTransaction: ITransaction = {
    type: parseType(object.type),
    amount: parseAmount(object.amount),
    date: parseDate(object.date),
    category: parseCategoryId(object.category)
  };

  return newTransaction;
};

const parseType = (type: any): TransactionType => {
  if (!type || !isTransactionType(type)) 
    throw new Error('Incorrect or missing transaction type: ' + type);
  
  return type;
};

const parseAmount = (amount: any): number => {
  if (!amount || typeof amount !== 'number')
    throw new Error('Incorrect or missing amount: ' + amount);

  return amount;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseCategoryId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing categoryId: ' + id);
  }

  return id;
};

export default toNewTransaction;