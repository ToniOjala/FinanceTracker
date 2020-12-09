import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categories';

const rootReducer = combineReducers({
  categories: categoryReducer  
})

const store = configureStore({ reducer: rootReducer });

export default store;