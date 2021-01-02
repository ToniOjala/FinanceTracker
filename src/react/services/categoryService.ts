import { DBTable, Category } from '../../shared/types';
import { getMany, post, update } from './dbService';

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>(DBTable.CATEGORIES);
}

export const saveCategory = (category: Category): Promise<Category> => {
  return post<Category>(DBTable.CATEGORIES, category);
}

export const updateBalance = (categoryName: string, balance: number): Promise<Category> => {
  console.log(`Updating balance of category ${categoryName} to ${balance}`);
  return update<Category>(DBTable.CATEGORIES, { categoryName, balance });
}