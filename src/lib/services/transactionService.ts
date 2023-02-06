import type { Transaction, NewTransaction, DBTable, YearlyData } from '$lib/types';
import { sendDbRequest } from './dbService';

const table: DBTable = 'transactions';

export async function saveTransaction(transaction: NewTransaction): Promise<Transaction> {
	const savedTransaction = await sendDbRequest<Transaction>(table, 'create', transaction);
	return savedTransaction;
}

export async function getTransactionsByMonth(year: number, month: number): Promise<Transaction[]> {
	const transactions = await sendDbRequest<Transaction[]>(table, 'read_monthly_data', {
		year,
		month
	});
	return transactions;
}

export async function getYearlyData(year: number): Promise<YearlyData> {
	const yearlyData: YearlyData = await sendDbRequest<YearlyData>(table, 'read_yearly_data', {
		year
	});
	return yearlyData;
}

export async function updateTransaction(transaction: Transaction): Promise<Transaction> {
	const updatedTransaction = await sendDbRequest<Transaction>(table, 'update', transaction);
	return updatedTransaction;
}

export async function deleteTransaction(transaction: Transaction): Promise<void> {
	await sendDbRequest<Transaction>(table, 'delete', transaction);
}
