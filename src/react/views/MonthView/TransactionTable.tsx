import { Button, Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction, postTransaction, updateTransaction } from '../../slices/transactions';
import { Category, NewTransaction, Transaction } from '../../../shared/types';
import TransactionDialog, { AddTransactionFormValues } from './TransactionDialog';
import { formatDate } from '../../utils/format';
import { format } from 'date-fns';
import { updateCategory } from '../../slices/categories';

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
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const dispatch = useDispatch();

  const openDialog = () => setIsDialogOpen(true);
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setTransactionToEdit(null);
    setSelectedTransaction(null);
  }

  const handleTransaction = (values: AddTransactionFormValues) => {
    if (transactionToEdit) {
      dispatch(updateTransaction({
        id: transactionToEdit.id,
        date: format(values.date, 'yyyy-MM-dd'),
        amount: Number(parseFloat(values.amount)),
        categoryId: transactionToEdit.categoryId
      }));
      closeDialog();
      return;
    }

    const newTransaction: NewTransaction = {
      date: format(values.date, 'yyyy-MM-dd'),
      amount: Number.parseFloat(values.amount),
      categoryId: selectedCategory.id
    }

    if (selectedCategory.type === 'income') {
      for (const category of categories) {
        if (values.balanceAdditions[category.name]) {
          const amount = Number(values.balanceAdditions[category.name]);
          const categoryToUpdate = { ...category };
          categoryToUpdate.balance += amount;
          dispatch(updateCategory(categoryToUpdate));
        }
      }
    }

    dispatch(postTransaction(newTransaction));
    closeDialog();
  }

  const editTransaction = () => {
    setTransactionToEdit(selectedTransaction);
    openDialog();
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
        Add
      </Button>
      <Button 
        disabled={!selectedTransaction}
        onClick={removeTransaction}
      >
        Remove
      </Button>
      <Button
        disabled={!selectedTransaction}
        onClick={editTransaction}
      >
        Edit
      </Button>
      <TransactionDialog
        isOpen={isDialogOpen}
        transactionType={selectedCategory.type}
        categories={categories}
        transactionToEdit={transactionToEdit}
        handleClose={closeDialog}
        handleTransaction={handleTransaction}
      />
    </>
  )
}

export default TransactionTable;