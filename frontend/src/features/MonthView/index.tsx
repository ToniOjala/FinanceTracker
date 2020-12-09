import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsByDate } from '../../services/transactionService';
import { RootState } from '../../rootReducer';
import { Category, Transaction, YearMonth } from '../../types';
import CategoriesCard from './CategoriesCard';
import TransactionsCard from './TransactionsCard'
import { fetchCategories } from '../../slices/categories';

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsOfCategory, setTransactionsOfCategory] = useState<Transaction[]>([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  const fetchEverything = async () => {
    try {
      await Promise.all([
        populateTransactions(),
        populateCategories()
      ])
    } catch (error) {
      console.error(error);
    }
  }

  const populateTransactions = async () => {
    const trans = await getTransactionsByDate(yearMonth);
    setTransactions(trans);
  }

  const populateCategories = async () => {
    dispatch(fetchCategories);
  }

  const addNewTransaction = (transaction: Transaction) => {
    setTransactions(transactions.concat(transaction));
  }

  useEffect(() => {
    fetchEverything();
  }, [yearMonth, dispatch])

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