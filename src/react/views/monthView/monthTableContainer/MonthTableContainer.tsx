import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveBudgets } from '../../../slices/budgets'
import { Category, NewBudget, Transaction } from '../../../../shared/types'
import SetBudgetsDialog, { UnprocessedBudgets } from './SetBudgetsDialog'
import MonthTable from './MonthTable'
import { BudgetsByCategory } from '../../../types'

interface Props {
  selectCategory: (category: Category) => void;
  selectedCategory: Category;
  selectedDate: string;
  categories: Category[];
  transactions: Transaction[];
  budgets: BudgetsByCategory;
}

const MonthTableContainer = ({ selectCategory, selectedCategory, selectedDate, categories, transactions, budgets }: Props): JSX.Element => {
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);

  const dispatch = useDispatch();

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
        title="Income"
        categories={categories.filter(c => c.type === 'income')}
        selectedCategory={selectedCategory}
        transactions={transactions}
        budgets={budgets}
        selectCategory={selectCategory}
      />
      <MonthTable
        title="Expense"
        categories={categories.filter(c => c.type === 'expense')}
        selectedCategory={selectedCategory}
        transactions={transactions}
        budgets={budgets}
        selectCategory={selectCategory}
      />
      <Button onClick={openBudgetDialog}>Set Budgets</Button>
      <SetBudgetsDialog
        isOpen={isBudgetDialogOpen}
        incomeCategories={categories.filter(c => c.type === 'income')}
        expenseCategories={categories.filter(c => c.type === 'expense')}
        budgets={budgets}
        handleClose={closeDialogs}
        handleSetBudgets={setBudgets}
      />
    </>
  )
}

export default MonthTableContainer
