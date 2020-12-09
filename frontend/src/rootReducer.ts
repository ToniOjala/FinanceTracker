import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './slices/categories';

const rootReducer = combineReducers({
  categories: categoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;