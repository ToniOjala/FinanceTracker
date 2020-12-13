import { Button, Card, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postCategory, selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { Category, Transaction } from '../../types'
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
  selectedCategory: Category,
  transactions: Transaction[]
}

const CategoriesCard = ({ selectCategory, selectedCategory, transactions }: CategoriesCardProps): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addNewCategory = (newCategory: Category) => {
    dispatch(postCategory(newCategory));
    closeDialog();
  }

  return (
    <Card className={classes.root}>
      <CategoryTable
        className={classes.table}
        title="Incomes"
        categories={incomeCategories}
        selectedCategory={selectedCategory}
        transactions={transactions}
        selectCategory={selectCategory}
      />
      <CategoryTable
        className={classes.table}
        title="Expenses"
        categories={expenseCategories}
        selectedCategory={selectedCategory}
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
