import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import TransactionDialog, { TransactionFormValues } from './TransactionDialog'
import TransactionTable from './TransactionTable'
import { Category, NewLabel, NewTransaction, Transaction } from '../../../../shared/types'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransaction, postTransaction, deleteTransaction } from '../../../slices/transactions'
import { fetchLabels, postLabel, selectLabels, updateLabel } from '../../../slices/labels'
import { format } from 'date-fns'

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
  const labels = useSelector(selectLabels);

  useEffect(() => {
    dispatch(fetchLabels(selectedCategory.id))
  }, [selectedCategory])

  function openDialog () { setIsDialogOpen(true); }
  
  function closeDialog () {
    setIsDialogOpen(false);
    setSelectedTransaction(null);
    setTimeout(() => {
      setTransactionToEdit(null);
    }, 300)
  }

  function handleLabel (labelName: string) {
    const labelToUpdate = labels.find(l => l.name === labelName);
    if (labelToUpdate) {
      dispatch(updateLabel({ ...labelToUpdate, lastUsed: format(new Date(), 'yyyy-MM-dd') }));
    }
    else {
      const newLabel: NewLabel = {
        name: labelName,
        categoryId: selectedCategory.id,
        lastUsed: format(new Date(), 'yyyy-MM-dd')
      }
      dispatch(postLabel(newLabel));
    }
  }

  function handleTransaction  (values: TransactionFormValues, closesDialog: boolean) {
    if (values.label) handleLabel(values.label);

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
        labels={labels}
        transactionToEdit={transactionToEdit}
        selectedDate={selectedDate}
        handleClose={closeDialog}
        handleTransaction={handleTransaction}
      />
    </>
  )
}

export default TransactionContainer
