import { makeStyles } from '@material-ui/core'
import React from 'react'
import { roundToDecimals } from '../../../utils/round';

const useStyles = makeStyles(theme => ({
  row: {
    padding: '10px',
    textAlign: 'center',
    fontSize: '1.3rem',
  },
  dark: {
    backgroundColor: theme.palette.background.default,
  },
  rowTitle: {
    fontWeight: 'bold',
  },
}))

interface Props {
  income: number;
  expense: number;
}

const SummaryTable = ({ income, expense }: Props) => {
  const classes = useStyles();
  
  return (
    <div>
      <div className={`${classes.row} ${classes.dark}`}>
        <div className={classes.rowTitle}>Total Income</div>
        <div>{roundToDecimals(income, 2)}</div>
      </div>
      <div className={`${classes.row}`}>
        <div className={classes.rowTitle}>Total Expense</div>
        <div>{roundToDecimals(expense, 2)}</div>
      </div>
      <div className={`${classes.row} ${classes.dark}`}>
        <div className={classes.rowTitle}>Balance</div>
        <div>{roundToDecimals(income - expense, 2)}</div>
      </div>
    </div>
  )
}

export default SummaryTable
