import { DBTable } from '../../shared/types';
import { Transaction } from '../types';
import { get } from './apiService';
import { getMany, post } from './dbService';

const url = 'http://localhost:3001/api/transactions';
const table = DBTable.TRANSACTIONS;

export const getTransactionsOfMonth = (year: number, month: number): Promise<Transaction[]> => {
  return getMany<Transaction[]>(table, { year, month })
}

export const getTransactionsOfYear = (year: number): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/?year=${year}`);
}

export const getYearlyData = (year: number): Promise<[]> => {
  return get<[]>(`${url}/yearly-data?year=${year}`);
}

export const saveTransaction = (transaction: Transaction): Promise<Transaction> => {
  return post<Transaction>(table, transaction);
}