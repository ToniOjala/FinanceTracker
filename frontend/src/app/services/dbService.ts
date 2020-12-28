import { DBTable } from "../../shared/types";
import { send } from "./ipcService";

export async function getMany<T>(table: DBTable): Promise<T> {
  const requestParams = { table, requestType: 'getMany' };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export async function getSingle<T>(table: DBTable, id: number): Promise<T> {
  const requestParams = { table, requestType: 'getSingle', query: { id } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export async function post<T>(table: DBTable, item: T): Promise<T> {
  const requestParams = { table, requestType: 'post', data: { item } };
  const result = send<T>('database', { params: requestParams });
  return result;
}