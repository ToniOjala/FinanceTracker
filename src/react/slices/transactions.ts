/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getYearlyData, getTransactionsOfMonth, saveTransaction } from "../services/transactionService";
import { RootState } from "../rootReducer";
import { NewTransaction, Transaction } from "../../shared/types";
import { YearlyData } from "../types";

const initialState = {
  transactions: [] as Transaction[],
  yearlyData: {} as YearlyData,
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setYearlyData: (state, action) => {
      state.yearlyData = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    }
  }
})

export const { setTransactions, setYearlyData, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

export const fetchTransactionsOfMonth = (year: number, month: number): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsOfMonth(year, month);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.error('Error while fetching transactions: ', error);
  }
}

export const fetchYearlyData = (year: number): AppThunk => async dispatch => {
  try {
    const yearlyData = await getYearlyData(year);
    dispatch(setYearlyData(yearlyData));
  } catch (error) {
    console.error('Error while fetching sums by categories: ', error);
  }
}

export const postTransaction = (transaction: NewTransaction): AppThunk => async dispatch => {
  try {
    const savedTransaction = await saveTransaction(transaction);
    dispatch(addTransaction(savedTransaction));
  } catch (error) {
    console.error('Error while posting transaction', error);
  }
}

export const selectTransactions = (state: RootState): Transaction[] => state.transactions.transactions;
export const selectYearlyData = (state: RootState): YearlyData => state.transactions.yearlyData;