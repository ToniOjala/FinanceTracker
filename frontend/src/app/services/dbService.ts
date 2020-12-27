import { DBRequestType, DBTable } from "../../shared/types";
import { send } from "./ipcService";

export async function getMany<T>(table: DBTable): Promise<T> {
  const requestParams = { table, requestType: DBRequestType.GET_MANY };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export async function getSingle<T>(table: DBTable, id: number): Promise<T> {
  const requestParams = { table, requestType: DBRequestType.GET_SINGLE, query: { id: id } };
  const result = send<T>('database', { params: requestParams });
  return result;
}

export async function post<T>(table: DBTable, item: T): Promise<T> {
  const requestParams = { table, requestType: DBRequestType.POST, data: { item: item } };
  const result = send<T>('database', { params: requestParams });
  return result;
}