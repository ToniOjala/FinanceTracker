import { Button, Card, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveBudgets } from '../../slices/budgets'
import { updateBalances as updateBalances, postCategory, selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { selectDate } from '../../slices/dateSelection'
import { Budget, Category, Transaction } from '../../../shared/types'
import AddBalanceDialog, { CategoryBalances } from '../AddBalanceDialog'
import AddCategoryDialog from '../AddCategoryDialog'
import SetBudgetsDialog, { UnprocessedBudgets } from '../SetBudgetsDialog'
import CategoryTable from './CategoryTable'
import { format } from 'date-fns'

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
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false);
  
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openCategoryDialog = () => setIsCategoryDialogOpen(true);
  const openBudgetDialog = () => setIsBudgetDialogOpen(true);
  const openBalanceDialog = () => setIsBalanceDialogOpen(true);
  
  const closeDialogs = () => {
    setIsCategoryDialogOpen(false);
    setIsBudgetDialogOpen(false);
    setIsBalanceDialogOpen(false);
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
        id: '',
        amount: Number(budgets[category]),
        category,
        startDate: format(new Date(selectedDate).setDate(1), 'yyyy-MM-dd')
      }

      if(budget.amount > 0) processedBudgets.push(budget);
    }

    dispatch(saveBudgets(processedBudgets));
    closeDialogs();
  }

  const addToBalance = (balances: CategoryBalances) => {
    for (const category in balances) {
      balances[category] = Number(balances[category]);
    }
    
    dispatch(updateBalances(balances));
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
      <Button onClick={openBalanceDialog}>Add to Balance</Button>
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
      <AddBalanceDialog
        isOpen={isBalanceDialogOpen}
        handleClose={closeDialogs}
        handleAddToBalance={addToBalance}
      />
    </Card>
  )
}

export default CategoriesCard
