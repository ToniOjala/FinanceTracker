/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewTransaction, TransactionType } from "../types";


const toNewTransaction = (object: any): NewTransaction => {
  const newTransaction: NewTransaction = {
    type: parseType(object.type),
    amount: parseAmount(object.amount),
    date: parseDate(object.date),
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
    console.log(date);
    console.log(isString(date));
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isTransactionType = (type: any): type is TransactionType => {
  return Object.values(TransactionType).includes(type);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewTransaction;