import { Category, NewCategory } from '../../shared/types';
import { getMany, post, update } from './dbService';

const table = 'categories';

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>(table);
}

export const saveCategory = (category: NewCategory): Promise<Category> => {
  return post<NewCategory, Category>(table, category);
}

export const updateCategoryInDB = (category: Category): Promise<Category> => {
  return update<Category>(table, category)
}