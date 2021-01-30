import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import TransactionDialog, { AddTransactionFormValues } from './TransactionDialog'
import TransactionTable from './TransactionTable'
import { Category, NewTransaction, Transaction } from '../../../../shared/types'
import { useDispatch } from 'react-redux'
import { updateTransaction, postTransaction, deleteTransaction } from '../../../slices/transactions'
import { format } from 'date-fns'

interface Props {
  categories: Category[];
  selectedCategory: Category;
  transactions: Transaction[];
}

const TransactionContainer = ({ categories, selectedCategory, transactions }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const dispatch = useDispatch();

  function openDialog () { setIsDialogOpen(true); }
  
  function closeDialog () {
    setIsDialogOpen(false);
    setTransactionToEdit(null);
    setSelectedTransaction(null);
  }

  function handleTransaction  (values: AddTransactionFormValues) {
    if (transactionToEdit) {
      dispatch(updateTransaction({
        id: transactionToEdit.id,
        date: format(values.date, 'yyyy-MM-dd'),
        label: values.label,
        amount: Number(parseFloat(values.amount)),
        categoryId: transactionToEdit.categoryId
      }));
      closeDialog();
      return;
    }

    const newTransaction: NewTransaction = {
      date: format(values.date, 'yyyy-MM-dd'),
      label: values.label,
      amount: Number.parseFloat(values.amount),
      categoryId: selectedCategory.id,
      type: selectedCategory.type,
    }

    if (selectedCategory.type === 'income') {
      for (const category in values.balanceAdditions) {
        newTransaction[category] = values.balanceAdditions[category];
      }
    }

    dispatch(postTransaction(newTransaction));
    closeDialog();
  }

  function editTransaction () {
    setTransactionToEdit(selectedTransaction);
    openDialog();
  }

  function removeTransaction () {
    dispatch(deleteTransaction(selectedTransaction!));
    setSelectedTransaction(null);
  }

  return (
    <>
      {selectedCategory && 
        <TransactionTable
          transactions={transactions}
          title={selectedCategory.name}
          selectedTransaction={selectedTransaction}
          selectTransaction={setSelectedTransaction}
        />
      }
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
      {selectedCategory?.type !== 'income' &&
        <Button
          disabled={!selectedTransaction}
          onClick={editTransaction}
        >
          Edit
        </Button>
      }
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

export default TransactionContainer
