import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getTransactionsByCategory } from '../../services/transactionService';
import { Category, NewTransaction, Transaction } from '../../types';
import AddTransactionDialog from '../AddTransactionDialog';

const useStyles = makeStyles({
  root: {
    padding: '20px'
  }
})

interface TransactionsCardProps {
  category: Category
}

const TransactionsCard = ({ category }: TransactionsCardProps): JSX.Element | null => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const populateTransactions = async () => {
    const trans = await getTransactionsByCategory(category.name);
    setTransactions(trans);
  }

  const addTransaction = () => {
    setIsDialogOpen(true);
  }

  const submitNewTransaction = async (values: NewTransaction) => {
    try {
      const { data: newTransaction } = await axios.post<Transaction>('http://localhost:3001/api/transactions', values);
      setTransactions(transactions.concat(newTransaction));
      closeDialog();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
    setError('');
  }

  useEffect(() => {
    if (category) populateTransactions();
  }, [category])

  const classes = useStyles();

  if (!category) return null;

  return (
    <Card className={classes.root}>
      <Typography variant="h6">{category.name}</Typography>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.date}>{transaction.date} - {transaction.amount}</li>
        ))}
      </ul>
      <Button onClick={addTransaction}>Add transaction</Button>
      <AddTransactionDialog
        categoryName={category.name}
        type={category.type}
        dialogOpen={isDialogOpen}
        onSubmit={submitNewTransaction}
        onClose={closeDialog}
        error={error}
      />
    </Card>
  )
}

export default TransactionsCard;