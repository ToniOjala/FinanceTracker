import type { Budget, BudgetsByCategory, NewBudget } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'budgets';

export async function saveBudget(budget: NewBudget): Promise<Budget> {
	const savedBudget = await sendDbRequest<Budget>(table, 'create', budget);
	return savedBudget;
}

export async function getLatestBudgets(date: string): Promise<BudgetsByCategory> {
	const budgets = await sendDbRequest<Budget[]>(table, 'read_latest', date);

	const budgetsByCategory: BudgetsByCategory = {};
	for (const budget of budgets) {
		budgetsByCategory[budget.categoryId] = budget.amount;
	}

	return budgetsByCategory;
}
