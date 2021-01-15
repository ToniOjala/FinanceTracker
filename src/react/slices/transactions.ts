/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getYearlyData, getTransactionsOfMonth, saveTransaction, deleteTransactionFromDB, updateTransactionInDB } from "../services/transactionService";
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
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(tr => tr.id !== action.payload.id);
    },
    replaceTransaction: (state, action) => {
      state.transactions = state.transactions.map(tr => {
        if (tr.id === action.payload.id) return action.payload;
        else return tr;
      })
    }
  }
})

export const { setTransactions, setYearlyData, addTransaction, removeTransaction, replaceTransaction } = transactionSlice.actions;
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

export const deleteTransaction = (transaction: Transaction): AppThunk => async dispatch => {
  try {
    const didDelete = await deleteTransactionFromDB(transaction);
    if (didDelete) dispatch(removeTransaction(transaction));
  } catch (error) {
    console.error('Error while deleting transaction', error);
  }
}

export const updateTransaction = (transaction: Transaction): AppThunk => async dispatch => {
  try {
    const updatedTransaction = await updateTransactionInDB(transaction);
    dispatch(replaceTransaction(updatedTransaction));
  } catch (error) {
    console.error('Error while updating transaction', error);
  }
}

export const selectTransactions = (state: RootState): Transaction[] => state.transactions.transactions;
export const selectYearlyData = (state: RootState): YearlyData => state.transactions.yearlyData;