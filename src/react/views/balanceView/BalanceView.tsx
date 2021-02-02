import { Box, createStyles, makeStyles } from '@material-ui/core';
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
      margin: '20px'
    },
    tableContainer: {
      width: '50%',
      marginRight: '20px',
    },
    logsContainer: {
      width: '50%',
    },
    title: {
      margin: theme.spacing(0, 0, 2),
    },
    table: {
      padding: '10px',
      margin: theme.spacing(0, 0, 2),
    },
    list: {
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(0, 0, 2),
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
    <Box 
      className={classes.root}
      display="flex"
      justifyContent="space-between"
    >
      <BalanceTableContainer
        classes={classes}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BalanceLogsContainer
        classes={classes}
        category={selectedCategory}
      />
    </Box>
  )
}

export default BalanceView