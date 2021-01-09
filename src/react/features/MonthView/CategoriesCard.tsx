import { Button, Card, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveBudgets } from '../../slices/budgets'
import { postCategory, selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { selectDate } from '../../slices/dateSelection'
import { Budget, Category, Transaction } from '../../../shared/types'
import AddCategoryDialog from '../AddCategoryDialog'
import SetBudgetsDialog, { UnprocessedBudgets } from '../SetBudgetsDialog'
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
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openCategoryDialog = () => setIsCategoryDialogOpen(true);
  const openBudgetDialog = () => setIsBudgetDialogOpen(true);
  
  const closeDialogs = () => {
    setIsCategoryDialogOpen(false);
    setIsBudgetDialogOpen(false);
  }

  const addNewCategory = (newCategory: Category) => {
    newCategory.balance = 0;
    dispatch(postCategory(newCategory));
    closeDialogs();
  }

  const setBudgets = (budgets: UnprocessedBudgets) => {
    const processedBudgets: Budget[] = [];
    
    for (const category in budgets) {
      const budget: Budget = {
        id: 0,
        amount: Number(budgets[category]),
        category,
        startDate: selectedDate
      }

      if(budget.amount > 0) processedBudgets.push(budget);
    }

    dispatch(saveBudgets(processedBudgets));
    closeDialogs();
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
      <Button className='addCategory' onClick={openCategoryDialog}>Add Category</Button>
      <Button onClick={openBudgetDialog}>Set Budgets</Button>
      <AddCategoryDialog 
        isOpen={isCategoryDialogOpen}
        handleClose={closeDialogs}
        handleAddCategory={addNewCategory}
      />
      <SetBudgetsDialog
        isOpen={isBudgetDialogOpen}
        handleClose={closeDialogs}
        handleSetBudgets={setBudgets}
      />
    </Card>
  )
}

export default CategoriesCard
