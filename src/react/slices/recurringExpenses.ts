import { createSlice } from "@reduxjs/toolkit";
import { NewRecurringExpense, RecurringExpense } from "../../shared/types";
import { RootState } from "../rootReducer";
import { deleteRecurringExpenseFromDB, getRecurringExpenses, saveRecurringExpense, updateRecurringExpenseInDB } from "../services/recurringExpenseService";
import { AppThunk } from "../store";
import { isRecurringExpense } from "../utils/verify";

const recurringExpenseSlice = createSlice({
  name: 'recurringExpense',
  initialState: [] as RecurringExpense[],
  reducers: {
    setRecurringExpenses: (state, action) => {
      return action.payload;
    },
    addRecurringExpense: (state, action) => {
      state.push(action.payload);
    },
    removeRecurringExpense: (state, action) => {
      return state.filter(exp => exp.id !== action.payload.id);
    },
    replaceRecurringExpense: (state, action) => {
      return state.map(exp => {
        if (exp.id === action.payload.id) return action.payload;
        else return exp;
      })
    }
  }
})

export const { setRecurringExpenses, addRecurringExpense, removeRecurringExpense, replaceRecurringExpense } = recurringExpenseSlice.actions;
export default recurringExpenseSlice.reducer;

export const fetchRecurringExpenses = (): AppThunk => async dispatch => {
  try {
    let expenses = await getRecurringExpenses();
    expenses = expenses.filter(exp => isRecurringExpense(exp));
    dispatch(setRecurringExpenses(expenses));
  } catch (error) {
    console.error('Error while fetching recurring expenses: ', error);
  }
}

export const postRecurringExpense = (expense: NewRecurringExpense): AppThunk => async dispatch => {
  try {
    const savedExpense = await saveRecurringExpense(expense);
    dispatch(addRecurringExpense(savedExpense));
  } catch (error) {
    console.error('Error while posting recurring expense: ', error);
  }
}

export const updateRecurringExpense = (expense: RecurringExpense): AppThunk => async dispatch => {
  try {
    const updatedExpense = await updateRecurringExpenseInDB(expense);
    dispatch(replaceRecurringExpense(updatedExpense));
  } catch (error) {
    console.error('Error while updating recurring expense', error);
  }
}

export const deleteRecurringExpense = (expense: RecurringExpense): AppThunk => async dispatch => {
  try {
    const deleted = await deleteRecurringExpenseFromDB(expense);
    if (deleted) dispatch(removeRecurringExpense(expense));
  } catch (error) {
    console.error('Error while deleting recurring expense', error);
  }
}

export const selectMonthlyRecurringExpenses = (state: RootState): RecurringExpense[] => state.recurringExpenses.filter(exp => exp.recurs === 'monthly');
export const selectYearlyRecurringExpenses = (state: RootState): RecurringExpense[] => state.recurringExpenses.filter(exp => exp.recurs === 'yearly');