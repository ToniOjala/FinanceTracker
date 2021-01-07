import { handleCategoryRequest } from './categories';
import { handleTransactionRequest } from './transactions';
import { handleBudgetRequest } from './budgets';
import { DBTable, KeyValuePair } from '../../../shared/types';

export function handleDatabaseRequest(table: DBTable, requestType: string, data?: KeyValuePair, query?: KeyValuePair) {
  try {
    let result: unknown;

    if (table === DBTable.CATEGORIES) result = handleCategoryRequest(requestType, data);
    if (table === DBTable.TRANSACTIONS) result = handleTransactionRequest(requestType, data, query);
    if (table === DBTable.BUDGETS) result = handleBudgetRequest(requestType, data, query);

    return result;
  } catch (error) {
    console.error('Error while handling database request ', error.message);
  }
}