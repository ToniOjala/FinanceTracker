import { Button, Card, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../slices/categories'
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

  const dispatch = useDispatch();

  const populateCategories = async () => {
    setIncomeCategories(categories.filter(cat => cat.type === TransactionType.Income));
    setExpenseCategories(categories.filter(cat => cat.type === TransactionType.Expense));
  }

  const openDialog = () => {
    setIsDialogOpen(true);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  }

  const addNewCategory = (newCategory: NewCategory) => {
      dispatch(addCategory(newCategory));
      closeDialog();
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
      <Button onClick={openDialog}>Add Category</Button>
      <AddCategoryDialog 
        isOpen={isDialogOpen}
        handleAddCategory={addNewCategory}
        handleClose={closeDialog}
      />
    </Card>
  )
}

export default CategoriesCard
