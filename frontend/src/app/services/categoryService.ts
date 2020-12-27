import { Category } from '../types';
import { getMany, post } from './dbService';

export function getCategories(): Promise<Category[]> {
  return getMany<Category[]>('categories');
}

export const saveCategory = (category: Category): Promise<Category> => {
  const keys = ['name', 'type', 'balance'];
  return post<Category>('categories', keys, category);
}