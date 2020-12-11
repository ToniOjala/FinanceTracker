import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';
import transactionReducer from './slices/transactions';

const rootReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;