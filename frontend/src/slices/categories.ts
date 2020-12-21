/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getCategories, saveCategory, updateCategory } from "../services/categoryService";
import { Category, CategoryType } from "../types";

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
      return state.map(category => {
        if (category.name === action.payload.name) return action.payload;
        else return category;
      });
    }
  }
})

export const { setCategories, addCategory, replaceCategory } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = (): AppThunk => async dispatch => {
  try {
    const categories = await getCategories();
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

export const updateCategories = (categoriesToUpdate: Category[]): AppThunk => async dispatch => {
  try {
    for (const category of categoriesToUpdate) {
      const updatedCategory = await updateCategory(category);
      dispatch(replaceCategory(updatedCategory));
    }
  } catch (error) {
    console.error('Error while updating categories');
  }
}

export const selectCategories = (state: RootState): Category[] => state.categories;

export const selectIncomeCategories = (state: RootState): Category[] => 
  state.categories.filter(cat => cat.type === CategoryType.Income);

export const selectExpenseCategories = (state: RootState): Category[] => 
  state.categories.filter(cat => cat.type === CategoryType.Expense);