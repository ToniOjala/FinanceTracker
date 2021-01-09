import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, selectExpenseCategories, updateBalances } from '../../slices/categories';
import { hideDateSelection } from '../../slices/dateSelection';
import AddBalanceDialog, { CategoryBalances } from '../AddBalanceDialog';
import BalanceTable from './BalanceTable';

const useStyles = makeStyles({
  root: {
    margin: '50px 20px'
  },
  table: {
    margin: '20px 0 20px 0',
  }
});

const BalanceView = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector(selectExpenseCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(hideDateSelection());
  }, [])

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const addToBalance = (balances: CategoryBalances) => {
    for (const category in balances) {
      balances[category] = Number(balances[category]);
    }
    
    dispatch(updateBalances(balances));
    closeDialog();
  }

  return (
    <div className={classes.root}>
      <BalanceTable
        className={classes.table}
        categories={categories}
      />
      <Button onClick={openDialog}>Add to Balance</Button>
      <AddBalanceDialog
        isOpen={isDialogOpen}
        categories={categories}
        handleClose={closeDialog}
        handleAddToBalance={addToBalance}
      />
    </div>
  )
}

export default BalanceView
