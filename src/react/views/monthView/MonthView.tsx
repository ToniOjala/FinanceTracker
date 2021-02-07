import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Category, Transaction } from '../../../shared/types';
import MonthTableContainer from './monthTableContainer/MonthTableContainer';
import { fetchCategories, selectCategories } from '../../slices/categories';
import { fetchTransactionsOfMonth, selectTransactions } from '../../slices/transactions';
import { selectDate, selectYearAndMonth, setDateSelectionStatus } from '../../slices/dateSelection';
import { fetchLatestBudgets, selectBudgets } from '../../slices/budgets';
import TransactionContainer from './transactionContainer/TransactionContainer';

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
  const categories = useSelector(selectCategories);
  const budgets = useSelector(selectBudgets)
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
        <MonthTableContainer
          selectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          categories={categories}
          transactions={transactions}
          budgets={budgets}
        />
      </Box>
      <Box className={classes.transactions}>
        <TransactionContainer
          categories={categories}
          selectedCategory={selectedCategory}
          transactions={transactionsOfCategory}
        />
      </Box>
    </Box>
  )
}

export default MonthView