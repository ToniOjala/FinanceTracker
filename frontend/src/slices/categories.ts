/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getCategories, saveCategory } from "../services/categoryService";
import { Category, TransactionType } from "../types";

const categorySlice = createSlice({
  name: 'category',
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      saveCategory(action.payload)
        .then(category => {
          state.push(category);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
})

export const { setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = (): AppThunk => async dispatch => {
  try {
    const categories = await getCategories();
    dispatch(setCategories(categories));
  } catch (error) {
    console.log('Error while fetcing categories: ', error);
  }
}

export const selectIncomeCategories = (state: RootState): Category[] => 
  state.categories.filter(cat => cat.type === TransactionType.Income);

export const selectExpenseCategories = (state: RootState): Category[] => 
  state.categories.filter(cat => cat.type === TransactionType.Expense);