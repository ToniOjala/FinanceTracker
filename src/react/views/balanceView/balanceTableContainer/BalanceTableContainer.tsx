import { Button, makeStyles, Theme } from '@material-ui/core'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../shared/types'
import { saveBalanceLog } from '../../../slices/balanceLogs'
import { selectExpenseCategories, updateCategory } from '../../../slices/categories'
import AddBalanceDialog from './AddBalanceDialog'
import BalanceTable from './BalanceTable'
interface Props {
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void;
}

const BalanceTableContainer = ({ selectedCategory, selectCategory }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectExpenseCategories);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addToBalance = (values: { amount: number }) => {
    if (!selectedCategory) return;
    const categoryToUpdate = { ...selectedCategory }
    categoryToUpdate.balance += Number(values.amount);
    dispatch(updateCategory(categoryToUpdate));
    dispatch(saveBalanceLog({
      categoryId: selectedCategory.id,
      amount: Number(values.amount),
      date: format(new Date(), 'yyyy-MM-dd'),
    }));
    closeDialog();
  }

  return (
    <div>
      <BalanceTable
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={selectCategory}
      />
      <Button
        disabled={!selectedCategory}
        onClick={openDialog}
      >
        Add Balance
      </Button>
      <AddBalanceDialog
        isOpen={isDialogOpen}
        categoryName={selectedCategory?.name}
        handleClose={closeDialog}
        handleAddToBalance={addToBalance}
      />
    </div>
  )
}

export default BalanceTableContainer
