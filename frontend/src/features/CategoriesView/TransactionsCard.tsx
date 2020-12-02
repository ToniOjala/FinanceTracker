import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getTransactionsByCategory } from '../../services/transactionService';
import { Category, NewTransaction, Transaction } from '../../types';
import AddTransactionDialog, { PartialNewTransaction } from '../AddTransactionDialog';

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

  const populateTransactions = async () => {
    const trans = await getTransactionsByCategory(category.name);
    setTransactions(trans);
  }

  const addTransaction = () => {
    setIsDialogOpen(true);
  }

  const addNewTransaction = async (values: PartialNewTransaction) => {
    const newTransaction: NewTransaction = {
      date: values.date,
      amount: Number.parseFloat(values.amount),
      type: category.type,
      category: category.name
    }

    try {
      const { data: addedTransaction } = await axios.post<Transaction>('http://localhost:3001/api/transactions', newTransaction);
      setTransactions(transactions.concat(addedTransaction));
      closeDialog();
    } catch (e) {
      console.error(e.response.data);
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
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
        isOpen={isDialogOpen}
        handleClose={closeDialog}
        handleAddTransaction={addNewTransaction}
      />
    </Card>
  )
}

export default TransactionsCard;