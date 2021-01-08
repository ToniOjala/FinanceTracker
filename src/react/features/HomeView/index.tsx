import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories } from '../../slices/categories';
import { hideDateSelection } from '../../slices/dateSelection';
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(hideDateSelection());
  }, [])

  const openDialog = () => {
    console.log('opening dialog');
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
        onClick={() => openDialog()}
      >
        Add Income
      </Button>
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        onClick={() => openDialog()}
      >
        Add Expense
      </Button>
    </div>
  )
}

export default HomeView
