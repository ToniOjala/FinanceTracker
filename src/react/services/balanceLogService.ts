import { DBTable, BalanceLog, NewBalanceLog } from '../../shared/types';
import { getMany, post, update, deleteItem, getCustom } from './dbService';

const table = DBTable.BALANCELOGS;

export function getBalanceLogs(categoryId: number, page: number): Promise<BalanceLog[]> {
  return getMany<BalanceLog[]>(table, { categoryId, page });
}

export function getBalanceLogCount(categoryId: number): Promise<number> {
  return getCustom<number>(table, 'getCount', { categoryId });
}

export function postBalanceLog(balanceLog: NewBalanceLog): Promise<BalanceLog> {
  return post<NewBalanceLog, BalanceLog>(table, balanceLog);
}

export function updateBalanceLogToDB(balanceLog: BalanceLog): Promise<BalanceLog> {
  return update<BalanceLog>(table, balanceLog);
}

export function removeBalanceLogFromDB(balanceLog: BalanceLog): Promise<boolean> {
  return deleteItem<BalanceLog>(table, balanceLog);
}