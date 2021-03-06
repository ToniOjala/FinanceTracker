import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getCategories, saveCategory, updateCategoryInDB } from '../services/categoryService';
import { Category, CategoryType, NewCategory } from '../../shared/types';
import { isCategory } from '../utils/verify';

const categorySlice = createSlice({
  name: 'category',
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    replaceCategory: (state, action) => {
      return state.map(cat => {
        if (cat.id === action.payload.id) return action.payload;
        return cat;
      });
    }
  }
})

export const { setCategories, addCategory, replaceCategory } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = (): AppThunk => async dispatch => {
  try {
    let categories = await getCategories();
    categories = categories.filter(cat => isCategory(cat));
    dispatch(setCategories(categories));
  } catch (error) {
    console.error('Error while fetcing categories: ', error);
  }
}

export const postCategory = (category: NewCategory): AppThunk => async dispatch => {
  try {
    const savedCategory = await saveCategory(category);
    dispatch(addCategory(savedCategory));
  } catch (error) {
    console.error('Error while posting category: ', error);
  }
}

export const updateCategory = (category: Category): AppThunk => async dispatch => {
  try {
    const updatedCategory = await updateCategoryInDB(category);
    dispatch(replaceCategory(updatedCategory));
  } catch (error) {
    console.error('Error while updating category: ', error);
  }
}

export const selectCategories = (state: RootState): Category[] => state.categories;

export const selectIncomeCategories = (state: RootState): Category[] => {
  try { return state.categories.filter(cat => cat.type === 'income'); }
  catch (_) { return [] as Category[]; }
}

export const selectExpenseCategories = (state: RootState): Category[] => {
  try { return state.categories.filter(cat => cat.type === 'expense'); }
  catch (_) { return [] as Category[]; }
}