import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Category, Transaction } from '../../../shared/types';
import MonthTableContainer from './monthTableContainer/MonthTableContainer';
import { fetchCategories, selectCategories } from '../../slices/categories';
import { fetchTransactionsOfMonth, selectTransactions } from '../../slices/transactions';
import { selectDate, selectYearAndMonth, setDateSelectionStatus } from '../../slices/dateSelection';
import { fetchLatestBudgets, selectBudgets } from '../../slices/budgets';
import TransactionContainer from './transactionContainer/TransactionContainer';
import { fetchNotifications, selectNotifications } from '../../slices/notifications';

const MonthView = (): JSX.Element | null => {
  const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);
  const [transactionsOfCategory, setTransactionsOfCategory] = useState<Transaction[]>([]);
  
  const dispatch = useDispatch();
  
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);
  const budgets = useSelector(selectBudgets)
  const [year, month] = useSelector(selectYearAndMonth);
  const selectedDate = useSelector(selectDate);
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    dispatch(setDateSelectionStatus('month'));
    if (!categories || categories.length === 0) dispatch(fetchCategories());
    if (!notifications || notifications.length === 0) dispatch(fetchNotifications());
  }, [])

  useEffect(() => {
    dispatch(fetchTransactionsOfMonth(year, month));
    dispatch(fetchLatestBudgets(selectedDate));
  }, [selectedDate])

  useEffect(() => {
    setTransactionsOfCategory(transactions?.filter(tr => tr.categoryId === selectedCategory?.id));
  }, [selectedCategory, transactions])

  return (
    <Grid container spacing={6} justify="center" style={{ width: '100%', margin: 0 }}>
      <Grid item xs={12} md={6} xl={5}>
        <MonthTableContainer
          selectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          categories={categories}
          transactions={transactions}
          budgets={budgets}
        />
      </Grid>
      <Grid item xs={12} md={4} xl={3}>
        <TransactionContainer
          selectedDate={selectedDate}
          selectedCategory={selectedCategory}
          categories={categories}
          transactions={transactionsOfCategory}
        />
      </Grid>
    </Grid>
  )
}

export default MonthView