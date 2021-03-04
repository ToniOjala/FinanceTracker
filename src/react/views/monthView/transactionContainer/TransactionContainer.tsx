import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import TransactionDialog, { TransactionFormValues } from './TransactionDialog'
import TransactionTable from './TransactionTable'
import { Category, NewTransaction, Transaction } from '../../../../shared/types'
import { useDispatch } from 'react-redux'
import { updateTransaction, postTransaction, deleteTransaction } from '../../../slices/transactions'

interface Props {
  selectedDate: string;
  selectedCategory: Category;
  categories: Category[];
  transactions: Transaction[];
}

const TransactionContainer = ({selectedDate, selectedCategory, categories, transactions }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const dispatch = useDispatch();

  function openDialog () { setIsDialogOpen(true); }
  
  function closeDialog () {
    setIsDialogOpen(false);
    setSelectedTransaction(null);
    setTimeout(() => {
      setTransactionToEdit(null);
    }, 300)
  }

  function handleTransaction  (values: TransactionFormValues, closesDialog: boolean) {
    if (transactionToEdit) {
      dispatch(updateTransaction({
        id: transactionToEdit.id,
        date: values.date,
        label: values.label,
        amount: Number(parseFloat(values.amount)),
        categoryId: transactionToEdit.categoryId
      }));
      closeDialog();
      return;
    }

    const newTransaction: NewTransaction = {
      date: values.date,
      label: values.label,
      amount: Number.parseFloat(values.amount),
      categoryId: selectedCategory.id,
      type: selectedCategory.type,
    }

    if (selectedCategory.type === 'income') {
      newTransaction.balanceAdditions = values.balanceAdditions;
    }

    dispatch(postTransaction(newTransaction));
    if (closesDialog) closeDialog();
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
        New
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
        categories={categories.filter(cat => cat.type === 'expense')}
        transactionToEdit={transactionToEdit}
        selectedDate={selectedDate}
        handleClose={closeDialog}
        handleTransaction={handleTransaction}
      />
    </>
  )
}

export default TransactionContainer
