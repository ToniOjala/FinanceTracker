import { Category } from '../types';
import { getMany } from './dbService';

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>('categories');
}

// export const saveCategory = (category: Category): Promise<Category> => {
//   return post<Category>(url, category);
// }