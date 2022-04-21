import type { Transaction, NewTransaction, DBTable, YearlyData } from 'src/types';
import { sendDbRequest } from './dbService';

const table: DBTable = 'transactions';

export async function saveTransaction (transaction: NewTransaction): Promise<Transaction> {
  try {
    const savedTransaction = await sendDbRequest<Transaction>(table, 'create', transaction);
    return savedTransaction;
  } catch (error) {
    console.error(error);
  }
}

export async function getTransactionsByMonth (year: number, month: number): Promise<Transaction[]> {
  try {
    const transactions = await sendDbRequest<Transaction[]>(table, 'read_monthly_data', { year, month });
    return transactions;
  } catch (error) {
    console.error(error);
  }
}

export async function getYearlyData (year: number): Promise<YearlyData> {
  try {
    const yearlyData: YearlyData = await sendDbRequest<YearlyData>(table, 'read_yearly_data', { year });
    return yearlyData;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTransaction (transaction: Transaction): Promise<Transaction> {
  try {
    const updatedTransaction = await sendDbRequest<Transaction>(table, 'update', transaction);
    return updatedTransaction;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTransaction (transaction: Transaction): Promise<void> {
  try {
    await sendDbRequest<Transaction>(table, 'delete', transaction);
  } catch (error) {
    console.error(error);
  }
}