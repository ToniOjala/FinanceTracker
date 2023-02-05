import type { Budget, BudgetsByCategory, NewBudget } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'budgets';

export async function saveBudget(budget: NewBudget): Promise<Budget> {
	try {
		const savedBudget = await sendDbRequest<Budget>(table, 'create', budget);
		return savedBudget;
	} catch (error) {
		console.error(error);
	}
}

export async function getLatestBudgets(date: string): Promise<BudgetsByCategory> {
	try {
		const budgets = await sendDbRequest<Budget[]>(table, 'read_latest', date);

		const budgetsByCategory: BudgetsByCategory = {};
		for (const budget of budgets) {
			budgetsByCategory[budget.categoryId] = budget.amount;
		}

		return budgetsByCategory;
	} catch (error) {
		console.error(error);
	}
}
