import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { AddIcon } from '../../components/icons'
import RecurringTransactionCard from './RecurringTransactionCard'

const useStyles = makeStyles({
  container: {
    paddingTop: '24px',
  },
  title: {
    marginBottom: '24px',
  }
})

export interface RecurringTransaction {
  title: string;
  amount: number;
  recurs: 'monthly' | 'yearly';
  day: number;
  month?: number;
  notifyDaysBefore: number;
}

const monthlyRecurringTransactions: RecurringTransaction[] = [
  {
    title: 'Netflix',
    amount: 12.99,
    recurs: 'monthly',
    day: 1,
    notifyDaysBefore: 5
  },
  {
    title: 'Spotify',
    amount: 8.49,
    recurs: 'monthly',
    day: 15,
    notifyDaysBefore: 1,
  },
]

const yearlyRecurringTransactions: RecurringTransaction[] = [
  {
    title: 'Notion',
    amount: 49.99,
    recurs: 'yearly',
    day: 1,
    month: 6,
    notifyDaysBefore: 35,
  }
]

const RecurringView = () => {
  const classes = useStyles();

  return (
    <Grid container style={{ paddingTop: '24px' }} justify="space-around">
      <Grid container direction="column" xs={5}>
        <Grid className={classes.title} container alignItems="center">
          <Typography variant="h6">Monthly Recurring</Typography>
          <IconButton style={{ marginLeft: '10px' }}color="primary"><AddIcon /></IconButton>
        </Grid>
        {monthlyRecurringTransactions.map(tr => (
          <RecurringTransactionCard transaction={tr} />
        ))}
      </Grid>
      <Grid container direction="column" xs={5}>
        <Grid className={classes.title} container alignItems="center">
          <Typography variant="h6">Yearly Recurring</Typography>
          <IconButton style={{ marginLeft: '10px' }}color="primary"><AddIcon /></IconButton>
        </Grid>
        {yearlyRecurringTransactions.map(tr => (
          <RecurringTransactionCard transaction={tr} />
        ))}
      </Grid>
    </Grid>
  )
}

export default RecurringView
