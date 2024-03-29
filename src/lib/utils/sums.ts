import type { Category, Transaction } from '$lib/types';
import { roundToDecimals } from './round';

export const sumOfTransactionsInCategory = (
	category: Category,
	transactions: Transaction[]
): string => {
	if (!category || !transactions || transactions.length === 0) return '0.00';
	const transOfCategory = transactions?.filter((tr) => tr.categoryId === category.id);
	let sum = 0;

	transOfCategory.forEach((tr) => {
		sum += tr.amount;
	});

	return roundToDecimals(sum, 2);
};

export const sumOfTransactionsInCategories = (
	categories: Category[],
	transactions: Transaction[]
): string => {
	if (!categories || !transactions || categories.length === 0 || transactions.length === 0)
		return '0.00';
	let sum = 0;
	const categoryIds = categories.map((c) => c.id);

	transactions.forEach((tr) => {
		if (categoryIds.includes(tr.categoryId)) sum += tr.amount;
	});

	return roundToDecimals(sum, 2);
};

export const sumOfCategoryBalances = (categories: Category[]): string => {
	if (!categories || categories.length === 0) return '0.00';
	let sum = categories.reduce((acc, curr) => acc + curr.balance, 0);
	return roundToDecimals(sum, 2);
};
