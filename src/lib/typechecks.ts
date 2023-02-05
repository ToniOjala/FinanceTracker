import type { RecurringExpense, NewRecurringExpense, Transaction, NewTransaction } from './types';

export function isNewRecurringExpense(
	item: RecurringExpense | NewRecurringExpense
): item is NewRecurringExpense {
	return (<RecurringExpense>item).id == undefined;
}

export function isNewTransaction(item: Transaction | NewTransaction): item is NewTransaction {
	return (<Transaction>item).id == undefined;
}
