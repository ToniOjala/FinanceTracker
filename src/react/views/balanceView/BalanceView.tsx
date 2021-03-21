import { createStyles, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Category } from '../../../shared/types';
import BalanceTableContainer from './balanceTableContainer/BalanceTableContainer';
import BalanceLogsContainer from './balanceLogsContainer/BalanceLogsContainer';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../slices/categories';

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

  useEffect(() => {
    dispatch(setDateSelectionStatus('hidden'));
    dispatch(fetchCategories());
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
      <Grid item xs={12} md={4} xl={3}>
        <BalanceLogsContainer category={selectedCategory} />
      </Grid>
    </Grid>
  )
}

export default BalanceView
