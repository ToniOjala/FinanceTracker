import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Category, Transaction } from '../../types';
import CategoriesCard from './CategoriesCard';
import TransactionsCard from './TransactionsCard'
import { fetchCategories } from '../../slices/categories';
import { addTransaction, fetchTransactionsOfMonth } from '../../slices/transactions';

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
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [transactionsOfCategory, setTransactionsOfCategory] = useState<Transaction[]>([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions);
  const yearMonth = useSelector((state: RootState) => state.dateSelection.yearMonth)

  const addNewTransaction = (transaction: Transaction) => {
    dispatch(addTransaction(transaction));
  }

  useEffect(() => {
    dispatch(fetchTransactionsOfMonth(yearMonth));
  }, [yearMonth])

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  useEffect(() => {
    setTransactionsOfCategory(transactions.filter(tr => tr.category === selectedCategory?.name));
  }, [selectedCategory, transactions])

  return (
    <Box display="flex">
      <Box className={classes.categories}>
        <CategoriesCard
          selectCategory={setSelectedCategory}
          transactions={transactions}
        />
      </Box>
      <Box className={classes.transactions}>
        {selectedCategory && 
          <TransactionsCard 
            category={selectedCategory}
            transactions={transactionsOfCategory}
            addNewTransaction={addNewTransaction}
          />}
      </Box>
    </Box>
  )
}

export default MonthView