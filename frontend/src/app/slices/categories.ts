/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getCategories, saveCategory } from '../services/categoryService';
import { Category, CategoryType } from '../types';
import { IpcService } from '../services/ipcService';

const categorySlice = createSlice({
  name: 'category',
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    }
  }
})

export const { setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = (): AppThunk => async dispatch => {
  try {
    // const categories = await getCategories();
    // dispatch(setCategories(categories));
    const ipc = new IpcService();
    const categories = await ipc.send<Category[]>('database', { params: ['SELECT * FROM categories'] });
    console.log('categories: ', categories);
    dispatch(setCategories(categories));
  } catch (error) {
    console.error('Error while fetcing categories: ', error);
  }
}

export const postCategory = (category: Category): AppThunk => async dispatch => {
  try {
    const savedCategory = await saveCategory(category);
    dispatch(addCategory(savedCategory));
  } catch (error) {
    console.error('Error while posting category: ', error);
  }
}

export const selectCategories = (state: RootState): Category[] => state.categories;

export const selectIncomeCategories = (state: RootState): Category[] => 
  state.categories.filter(cat => cat.type === CategoryType.Income);

export const selectExpenseCategories = (state: RootState): Category[] => 
  state.categories.filter(cat => cat.type === CategoryType.Expense);