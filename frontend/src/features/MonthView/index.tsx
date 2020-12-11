import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { Category, Transaction, YearMonth } from '../../types';
import CategoriesCard from './CategoriesCard';
import TransactionsCard from './TransactionsCard'
import { fetchCategories } from '../../slices/categories';
import { addTransaction, fetchTransactionsByDate } from '../../slices/transactions';

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

interface Props {
  yearMonth: YearMonth
}

const MonthView = ({ yearMonth }: Props): JSX.Element | null => {
  // const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [transactionsOfCategory, setTransactionsOfCategory] = useState<Transaction[]>([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const transactions = useSelector((state: RootState) => state.transactions);

  const addNewTransaction = (transaction: Transaction) => {
    dispatch(addTransaction(transaction));
  }

  useEffect(() => {
    dispatch(fetchTransactionsByDate(yearMonth));
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
          categories={categories}
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