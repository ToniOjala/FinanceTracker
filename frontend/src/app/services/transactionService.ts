import { DBTable } from '../../shared/types';
import { Transaction } from '../types';
import { getCustom, getMany, post } from './dbService';

const table = DBTable.TRANSACTIONS;

export const getTransactionsOfMonth = (year: number, month: number): Promise<Transaction[]> => {
  return getMany<Transaction[]>(table, { year, month });
}

export const getTransactionsOfYear = (year: number): Promise<Transaction[]> => {
  return getMany<Transaction[]>(table, { year });
}

export const getYearlyData = (year: number): Promise<Transaction[]> => {
  return getCustom<Transaction[]>(table, 'yearly-data', { year });
}

export const saveTransaction = (transaction: Transaction): Promise<Transaction> => {
  return post<Transaction>(table, transaction);
}