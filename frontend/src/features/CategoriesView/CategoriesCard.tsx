import { Button, Card, makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/categoryService'
import { Category, NewCategory, TransactionType } from '../../types'
import AddCategoryDialog from '../AddCategoryDialog'
import CategoryTable from './CategoryTable'

const useStyles = makeStyles({
  root: {
    padding: '20px'
  }
})

interface CategoriesCardProps {
  selectCategory: (category: Category) => void
}

const CategoriesCard = ({ selectCategory }: CategoriesCardProps): JSX.Element => {
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const populateCategories = async () => {
    const categories = await getCategories();
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
  }, [])

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CategoryTable
        title="Incomes"
        categories={incomeCategories}
        selectCategory={selectCategory}
      />
      <CategoryTable
        title="Expenses"
        categories={expenseCategories}
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
