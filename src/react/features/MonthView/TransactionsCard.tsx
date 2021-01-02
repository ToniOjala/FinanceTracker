import { Button, Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTransaction } from '../../slices/transactions';
import { Category, Transaction } from '../../../shared/types';
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
}

const TransactionsCard = ({ category, transactions }: Props): JSX.Element | null => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const dispatch = useDispatch();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleNewTransaction = async (values: PartialNewTransaction) => {
    const newTransaction: Transaction = {
      id: '',
      date: values.date,
      amount: Number.parseFloat(values.amount),
      category: category.name
    }

    dispatch(postTransaction(newTransaction));
    closeDialog();
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
              <TableRow key={transaction.id}>
                <TableCell component="th" scope="row">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={openDialog}>Add transaction</Button>
      <AddTransactionDialog
        isOpen={isDialogOpen}
        handleClose={closeDialog}
        handleAddTransaction={handleNewTransaction}
      />
    </Card>
  )
}

export default TransactionsCard;