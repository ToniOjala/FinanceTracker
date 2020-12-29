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

export function post<T>(table: DBTable, item: T): Promise<T> {
  const requestParams = { table, requestType: 'post', data: { item } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export function postMany<T>(table: DBTable, items: T): Promise<T> {
  const requestParams = { table, requestType: 'postMany', data: { items }};
  const result = send<T>('database', { params: requestParams });
  return result;
}