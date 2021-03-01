import { BalanceLog, Budget, Category, Notification, RecurringExpense, Transaction } from '../../shared/types';

export function isDateString(date: string) {
  const matches = new RegExp(/\d{4}-\d{2}-\d{2}/).test(date);
  return matches;
}

export function isCategory(data: any): data is Category {
  if (!data.id || typeof data.id !== 'number') return false;
  else if (!data.name || typeof data.name !== 'string') return false;
  else if (!data.type || (data.type !== 'expense' && data.type !== 'income')) return false;
  else if (data.balance === null || data.balance === undefined || typeof data.balance !== 'number') return false;
  else if (!data.created || typeof data.created !== 'string') return false;
  return true;
}

export function isTransaction(data: any): data is Transaction {
  if (!data.id || typeof data.id !== 'number') return false;
  else if (data.amount === null || data.amount === undefined || typeof data.amount !== 'number') return false;
  else if (!data.date || !isDateString(data.date)) return false;
  else if (!data.categoryId || typeof data.categoryId !== 'number') return false;
  return true;
}

export function isBudget(data: any): data is Budget {
  if (!data.id || typeof data.id !== 'number') return false;
  else if (data.amount === null || data.amount === undefined || typeof data.amount !== 'number') return false;
  else if (!data.startDate || !isDateString(data.startDate)) return false;
  else if (!data.categoryId || typeof data.categoryId !== 'number') return false;
  return true;
}

export function isBalanceLog(data: any): data is BalanceLog {
  if (!data.id || typeof data.id !== 'number') return false;
  else if (!data.categoryId || typeof data.categoryId !== 'number') return false;
  else if (data.amount === null || data.amount === undefined || typeof data.amount !== 'number') return false;
  else if (!data.date || !isDateString(data.date)) return false;
  return true;
}

export function isRecurringExpense(data: any): data is RecurringExpense {
  if (!data.id || typeof data.id !== 'number') return false;
  else if (!data.categoryId || typeof data.categoryId !== 'number') return false;
  else if (!data.name || typeof data.name !== 'string') return false;
  else if (data.amount === null || data.amount === undefined || typeof data.amount !== 'number') return false;
  else if (!data.recurs || (data.recurs !== 'monthly' && data.recurs !== 'yearly')) return false;
  else if (!data.day || typeof data.day !== 'number') return false;
  else if (data.notifyDaysBefore === null || data.notifyDaysBefore === undefined || typeof data.notifyDaysBefore !== 'number') return false;
  return true;
}

export function isNotification(data: any): data is Notification {
  if (!data.id || typeof data.id !== 'number') return false;
  else if (!data.message || typeof data.message !== 'string') return false;
  else if (data.read === null || data.read === undefined || typeof data.read !== 'number') return false;
  else if (!data.date || !isDateString(data.date)) return false;
  return true;
}