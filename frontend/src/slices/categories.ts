/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getCategories, saveCategory } from "../services/categoryService";
import { Category } from "../types";

const categorySlice = createSlice({
  name: 'category',
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, { payload }) => {
      state = payload;
    },
    addCategory: (state, { payload }) => {
      saveCategory(payload)
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