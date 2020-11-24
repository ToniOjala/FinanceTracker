/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TransactionType } from '../models/transaction';

export const isTransactionType = (type: any): type is TransactionType => {
  return Object.values(TransactionType).includes(type);
};

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};