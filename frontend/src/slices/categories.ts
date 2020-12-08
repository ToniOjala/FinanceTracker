/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getCategories, saveCategory } from "../services/categoryService";
import { Category } from "../types";

const categorySlice = createSlice({
  name: 'category',
  initialState: [] as Category[],
  reducers: {
    initialize: (state) => {
      getCategories().then(categories => {
        state = categories;
      })
    },
    add: (state, { payload }) => {
      saveCategory(payload).then(category => {
        state.push(category);
      });
    }
  }
})

export const { initialize, add } = categorySlice.actions;
export default categorySlice.reducer;