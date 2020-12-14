import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getBudgets, saveBudget } from '../services/budgetService';
import { Budget } from '../types';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: [] as Budget[],
  reducers: {
    setBudgets: (state, action) => {
      return action.payload;
    },
    addBudget: (state, action) => {
      state.push(action.payload);
    }
  }
})

export const { setBudgets, addBudget } = budgetSlice.actions;
export default budgetSlice.reducer;

export const fetchBudgets = (): AppThunk => async dispatch => {
  try {
    const budgets = await getBudgets();
    dispatch(setBudgets(budgets));
  } catch (error) {
    console.error('Error while fetching budgets', error);
  }
}

export const postBudget = (budget: Budget): AppThunk => async dispatch => {
  try {
    const savedBudget = await saveBudget(budget);
    dispatch(addBudget(savedBudget));
  } catch (error) {
    console.error('Error while posting budget: ', error);
  }
}

export const selectBudgets = (state: RootState): Budget[] => state.budgets;