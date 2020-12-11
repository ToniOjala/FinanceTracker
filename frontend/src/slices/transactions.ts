/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getTransactionsByCategory, getTransactionsOfMonth, getTransactionsOfYear, saveTransaction } from "../services/transactionService";
import { Transaction, YearMonth } from "../types";

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: [] as Transaction[],
  reducers: {
    setTransactions: (state, action) => {
      return action.payload;
    },
    addTransaction: (state, action) => {
      saveTransaction(action.payload)
        .then(transaction => {
          state.push(transaction);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
})

export const { setTransactions, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

export const fetchTransactionsByCategory = (category: string): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsByCategory(category);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.log('Error while fetcing transactions: ', error);
  }
}

export const fetchTransactionsOfMonth = (yearMonth: YearMonth): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsOfMonth(yearMonth);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.log('Error while fetching transactions: ', error);
  }
}

export const fetchTransactionsOfYear = (year: number): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsOfYear(year);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.log('Error while fetching transactions: ', error);
  }
}