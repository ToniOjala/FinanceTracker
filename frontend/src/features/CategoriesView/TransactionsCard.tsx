import { Card, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getTransactionsByCategory } from '../../services/transactionService';
import { Transaction } from '../../types';

const useStyles = makeStyles({
  root: {
    padding: '20px'
  }
})

interface TransactionsCardProps {
  category: string
}

const TransactionsCard = ({ category }: TransactionsCardProps): JSX.Element | null => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const populateTransactions = async () => {
    const trans = await getTransactionsByCategory(category);
    setTransactions(trans);
  }

  useEffect(() => {
    if (category) populateTransactions();
  }, [category])

  if (!category) return null;

  return (
    <Card className={classes.root}>
      <Typography variant="h6">{category}</Typography>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.date}>{transaction.date} - {transaction.amount}</li>
        ))}
      </ul>
    </Card>
  )
}

export default TransactionsCard;