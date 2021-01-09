import { DBTable, KeyValuePair, NewTransaction, Transaction } from '../../shared/types';
import { getCustom, getMany, post } from './dbService';

const table = DBTable.TRANSACTIONS;

export const getTransactionsOfMonth = (year: number, month: number): Promise<Transaction[]> => {
  return getMany<Transaction[]>(table, { year, month });
}

export const getYearlyData = (year: number): Promise<KeyValuePair> => {
  return getCustom<KeyValuePair>(table, 'yearly-data', { year });
}

export const saveTransaction = (transaction: NewTransaction): Promise<Transaction> => {
  return post<NewTransaction, Transaction>(table, transaction);
}