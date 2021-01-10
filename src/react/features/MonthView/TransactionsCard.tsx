import { Button, Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTransaction } from '../../slices/transactions';
import { Category, NewTransaction, Transaction } from '../../../shared/types';
import AddTransactionDialog, { PartialNewTransaction } from '../AddTransactionDialog';
import { formatDate } from './utils';
import { format } from 'date-fns';

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
  selectedCategory: Category;
  categories: Category[];
  transactions: Transaction[];
}

const TransactionsCard = ({ selectedCategory, categories, transactions }: Props): JSX.Element | null => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const dispatch = useDispatch();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleNewTransaction = async (values: PartialNewTransaction) => {
    const newTransaction: NewTransaction = {
      date: format(values.date, 'yyyy-MM-dd'),
      amount: Number.parseFloat(values.amount),
      categoryId: selectedCategory.id
    }

    dispatch(postTransaction(newTransaction));
    closeDialog();
  }

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h6">{selectedCategory.name}</Typography>
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
      <Button
        disabled={!selectedCategory.name}
        onClick={openDialog}
      >
        Add transaction
      </Button>
      <AddTransactionDialog
        isOpen={isDialogOpen}
        categories={categories}
        handleClose={closeDialog}
        handleAddTransaction={handleNewTransaction}
      />
    </Card>
  )
}

export default TransactionsCard;