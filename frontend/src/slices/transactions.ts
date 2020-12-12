/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getSumsByCategory, getTransactionsByCategory, getTransactionsOfMonth, getTransactionsOfYear, saveTransaction } from "../services/transactionService";
import { Transaction, YearMonth, SumsByCategory } from "../types";
import { RootState } from "../rootReducer";

const initialState = {
  transactions: [] as Transaction[],
  sumsByCategory: {} as SumsByCategory,
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setSumsByCategory: (state, action) => {
      state.sumsByCategory = action.payload;
    },
    addTransaction: (state, action) => {
      saveTransaction(action.payload)
        .then(transaction => {
          state.transactions.push(transaction);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
})

export const { setTransactions, setSumsByCategory, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

export const fetchTransactionsByCategory = (category: string): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsByCategory(category);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.error('Error while fetcing transactions: ', error);
  }
}

export const fetchTransactionsOfMonth = (yearMonth: YearMonth): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsOfMonth(yearMonth);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.error('Error while fetching transactions: ', error);
  }
}

export const fetchTransactionsOfYear = (year: number): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsOfYear(year);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.error('Error while fetching transactions: ', error);
  }
}

export const fetchSumsByCategory = (year: number): AppThunk => async dispatch => {
  try {
    const sumsByCategory = await getSumsByCategory(year);
    dispatch(setSumsByCategory(sumsByCategory));
  } catch (error) {
    console.error('Error while fetching sums by categories: ', error);
  }
}

export const selectTransactions = (state: RootState): Transaction[] => state.transactions.transactions;
export const selectSumsByCategory = (state: RootState): SumsByCategory => state.transactions.sumsByCategory;