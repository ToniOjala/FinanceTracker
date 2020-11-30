import { Transaction } from "../types";
import { get } from "./apiService";

const url = 'http://localhost:3001/api/transactions';

export const getTransactionsByCategory = (category: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/${category}`);
}