import { KeyValuePair, NewTransaction, Transaction } from '../../shared/types';
import { deleteItem, getCustom, getMany, post, update } from './dbService';

const table = 'transactions';

export const getTransactionsOfMonth = (year: number, month: number): Promise<Transaction[]> => {
  return getMany<Transaction[]>(table, { year, month });
}

export const getYearlyData = (year: number): Promise<KeyValuePair> => {
  return getCustom<KeyValuePair>(table, 'yearly-data', { year });
}

export const saveTransaction = (transaction: NewTransaction): Promise<Transaction> => {
  return post<NewTransaction, Transaction>(table, transaction);
}

export const deleteTransactionFromDB = (transaction: Transaction): Promise<boolean> => {
  return deleteItem<Transaction>(table, transaction);
}

export const updateTransactionInDB = (transaction: Transaction): Promise<Transaction> => {
  return update<Transaction>(table, transaction);
}