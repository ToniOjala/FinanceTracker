import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';
import transactionReducer from './slices/transactions';
import budgetReducer from './slices/budgets';
import dateSelectionReducer from './slices/dateSelection';

const rootReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer,
  budgets: budgetReducer,
  dateSelection: dateSelectionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;