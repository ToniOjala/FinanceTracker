import { DBRequestType } from "../../shared/types";
import { send } from "./ipcService";

export async function getMany<T>(table: string): Promise<T> {
  const sql = `SELECT * FROM ${table}`;
  const result = await send<T>('database', [DBRequestType.GET_MANY, sql]);
  return result;
}

export async function getSingle<T>(table: string, id: number): Promise<T> {
  const sql = `SELECT * FROM ${table} WHERE id = ?`;
  const result = await send<T>('database', [DBRequestType.GET_SINGLE, sql, id.toString()])
  return result;
}

// export async function post<T>(url: string, item: T): Promise<T> {
//   const { data } = await axios.post(url, item);
//   return data;
// }