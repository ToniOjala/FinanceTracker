import { Button, Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Category, NewTransaction, Transaction } from '../../types';
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
  category: Category;
  transactions: Transaction[];
  addNewTransaction: (transaction: Transaction) => void;
}

const TransactionsCard = ({ category, transactions, addNewTransaction }: Props): JSX.Element | null => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const addTransaction = () => {
    setIsDialogOpen(true);
  }

  const handleNewTransaction = async (values: PartialNewTransaction) => {
    const newTransaction: NewTransaction = {
      date: values.date,
      amount: Number.parseFloat(values.amount),
      type: category.type,
      category: category.name
    }

    try {
      const { data: addedTransaction } = await axios.post<Transaction>('http://localhost:3001/api/transactions', newTransaction);
      addNewTransaction(addedTransaction);
      closeDialog();
    } catch (e) {
      console.error(e.response.data);
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  }

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
        handleAddTransaction={handleNewTransaction}
      />
    </Card>
  )
}

export default TransactionsCard;