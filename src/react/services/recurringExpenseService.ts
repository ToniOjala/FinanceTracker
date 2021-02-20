import { getMany, post, update, deleteItem } from './dbService';
import { RecurringExpense, NewRecurringExpense } from '../../shared/types';

const table = 'recurringExpenses';

export function getRecurringExpenses (): Promise<RecurringExpense[]> {
  return getMany<RecurringExpense[]>(table);
}

export function saveRecurringExpense (expense: NewRecurringExpense): Promise<RecurringExpense> {
  return post<NewRecurringExpense, RecurringExpense>(table, expense);
}

export function deleteRecurringExpenseFromDB (expense: RecurringExpense): Promise<boolean> {
  return deleteItem<RecurringExpense>(table, expense);
}

export function updateRecurringExpenseInDB (expense: RecurringExpense): Promise<RecurringExpense> {
  return update<RecurringExpense>(table, expense);
}