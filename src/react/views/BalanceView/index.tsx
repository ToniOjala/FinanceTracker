import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../shared/types';
import { fetchCategories, selectExpenseCategories, updateCategory } from '../../slices/categories';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import AddBalanceDialog from './AddBalanceDialog';
import BalanceTable from './BalanceTable';

const useStyles = makeStyles({
  root: {
    margin: '50px 20px'
  },
  table: {
    padding: '10px',
    margin: '20px 0 20px 0',
  }
});

const BalanceView = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const dispatch = useDispatch();
  const classes = useStyles();
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
    closeDialog();
  }

  return (
    <div className={classes.root}>
      <BalanceTable
        className={classes.table}
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={setSelectedCategory}
      />
      <Button onClick={openDialog}>Add Balance</Button>
      <AddBalanceDialog
        isOpen={isDialogOpen}
        categoryName={selectedCategory?.name}
        handleClose={closeDialog}
        handleAddToBalance={addToBalance}
      />
    </div>
  )
}

export default BalanceView
