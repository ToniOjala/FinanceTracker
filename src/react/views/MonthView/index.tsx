import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Category, Transaction } from '../../../shared/types';
import CategoryTableContainer from './CategoryTableContainer';
import TransactionTable from './TransactionTable'
import { fetchCategories, selectExpenseCategories } from '../../slices/categories';
import { fetchTransactionsOfMonth, selectTransactions } from '../../slices/transactions';
import { selectDate, selectYearAndMonth, setDateSelectionStatus } from '../../slices/dateSelection';
import { fetchLatestBudgets } from '../../slices/budgets';

const useStyles = makeStyles({
  categories: {
    width: '70%',
    margin: '20px'
  },
  transactions: {
    width: '30%',
    margin: '20px 20px 20px 0'
  }
})

const MonthView = (): JSX.Element | null => {
  const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);
  const [transactionsOfCategory, setTransactionsOfCategory] = useState<Transaction[]>([]);
  
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const transactions = useSelector(selectTransactions);
  const expenseCategories = useSelector(selectExpenseCategories);
  const [year, month] = useSelector(selectYearAndMonth);
  const selectedDate = useSelector(selectDate);

  useEffect(() => {
    dispatch(setDateSelectionStatus('month'));
    dispatch(fetchCategories());
  }, [])

  useEffect(() => {
    dispatch(fetchTransactionsOfMonth(year, month));
    dispatch(fetchLatestBudgets(selectedDate));
  }, [selectedDate])

  useEffect(() => {
    setTransactionsOfCategory(transactions?.filter(tr => tr.categoryId === selectedCategory?.id));
  }, [selectedCategory, transactions])

  return (
    <Box display="flex">
      <Box className={classes.categories}>
        <CategoryTableContainer
          selectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          transactions={transactions}
        />
      </Box>
      <Box className={classes.transactions}>
        {selectedCategory && 
          <TransactionTable 
            selectedCategory={selectedCategory}
            categories={expenseCategories}
            transactions={transactionsOfCategory}
          />
        }
      </Box>
    </Box>
  )
}

export default MonthView