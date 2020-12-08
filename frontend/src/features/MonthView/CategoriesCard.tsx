import { Button, Card, makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Category, NewCategory, Transaction, TransactionType } from '../../types'
import AddCategoryDialog from '../AddCategoryDialog'
import CategoryTable from './CategoryTable'

const useStyles = makeStyles({
  root: {
    padding: '20px'
  },
  table: {
    marginBottom: '50px'
  }
})

interface CategoriesCardProps {
  categories: Category[],
  selectCategory: (category: Category) => void,
  transactions: Transaction[]
}

const CategoriesCard = ({ categories, selectCategory, transactions }: CategoriesCardProps): JSX.Element => {
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const populateCategories = async () => {
    setIncomeCategories(categories.filter(cat => cat.type === TransactionType.Income));
    setExpenseCategories(categories.filter(cat => cat.type === TransactionType.Expense));
  }

  const addCategory = () => {
    setIsDialogOpen(true);
  }

  const addNewCategory = async (values: NewCategory) => {
    try {
      const { data: newCategory } = await axios.post<Category>('http://localhost:3001/api/categories', values);
      if (newCategory.type === TransactionType.Expense) setExpenseCategories(expenseCategories.concat(newCategory));
      else setIncomeCategories(incomeCategories.concat(newCategory));
      closeDialog();
    } catch (e) {
      console.error(e.response.data);
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  }

  useEffect(() => {
    populateCategories();
  }, [categories])

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CategoryTable
        className={classes.table}
        title="Incomes"
        categories={incomeCategories}
        transactions={transactions}
        selectCategory={selectCategory}
      />
      <CategoryTable
        className={classes.table}
        title="Expenses"
        categories={expenseCategories}
        transactions={transactions}
        selectCategory={selectCategory}
      />
      <Button onClick={addCategory}>Add Category</Button>
      <AddCategoryDialog 
        isOpen={isDialogOpen}
        handleAddCategory={addNewCategory}
        handleClose={closeDialog}
      />
    </Card>
  )
}

export default CategoriesCard
