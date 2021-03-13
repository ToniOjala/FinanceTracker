import { handleCategoryRequest } from './categoryHandler';
import { handleTransactionRequest } from './transactionHandler';
import { handleBudgetRequest } from './budgetHandler';
import { handleBalanceLogRequest } from './balanceLogHandler';
import { handleRecurringExpenseRequest } from './recurringExpenseHandler';
import { DBTable, KeyValuePair } from '../../../shared/types';
import { handleNotificationRequest } from './notificationHandler';
import { handleLabelRequest } from './labelHandler';

export function handleDatabaseRequest(table: DBTable, method: string, data?: KeyValuePair, query?: KeyValuePair) {
  try {
    let result: unknown;

    if (table === 'categories') result = handleCategoryRequest(method, data);
    else if (table === 'transactions') result = handleTransactionRequest(method, data, query);
    else if (table === 'budgets') result = handleBudgetRequest(method, data, query);
    else if (table === 'balanceLogs') result = handleBalanceLogRequest(method, data, query);
    else if (table === 'recurringExpenses') result = handleRecurringExpenseRequest(method, data);
    else if (table === 'notifications') result = handleNotificationRequest(method, data);
    else if (table === 'labels') result = handleLabelRequest(method, data, query);

    return result;
  } catch (error) {
    console.error('Error while handling database request ', error.message);
  }
}