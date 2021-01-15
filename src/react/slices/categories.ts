import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { getCategories, saveCategory, addToBalance, updateCategoryInDB } from '../services/categoryService';
import { Category, CategoryType, NewCategory } from '../../shared/types';
import { CategoryBalances } from '../features/AddBalanceDialog';

const categorySlice = createSlice({
  name: 'category',
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    replaceCategories: (state, action) => {
      let newState: Category[] = [];
      action.payload.forEach((updatedCategory: Category) => {
        newState = state.map((category: Category) => {
          if (category.id === updatedCategory.id) return updatedCategory;
          return category;
        });
      });
      return newState;
    }
  }
})

export const { setCategories, addCategory, replaceCategories } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = (): AppThunk => async dispatch => {
  try {
    let categories = await getCategories();
    dispatch(setCategories(categories));
  } catch (error) {
    console.error('Error while fetcing categories: ', error);
  }
}

export const postCategory = (category: NewCategory): AppThunk => async dispatch => {
  try {
    const savedCategory = await saveCategory(category);
    dispatch(addCategory(savedCategory));
  } catch (error) {
    console.error('Error while posting category: ', error);
  }
}

export const updateBalances = (balances: CategoryBalances): AppThunk => async dispatch => {
  const updatedCategories: Category[] = [];
  try {
    for (const categoryId in balances) {
      const balance = balances[categoryId];
      if (balance > 0) {
        const updatedCategory = await addToBalance(Number(categoryId), balance);
        updatedCategories.push(updatedCategory);
      }
    }

    dispatch(replaceCategories(updatedCategories));
  } catch (error) {
    console.error('Error while updating balance: ', error);
  }
}

export const updateCategory = (category: Category): AppThunk => async dispatch => {
  try {
    const updatedCategory = await updateCategoryInDB(category);
    dispatch(replaceCategories([updatedCategory]));
  } catch (error) {
    console.error('Error while updating category: ', error);
  }
}

export const selectCategories = (state: RootState): Category[] => state.categories;

export const selectIncomeCategories = (state: RootState): Category[] => {
  try { return state.categories.filter(cat => cat.type === CategoryType.Income); }
  catch (_) { return [] as Category[]; }
}

export const selectExpenseCategories = (state: RootState): Category[] => {
  try { return state.categories.filter(cat => cat.type === CategoryType.Expense); }
  catch (_) { return [] as Category[]; }
}