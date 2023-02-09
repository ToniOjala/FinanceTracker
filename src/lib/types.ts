export interface ApplicationData {
	lastOpened: string;
}

export type CategoryType = 'expense' | 'income';

export interface Category {
	id: number;
	name: string;
	ctype: CategoryType;
	balance: number;
	created: string;
	removed?: string;
}
export type NewCategory = Omit<Category, 'id' | 'removed'>;

export type BalanceAdditions = { [categoryId: number]: number };
export interface Transaction {
	id: number;
	amount: number;
	date: string;
	label?: string;
	categoryId: number;
}
export interface NewTransaction extends Omit<Transaction, 'id'> {
	ctype: 'income' | 'expense';
	balanceAdditions?: BalanceAdditions;
}

export interface Budget {
	id: number;
	amount: number;
	startDate: string;
	categoryId: number;
}
export type NewBudget = Omit<Budget, 'id'>;

export interface BalanceLog {
	id: number;
	categoryId: number;
	transactionId?: number;
	amount: number;
	date: string;
	label?: string;
}
export type NewBalanceLog = Omit<BalanceLog, 'id'>;

export interface RecurringExpense {
	id: number;
	categoryId: number;
	name: string;
	amount: number;
	recurs: 'monthly' | 'yearly';
	day: number;
	month?: number;
	notifyDaysBefore: number;
}
export type NewRecurringExpense = Omit<RecurringExpense, 'id'>;

export interface Notification {
	id: number;
	message: string;
	read: boolean;
	date: string;
}
export type NewNotification = Omit<Notification, 'id' | 'read'>;

export interface Label {
	id: number;
	categoryId: number;
	name: string;
	lastUsed: string;
}
export type NewLabel = Omit<Label, 'id'>;

export type DBTable =
	| 'application'
	| 'categories'
	| 'transactions'
	| 'budgets'
	| 'balanceLogs'
	| 'recurringExpenses'
	| 'notifications'
	| 'labels';

export interface DbRequest {
	table: DBTable;
	route: string;
	data?: KeyValuePair;
}

export interface DbResponse {
	status: 'success' | 'failure';
	data: string;
}

export interface KeyValuePair {
	[key: string]: unknown;
}

export interface KeyNumberPairs {
	[key: string]: number;
}

export interface BudgetsByCategory {
	[key: string]: number;
}

export interface YearlyData {
	[key: string]: number[];
}

export interface UserPreferences {
	dbPath: string;
}
