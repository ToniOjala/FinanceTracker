import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';
import transactionReducer from './slices/transactions';
import budgetReducer from './slices/budgets';
import dateSelectionReducer from './slices/dateSelection';
import balanceLogReducer from './slices/balanceLogs';
import recurringExpenseReducer from './slices/recurringExpenses';

const rootReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer,
  budgets: budgetReducer,
  dateSelection: dateSelectionReducer,
  balanceLogs: balanceLogReducer,
  recurringExpenses: recurringExpenseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;