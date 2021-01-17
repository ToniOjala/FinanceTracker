import { Button, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../shared/types'
import { addBalanceLog } from '../../../slices/balanceLogs'
import { fetchCategories, selectExpenseCategories, updateCategory } from '../../../slices/categories'
import { setDateSelectionStatus } from '../../../slices/dateSelection'
import AddBalanceDialog from './AddBalanceDialog'
import BalanceTable from './BalanceTable'

interface Props {
  classes: Record<'tableContainer' | 'title' | 'table', string>
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
}

const BalanceTableContainer = ({ classes, selectedCategory, setSelectedCategory }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectExpenseCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(setDateSelectionStatus('hidden'));
  }, [])

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addToBalance = (values: { amount: number }) => {
    if (!selectedCategory) return;
    const categoryToUpdate = { ...selectedCategory }
    categoryToUpdate.balance += Number(values.amount);
    dispatch(updateCategory(categoryToUpdate));
    dispatch(addBalanceLog({
      categoryId: selectedCategory.id,
      amount: Number(values.amount),
      date: format(new Date(), 'yyyy-MM-dd'),
      type: 'manual',
      reason: Number(values.amount) < 0 ? 'remove' : 'add'
    }));
    closeDialog();
  }

  return (
    <div className={classes.tableContainer}>
      <Typography variant="h6" className={classes.title}>Balances</Typography>
      <BalanceTable
        className={classes.table}
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={setSelectedCategory}
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
