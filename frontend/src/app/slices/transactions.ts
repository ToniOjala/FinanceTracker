/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getYearlyData, getTransactionsOfMonth, getTransactionsOfYear, saveTransaction } from "../services/transactionService";
import { Transaction, YearlyData } from "../types";
import { RootState } from "../rootReducer";
import { KeyValuePair } from "../../shared/types";

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

export const fetchTransactionsOfYear = (year: number): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsOfYear(year);
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

export const postTransaction = (transaction: Transaction): AppThunk => async dispatch => {
  try {
    const savedTransaction = await saveTransaction(transaction);
    dispatch(addTransaction(savedTransaction));
  } catch (error) {
    console.error('Error while posting transaction', error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const parseYearlyData = (data: any[]): KeyValuePair => {
//   const yearlyData: KeyValuePair = {};
//   data.forEach(element => {
//     const category = element[0];
//     const values = element[1];
//     yearlyData[category] = values;
//   });

//   return yearlyData;
// }

export const selectTransactions = (state: RootState): Transaction[] => state.transactions.transactions;
export const selectYearlyData = (state: RootState): YearlyData => state.transactions.yearlyData;