import { Category } from "../types";
import { get, post } from "./apiService";

const url = 'http://localhost:3001/api/categories';

export const getCategories = (): Promise<Category[]> => {
  return get<Category[]>(url);
}

export const saveCategory = (category: Category): Promise<Category> => {
  return post<Category>(url, category);
}