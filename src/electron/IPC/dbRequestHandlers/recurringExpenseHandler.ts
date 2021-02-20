import { RecurringExpense, NewRecurringExpense, KeyValuePair } from '../../../shared/types';
import RecurringExpenseService from '../../DataAccess/services/recurringExpenseService';

let recurringExpenseService: RecurringExpenseService;

export function handleRecurringExpenseRequest(method: string, data?: KeyValuePair): RecurringExpense | RecurringExpense[] | boolean {
  recurringExpenseService = new RecurringExpenseService();

  switch (method) {
    case 'getMany':
      return handleGetMany();
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return handlePost(data.item as NewRecurringExpense);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      return handleUpdate(data.item as RecurringExpense);
    case 'delete':
      if (!data) throw new Error('Data to delete was not given');
      return handleDelete(data.item as RecurringExpense);
    default:
      throw new Error(`Request method not recognized: ${method}`);
  }
}

function handleGetMany(): RecurringExpense[] {
  return recurringExpenseService.getRecurringExpenses();
}

function handlePost(expense: NewRecurringExpense): RecurringExpense {
  const id = recurringExpenseService.saveRecurringExpense(expense);
  return recurringExpenseService.getRecurringExpense(id);
}

function handleUpdate(expense: RecurringExpense): RecurringExpense {
  recurringExpenseService.updateRecurringExpense(expense);
  return recurringExpenseService.getRecurringExpense(expense.id);
}

function handleDelete(expense: RecurringExpense): boolean {
  recurringExpenseService.deleteRecurringExpense(expense);
  const deletedExpense = recurringExpenseService.getRecurringExpense(expense.id);
  return deletedExpense == null;
}