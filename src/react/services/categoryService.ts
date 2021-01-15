import { DBTable, Category, NewCategory } from '../../shared/types';
import { getMany, post, sendCustom, update } from './dbService';

const table = DBTable.CATEGORIES;

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>(table);
}

export const saveCategory = (category: NewCategory): Promise<Category> => {
  return post<NewCategory, Category>(table, category);
}

export const addToBalance = (categoryId: number, amount: number): Promise<Category> => {
  return sendCustom<Category>(table, 'addBalance', { categoryId, amount });
}

export const updateCategoryInDB = (category: Category): Promise<Category> => {
  return update<Category>(table, category)
}