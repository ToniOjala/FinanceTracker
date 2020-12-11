/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getTransactionsByCategory, getTransactionsByDate, saveTransaction } from "../services/transactionService";
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

export const fetchTransactionsByDate = (yearMonth: YearMonth): AppThunk => async dispatch => {
  try {
    const transactions = await getTransactionsByDate(yearMonth);
    dispatch(setTransactions(transactions));
  } catch (error) {
    console.log('Error while fetching transactions: ', error);
  }
}