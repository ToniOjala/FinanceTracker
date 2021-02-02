import { Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveBudgets, selectBudgets } from '../../slices/budgets'
import { selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { selectDate } from '../../slices/dateSelection'
import { Category, NewBudget, Transaction } from '../../../shared/types'
import SetBudgetsDialog, { UnprocessedBudgets } from './SetBudgetsDialog'
import MonthTable from './MonthTable'

const useStyles = makeStyles({
  table: {
    padding: '20px',
    marginBottom: '20px'
  }
})

interface CategoriesCardProps {
  selectCategory: (category: Category) => void,
  selectedCategory: Category,
  transactions: Transaction[]
}

const MonthTablesContainer = ({ selectCategory, selectedCategory, transactions }: CategoriesCardProps): JSX.Element => {
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const budgets = useSelector(selectBudgets)

  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openBudgetDialog = () => setIsBudgetDialogOpen(true);
  
  const closeDialogs = () => {
    setIsBudgetDialogOpen(false);
  }

  const setBudgets = (budgets: UnprocessedBudgets) => {
    const processedBudgets: NewBudget[] = [];

    for (const categoryId in budgets) {
      const budget: NewBudget = {
        amount: Number(budgets[categoryId]),
        startDate: selectedDate,
        categoryId: Number(categoryId),
      }

      if(budget.amount > 0) processedBudgets.push(budget);
    }

    dispatch(saveBudgets(processedBudgets));
    closeDialogs();
  }

  return (
    <>
      <MonthTable
        className={classes.table}
        title="Incomes"
        categories={incomeCategories}
        selectedCategory={selectedCategory}
        transactions={transactions}
        budgets={budgets}
        selectCategory={selectCategory}
      />
      <MonthTable
        className={classes.table}
        title="Expenses"
        categories={expenseCategories}
        selectedCategory={selectedCategory}
        transactions={transactions}
        budgets={budgets}
        selectCategory={selectCategory}
      />
      <Button onClick={openBudgetDialog}>Set Budgets</Button>
      <SetBudgetsDialog
        isOpen={isBudgetDialogOpen}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
        budgets={budgets}
        handleClose={closeDialogs}
        handleSetBudgets={setBudgets}
      />
    </>
  )
}

export default MonthTablesContainer
