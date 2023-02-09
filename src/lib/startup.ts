import { formatDistanceToNowStrict } from 'date-fns';
import type {
	Category,
	NewNotification,
	Notification,
	NewTransaction,
	RecurringExpense
} from '$lib/types';
import { formatDate, removeDays } from './utils/dates';
import { getAppData, updateLastOpenedDate } from './services/applicationService';
import {
	deleteNotification,
	getNotifications,
	saveNotification
} from './services/notificationService';
import { getRecurringExpenses } from './services/recurringExpenseService';
import { saveTransaction } from './services/transactionService';
import { categories, notifications } from './stores';
import { readUserPreferences } from './services/preferencesService';
import { getCategories } from './services/categoryService';

export async function handleStartup(): Promise<void> {
	await readUserPreferences();

	const appData = await getAppData();
	const lastOpened = new Date(appData.lastOpened);
	const today = new Date();

	if (
		lastOpened.getDate() == today.getDate() &&
		lastOpened.getMonth() == today.getMonth() &&
		lastOpened.getFullYear() == today.getFullYear()
	)
		return;

	const cats = await getCategories(new Date().getFullYear());
	categories.set(cats);
	await processRecurringExpenses(cats, lastOpened);
	await processNotifications();
	await updateLastOpenedDate(formatDate(new Date()));
}

async function processNotifications(): Promise<void> {
	const nots = await getNotifications();
	const finalNots: Notification[] = [];

	for (const notification of nots) {
		const distance = formatDistanceToNowStrict(new Date(notification.date));
		const [value, word] = distance.split(' ');

		if (word === 'days' && Number(value) > 7 && notification.read) {
			deleteNotification(notification);
		} else {
			finalNots.push(notification);
		}
	}

	notifications.set(finalNots);
}

async function processRecurringExpenses(categories: Category[], lastOpened: Date): Promise<void> {
	const today = new Date();
	const recurringExpenses = await getRecurringExpenses();

	for (const expense of recurringExpenses) {
		const notificationDay = expense.day - expense.notifyDaysBefore;
		// Expense is due today
		if (expense.recurs === 'monthly' && expense.day === today.getDate()) {
			await applyRecurringExpense(expense, categories);
			await applyExpenseNotification(expense, 0);
		} else if (
			expense.recurs === 'yearly' &&
			expense.month === today.getMonth() + 1 &&
			expense.day === today.getDate()
		) {
			await applyRecurringExpense(expense, categories);
			await applyExpenseNotification(expense, 0);
		}
		// Expense has been due since last time application was opened
		else if (
			expense.recurs === 'monthly' &&
			today.getDate() > expense.day &&
			lastOpened.getDate() < expense.day
		) {
			await applyRecurringExpense(expense, categories);
			await applyExpenseNotification(expense, expense.day - today.getDate());
		} else if (
			expense.recurs === 'yearly' &&
			expense.month === today.getMonth() + 1 &&
			today.getDate() > expense.day &&
			lastOpened.getDate() < expense.day
		) {
			await applyRecurringExpense(expense, categories);
			await applyExpenseNotification(expense, expense.day - today.getDate());
		}
		// Expense notification date has passed since last time application was opened
		else if (
			expense.recurs === 'monthly' &&
			today.getDate() >= notificationDay &&
			notificationDay > lastOpened.getDate()
		) {
			await applyExpenseNotification(expense, expense.day - today.getDate());
		} else if (
			expense.recurs === 'yearly' &&
			expense.month === today.getMonth() + 1 &&
			today.getDate() >= notificationDay &&
			notificationDay > lastOpened.getDate()
		) {
			await applyExpenseNotification(expense, expense.day - today.getDate());
		}
	}
}

async function applyRecurringExpense(
	expense: RecurringExpense,
	categories: Category[]
): Promise<void> {
	const today = new Date();

	const transaction: NewTransaction = {
		ctype: categories.filter((c) => c.id === expense.categoryId)[0].ctype,
		amount: expense.amount,
		date: formatDate(new Date(today.getFullYear(), expense.month || today.getMonth(), expense.day)),
		categoryId: expense.categoryId,
		label: expense.name
	};

	await saveTransaction(transaction);
}

async function applyExpenseNotification(expense: RecurringExpense, days: number) {
	const notification: NewNotification = {
		date: formatDate(new Date()),
		message: `Recurring expense "${expense.name}" `
	};

	if (days > 1) notification.message += `will be due in ${days} days`;
	if (days === 1) notification.message += `will be due in 1 day`;
	if (days <= 0) notification.message += `was due`;
	if (days < 0) {
		notification.date = formatDate(removeDays(new Date(), Math.abs(days)));
	}

	await saveNotification(notification);
}
