import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getLatestBudgets, postBudgets } from '../services/budgetService';
import { Budget } from '../../shared/types';
import { BudgetsByCategory } from '../types';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {} as BudgetsByCategory,
  reducers: {
    setBudgets: (state, action) => {
      return action.payload;
    },
    addBudgets: (state, action) => {
      const budgets: Budget[] = action.payload;
      budgets.forEach(b => {
        state[b.category] = b.amount;
      })
    }
  }
})

export const { setBudgets, addBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;

export const fetchLatestBudgets = (year: number, month: number): AppThunk => async dispatch => {
  try {
    const budgets = await getLatestBudgets(year, month);
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

export const selectBudgets = (state: RootState): BudgetsByCategory => state.budgets;