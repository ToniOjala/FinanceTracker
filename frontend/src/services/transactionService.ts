import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { Transaction } from "../types";
import { get } from "./apiService";

const url = 'http://localhost:3001/api/transactions';

export const getTransactionsByCategory = (category: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/${category}`);
}

export const getTransactionsByDateAndCategory = (date: ParsableDate, category: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${url}/date/${date}/${category}`);
}