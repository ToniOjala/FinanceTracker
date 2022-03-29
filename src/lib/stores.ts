import type { Category, Notification, Transaction, BalanceLog, BudgetsByCategory, YearlyData, RecurringExpense } from '../types'
import { writable } from 'svelte/store';

export const selectedDate = writable(new Date());
export const balanceLogs = writable<BalanceLog[]>([]);
export const budgets = writable<BudgetsByCategory>({});
export const categories = writable<Category[]>([]);
export const notifications = writable<Notification[]>([]);
export const recurringExpenses = writable<RecurringExpense[]>([]);
export const transactions = writable<Transaction[]>([]);
export const yearlyData = writable<YearlyData>({});