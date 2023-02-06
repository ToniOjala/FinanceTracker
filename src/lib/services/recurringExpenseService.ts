import type { RecurringExpense, NewRecurringExpense } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'recurringExpenses';

export async function saveRecurringExpense(
	expense: NewRecurringExpense
): Promise<RecurringExpense> {
	const savedExpense = await sendDbRequest<RecurringExpense>(table, 'create', expense);
	return savedExpense;
}

export async function getRecurringExpenses(): Promise<RecurringExpense[]> {
	const expenses = await sendDbRequest<RecurringExpense[]>(table, 'read');
	return expenses;
}

export async function updateRecurringExpense(expense: RecurringExpense): Promise<RecurringExpense> {
	const updatedExpense = await sendDbRequest<RecurringExpense>(table, 'update', expense);
	return updatedExpense;
}

export async function deleteRecurringExpense(expense: RecurringExpense): Promise<void> {
	await sendDbRequest<RecurringExpense>(table, 'delete', expense);
}
