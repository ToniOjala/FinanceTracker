import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { Category } from '../../../shared/types';
import BalanceTableContainer from './BalanceTableContainer';
import BalanceLogsContainer from './BalanceLogsContainer';

const useStyles = makeStyles({
  root: {
    margin: '50px 20px'
  },
});

const BalanceView = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BalanceTableContainer
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BalanceLogsContainer
        category={selectedCategory}
      />
    </div>
  )
}

export default BalanceView
