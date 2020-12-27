import { DBRequestType } from "../../shared/types";
import { send } from "./ipcService";

export async function getMany<T>(table: string): Promise<T> {
  const sql = `SELECT * FROM ${table}`;
  const result = send<T>('database', [DBRequestType.GET_MANY, sql]);
  return result;
}

export async function getSingle<T>(table: string, id: number): Promise<T> {
  const sql = `SELECT * FROM ${table} WHERE id = ?`;
  const result = send<T>('database', [DBRequestType.GET_SINGLE, sql, id.toString()])
  return result;
}

export async function post<T>(table: string, keys: string[], item: T): Promise<T> {
  const { keyString, paramsString } = getSqlStrings(keys);
  
  const sql = `INSERT INTO ${table} ${keyString} VALUES ${paramsString}`;
  console.log('sql: ', sql);
  const result = send<T>('database', [DBRequestType.POST, sql, item]);
  return result;
}

function getSqlStrings(keys: string[]) {
  let keyString = '(';
  let paramsString = '(';

  keys.forEach(key => {
    keyString += `${key}, `;
    paramsString += '?, ';
  })

  keyString = keyString.substring(0, keyString.length - 2);
  paramsString = paramsString.substring(0, paramsString.length - 2);

  keyString += ')';
  paramsString += ')';

  return { keyString, paramsString };
}