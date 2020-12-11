import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';
import transactionReducer from './slices/transactions';
import dateSelectionReducer from './slices/dateSelection';

const rootReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer,
  dateSelection: dateSelectionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;