import { DBTable, KeyValuePair } from "../../shared/types";
import { send } from "./ipcService";

export function get<T>(table: DBTable, id: number): Promise<T> {
  const requestParams = { table, method: 'get', query: { id } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function getMany<T>(table: DBTable, query?: KeyValuePair): Promise<T> {
  const requestParams = { table, method: 'getMany', query };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function getCustom<T>(table: DBTable, method: string, query?: KeyValuePair): Promise<T> {
  const requestParams = { table, method, query };
  const result = send<T>('database', { params: requestParams });
  return result
}

export function post<T, K>(table: DBTable, item: T): Promise<K> {
  const requestParams = { table, method: 'post', data: { item } };
  const result = send<K>('database', { params: requestParams });
  return result;
}

export function postMany<T, K>(table: DBTable, items: T): Promise<K> {
  const requestParams = { table, method: 'postMany', data: { items }};
  const result = send<K>('database', { params: requestParams });
  return result;
}

export function sendCustom<T>(table: DBTable, method: string, item: unknown): Promise<T> {
  const requestParams = { table, method, data: { item } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function update<T>(table: DBTable, item: unknown): Promise<T> {
  const requestParams = { table, method: 'update', data: { item } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function deleteItem<T>(table: DBTable, item: T): Promise<boolean> {
  const requestParams = { table, method: 'delete', data: { item } };
  const result = send<boolean>('database', { params: requestParams });
  return result;
}