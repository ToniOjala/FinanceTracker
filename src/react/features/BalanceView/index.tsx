import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, selectCategories } from '../../slices/categories';
import { hideDateSelection } from '../../slices/dateSelection';
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(hideDateSelection());
  }, [])

  return (
    <div className={classes.root}>
      <BalanceTable
        className={classes.table}
        categories={categories}
      />
    </div>
  )
}

export default BalanceView
