import { Button, Card, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postCategory, selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { Category, Transaction } from '../../types'
import AddCategoryDialog from '../AddCategoryDialog'
import SetBudgetsDialog from '../SetBudgetsDialog'
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
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openCategoryDialog = () => setIsCategoryDialogOpen(true);
  const closeCategoryDialog = () => setIsCategoryDialogOpen(false);

  const openBudgetDialog = () => setIsBudgetDialogOpen(true);
  const closeBudgetDialog = () => setIsBudgetDialogOpen(false);

  const addNewCategory = (newCategory: Category) => {
    dispatch(postCategory(newCategory));
    closeCategoryDialog();
  }

  const setBudgets = () => {
    console.log('setting budgets');
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
      <Button onClick={openCategoryDialog}>Add Category</Button>
      <Button onClick={openBudgetDialog}>Set Budgets</Button>
      <AddCategoryDialog 
        isOpen={isCategoryDialogOpen}
        handleAddCategory={addNewCategory}
        handleClose={closeCategoryDialog}
      />
      <SetBudgetsDialog
        isOpen={isBudgetDialogOpen}
        handleClose={closeBudgetDialog}
        handleSetBudgets={setBudgets}
      />
    </Card>
  )
}

export default CategoriesCard
