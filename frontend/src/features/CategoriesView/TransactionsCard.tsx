import { Button, Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getTransactionsByDateAndCategory } from '../../services/transactionService';
import { Category, NewTransaction, Transaction, YearMonth } from '../../types';
import AddTransactionDialog, { PartialNewTransaction } from '../AddTransactionDialog';
import { formatDate } from './utils';

const useStyles = makeStyles({
  root: {
    padding: '20px'
  },
  table: {
    marginTop: '25px',
    marginBottom: '25px'
  }
})

interface Props {
  category: Category,
  yearMonth: YearMonth
}

const TransactionsCard = ({ category, yearMonth }: Props): JSX.Element | null => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const populateTransactions = async () => {
    const trans = await getTransactionsByDateAndCategory(yearMonth, category.name);
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
  }, [category, yearMonth])

  const classes = useStyles();

  if (!category) return null;

  return (
    <Card className={classes.root}>
      <Typography variant="h6">{category.name}</Typography>
      <TableContainer className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <TableRow key={transaction.date}>
                <TableCell component="th" scope="row">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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