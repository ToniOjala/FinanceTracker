import { Category } from "../types";
import { get, post, put } from "./apiService";

const url = 'http://localhost:3001/api/categories';

export const getCategories = (): Promise<Category[]> => {
  return get<Category[]>(url);
}

export const saveCategory = (category: Category): Promise<Category> => {
  return post<Category>(url, category);
}

export const updateCategory = (category: Category): Promise<Category> => {
  return put<Category>(`${url}/${category._id}`, category);
}