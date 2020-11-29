import { Button, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import AddCategoryDialog from './features/AddCategoryDialog';
import { CategoryList } from './features/CategoryList';
import { useGetCategories } from './hooks/useCategories';
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
  const categories = useGetCategories();
  const incomeCategories = categories.filter(c => c.type === TransactionType.Income);
  const expenseCategories = categories.filter(c => c.type === TransactionType.Expense)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const addCategory = () => {
    setIsDialogOpen(true);
  }

  const submitNewCategory = async (values: NewCategory) => {
    try {
      const { data: newCategory } = await axios.post<Category>('http://localhost:3001/categories', values);
      categories.push(newCategory);
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

  if (categories.length === 0) return null;

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
