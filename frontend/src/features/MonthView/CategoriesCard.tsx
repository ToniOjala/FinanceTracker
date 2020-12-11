import { Button, Card, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { Category, NewCategory, Transaction } from '../../types'
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
  selectCategory: (category: Category) => void,
  transactions: Transaction[]
}

const CategoriesCard = ({ selectCategory, transactions }: CategoriesCardProps): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addNewCategory = (newCategory: NewCategory) => {
    dispatch(addCategory(newCategory));
    closeDialog();
  }

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
