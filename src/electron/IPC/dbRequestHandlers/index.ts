import { handleCategoryRequest } from './categories';
import { handleTransactionRequest } from './transactionHandler';
import { handleBudgetRequest } from './budgets';
import { DBTable, KeyValuePair } from '../../../shared/types';
import { handleBalanceLogRequest } from './balanceLog';

export function handleDatabaseRequest(table: DBTable, requestType: string, data?: KeyValuePair, query?: KeyValuePair) {
  try {
    let result: unknown;

    if (table === DBTable.CATEGORIES) result = handleCategoryRequest(requestType, data);
    if (table === DBTable.TRANSACTIONS) result = handleTransactionRequest(requestType, data, query);
    if (table === DBTable.BUDGETS) result = handleBudgetRequest(requestType, data, query);
    if (table === DBTable.BALANCELOGS) result = handleBalanceLogRequest(requestType, data, query);

    return result;
  } catch (error) {
    console.error('Error while handling database request ', error.message);
  }
}