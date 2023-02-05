import type { RecurringExpense, NewRecurringExpense } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'recurringExpenses';

export async function saveRecurringExpense(
	expense: NewRecurringExpense
): Promise<RecurringExpense> {
	try {
		const savedExpense = await sendDbRequest<RecurringExpense>(table, 'create', expense);
		return savedExpense;
	} catch (error) {
		console.error(error);
	}
}

export async function getRecurringExpenses(): Promise<RecurringExpense[]> {
	try {
		const expenses = await sendDbRequest<RecurringExpense[]>(table, 'read');
		return expenses;
	} catch (error) {
		console.error(error);
	}
}

export async function updateRecurringExpense(expense: RecurringExpense): Promise<RecurringExpense> {
	try {
		const updatedExpense = await sendDbRequest<RecurringExpense>(table, 'update', expense);
		return updatedExpense;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteRecurringExpense(expense: RecurringExpense): Promise<void> {
	try {
		await sendDbRequest<RecurringExpense>(table, 'delete', expense);
	} catch (error) {
		console.error(error);
	}
}
