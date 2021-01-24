import { handleCategoryRequest } from './categoryHandler';
import { handleTransactionRequest } from './transactionHandler';
import { handleBudgetRequest } from './budgetHandler';
import { handleBalanceLogRequest } from './balanceLogHandler';
import { DBTable, KeyValuePair } from '../../../shared/types';

export function handleDatabaseRequest(table: DBTable, method: string, data?: KeyValuePair, query?: KeyValuePair) {
  try {
    let result: unknown;

    if (table === DBTable.CATEGORIES) result = handleCategoryRequest(method, data);
    if (table === DBTable.TRANSACTIONS) result = handleTransactionRequest(method, data, query);
    if (table === DBTable.BUDGETS) result = handleBudgetRequest(method, data, query);
    if (table === DBTable.BALANCELOGS) result = handleBalanceLogRequest(method, data, query);

    return result;
  } catch (error) {
    console.error('Error while handling database request ', error.message);
  }
}