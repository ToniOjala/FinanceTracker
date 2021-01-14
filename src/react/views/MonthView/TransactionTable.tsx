import { Button, Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction, postTransaction } from '../../slices/transactions';
import { Category, KeyNumberPairs, NewTransaction, Transaction } from '../../../shared/types';
import AddTransactionDialog, { AddTransactionFormValues } from '../../features/AddTransactionDialog';
import { formatDate } from './utils';
import { format } from 'date-fns';
import { updateBalances } from '../../slices/categories';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    marginBottom: '20px',
  },
  table: {
    marginTop: '20px',
    marginBottom: '20px'
  }
})

interface Props {
  selectedCategory: Category;
  categories: Category[];
  transactions: Transaction[];
}

const TransactionTable = ({ selectedCategory, categories, transactions }: Props): JSX.Element | null => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  const dispatch = useDispatch();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleNewTransaction = (values: AddTransactionFormValues) => {
    const newTransaction: NewTransaction = {
      date: format(values.date, 'yyyy-MM-dd'),
      amount: Number.parseFloat(values.amount),
      categoryId: selectedCategory.id
    }

    const balancesToAdd = {} as KeyNumberPairs;
    for (const category of categories) {
      if (values.balanceAdditions[category.name]) {
        balancesToAdd[category.id] = Number(values.balanceAdditions[category.name]);
      }
    }

    dispatch(postTransaction(newTransaction));
    dispatch(updateBalances(balancesToAdd));
    closeDialog();
  }

  const removeTransaction = () => {
    dispatch(deleteTransaction(selectedTransaction!));
    setSelectedTransaction(null);
  }

  const classes = useStyles();

  return (
    <>
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
                <TableRow
                  key={transaction.id}
                  hover
                  selected={transaction === selectedTransaction}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Button
        disabled={!selectedCategory.name}
        onClick={openDialog}
      >
        Add transaction
      </Button>
      {selectedTransaction && 
        <Button onClick={removeTransaction}>
          Remove
        </Button>
      }
      <AddTransactionDialog
        isOpen={isDialogOpen}
        transactionType={selectedCategory.type}
        categories={categories}
        handleClose={closeDialog}
        handleAddTransaction={handleNewTransaction}
      />
    </>
  )
}

export default TransactionTable;