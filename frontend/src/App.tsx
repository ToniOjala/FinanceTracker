import { Button, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddCategoryDialog from './features/AddCategoryDialog';
import { CategoryList } from './features/CategoryList';
import { getCategories } from './services/categoryService';
import { Category, NewCategory, TransactionType } from './types';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#CBD0C9',
      main: '#69927B',
    },
    background: {
      paper: '#424242',
      default: '#303030'
    }
  }
})

const App = (): JSX.Element | null => {
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const populateCategories = async () => {
    const categories = await getCategories();
    setIncomeCategories(categories.filter(cat => cat.type === TransactionType.Income));
    setExpenseCategories(categories.filter(cat => cat.type === TransactionType.Expense));
  }

  useEffect(() => {
    populateCategories();
  }, [])

  const addCategory = () => {
    setIsDialogOpen(true);
  }

  const submitNewCategory = async (values: NewCategory) => {
    console.log('here')
    try {
      const { data: newCategory } = await axios.post<Category>('http://localhost:3001/api/categories', values);
      if (newCategory.type === TransactionType.Expense) setExpenseCategories(expenseCategories.concat(newCategory));
      else setIncomeCategories(incomeCategories.concat(newCategory));
      closeDialog();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
    setError('');
  }

  if (incomeCategories.length === 0 && expenseCategories.length === 0) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h2>Incomes</h2>
        <CategoryList categories={incomeCategories} />
        <h2>Expenses</h2>
        <CategoryList categories={expenseCategories} />
        <Button onClick={addCategory}>Add Category</Button>
        <AddCategoryDialog 
          dialogOpen={isDialogOpen}
          onSubmit={submitNewCategory}
          onClose={closeDialog}
          error={error}
        />
      </ThemeProvider>
    </>
  )
}

export default App;
