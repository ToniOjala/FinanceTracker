import { useState, useEffect } from 'react';
import { Category } from '../types';
import { get } from '../services/apiService';

export const useGetCategories = (): Category[] => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const fetchedCategories = await get<Category[]>('http://localhost:3001/api/categories');
    setCategories(fetchedCategories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}