import { Category } from "../types";
import { get } from "./apiService";

const url = 'http://localhost:3001/api/categories';

export const getCategories = (): Promise<Category[]> => {
  return get<Category[]>(url);
}