import { DBTable, KeyValuePair } from "../../shared/types";
import { send } from "./ipcService";

export function get<T>(table: DBTable, id: number): Promise<T> {
  const requestParams = { table, requestType: 'get', query: { id } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function getMany<T>(table: DBTable, query?: KeyValuePair): Promise<T> {
  const requestParams = { table, requestType: 'getMany', query };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function getCustom<T>(table: DBTable, requestType: string, query?: KeyValuePair): Promise<T> {
  const requestParams = { table, requestType, query };
  const result = send<T>('database', { params: requestParams });
  return result
}

export function post<T, K>(table: DBTable, item: T): Promise<K> {
  const requestParams = { table, requestType: 'post', data: { item } };
  const result = send<K>('database', { params: requestParams });
  return result;
}

export function postMany<T, K>(table: DBTable, items: T): Promise<K> {
  const requestParams = { table, requestType: 'postMany', data: { items }};
  const result = send<K>('database', { params: requestParams });
  return result;
}

export function update<T>(table: DBTable, item: unknown): Promise<T> {
  const requestParams = { table, requestType: 'update', data: { item } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function deleteItem<T>(table: DBTable, item: T): Promise<boolean> {
  const requestParams = { table, requestType: 'delete', data: { item } };
  const result = send<boolean>('database', { params: requestParams });
  return result;
}