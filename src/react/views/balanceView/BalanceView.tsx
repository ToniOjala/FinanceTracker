import { createStyles, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Category } from '../../../shared/types';
import BalanceTableContainer from './balanceTableContainer/BalanceTableContainer';
import BalanceLogsContainer from './balanceLogsContainer/BalanceLogsContainer';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../slices/categories';

const useStyles = makeStyles((theme) => 
  createStyles({
    root: {
      width: '100%',
      margin: '0'
    },
  })
);

const BalanceView = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(setDateSelectionStatus('hidden'));
    if (!categories || categories.length !== 0) dispatch(fetchCategories());
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      spacing={6}
      direction="row"
      justify="center"
    >
      <Grid item xs={12} md={6} xl={5}>
        <BalanceTableContainer
          selectedCategory={selectedCategory}
          selectCategory={setSelectedCategory}
        />
      </Grid>
      <Grid item xs={12} md={5} xl={3}>
        <BalanceLogsContainer category={selectedCategory} />
      </Grid>
    </Grid>
  )
}

export default BalanceView
