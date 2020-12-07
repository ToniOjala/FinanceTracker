import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../../services/categoryService';
import { getTransactionsByDate } from '../../services/transactionService';
import { Category, Transaction, YearMonth } from '../../types';
import CategoriesCard from './CategoriesCard';
import TransactionsCard from './TransactionsCard'

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

const CategoriesView = ({ yearMonth }: Props): JSX.Element | null => {
  const classes = useStyles();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsOfCategory, setTransactionsOfCategory] = useState<Transaction[]>([]);

  const populateTransactions = async () => {
    const trans = await getTransactionsByDate(yearMonth);
    setTransactions(trans);
  }

  const populateCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  }

  const addNewTransaction = (transaction: Transaction) => {
    setTransactions(transactions.concat(transaction));
  }

  useEffect(() => {
    populateTransactions();
    populateCategories();
  }, [yearMonth])

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

export default CategoriesView
