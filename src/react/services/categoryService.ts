import { DBTable, Category } from '../../shared/types';
import { getMany, post } from './dbService';

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>(DBTable.CATEGORIES);
}

export const saveCategory = (category: Category): Promise<Category> => {
  return post<Category>(DBTable.CATEGORIES, category);
}