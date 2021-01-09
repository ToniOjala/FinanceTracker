import { DBTable, Category, NewCategory } from '../../shared/types';
import { getMany, post, update } from './dbService';

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>(DBTable.CATEGORIES);
}

export const saveCategory = (category: NewCategory): Promise<Category> => {
  return post<NewCategory, Category>(DBTable.CATEGORIES, category);
}

export const updateBalance = (categoryName: string, balance: number): Promise<Category> => {
  return update<Category>(DBTable.CATEGORIES, { categoryName, balance });
}