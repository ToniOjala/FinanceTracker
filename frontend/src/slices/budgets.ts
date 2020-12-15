import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getBudgets, postBudgets } from '../services/budgetService';
import { Budget } from '../types';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: [] as Budget[],
  reducers: {
    setBudgets: (state, action) => {
      return action.payload;
    },
    addBudgets: (state, action) => {
      const budgets: Budget[] = action.payload;
      budgets.forEach(b => {
        state.push(b);
      })
    }
  }
})

export const { setBudgets, addBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;

export const fetchBudgets = (): AppThunk => async dispatch => {
  try {
    const budgets = await getBudgets();
    dispatch(setBudgets(budgets));
  } catch (error) {
    console.error('Error while fetching budgets', error);
  }
}

export const saveBudgets = (budgets: Budget[]): AppThunk => async dispatch => {
  try {
    const savedBudgets = await postBudgets(budgets);
    if (savedBudgets.length > 0) dispatch(addBudgets(savedBudgets));
  } catch (error) {
    console.error('Error while saving budgets', error);
  }
}

export const selectBudgets = (state: RootState): Budget[] => state.budgets;