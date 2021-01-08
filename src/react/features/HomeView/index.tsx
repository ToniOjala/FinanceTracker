import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Transaction } from '../../../shared/types';
import { fetchCategories, selectCategories, selectIncomeCategories } from '../../slices/categories';
import { hideDateSelection } from '../../slices/dateSelection';
import AddIncomeDialog from '../AddIncomeDialog';
import BalanceTable from './BalanceTable';

const useStyles = makeStyles({
  root: {
    margin: '50px 20px'
  },
  button: {
    margin: '20px 20px 0 0',
  },
  table: {
    margin: '20px 0 20px 0',
  }
});

const HomeView = (): JSX.Element => {
  const [isAddIncomeDialogOpen, setIsAddIncomeDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector(selectCategories);
  const incomeCategories = useSelector(selectIncomeCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(hideDateSelection());
  }, [])

  const openDialog = (type: string) => {
    type === 'income' ? setIsAddIncomeDialogOpen(true) : null;
  }

  const closeDialog = () => {
    setIsAddIncomeDialogOpen(false);
  }

  const addIncome = (income: Transaction) => {
    console.log(income);
  }

  return (
    <div className={classes.root}>
      <BalanceTable
        className={classes.table}
        categories={categories}
      />
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        onClick={() => openDialog('income')}
      >
        Add Income
      </Button>
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        onClick={() => openDialog('expense')}
      >
        Add Expense
      </Button>

      <AddIncomeDialog
        isOpen={isAddIncomeDialogOpen}
        categories={incomeCategories}
        handleClose={closeDialog}
        handleAddIncome={addIncome}
      />
    </div>
  )
}

export default HomeView
