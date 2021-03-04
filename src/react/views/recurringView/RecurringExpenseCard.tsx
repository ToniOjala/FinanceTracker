import { Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { RecurringExpense } from '../../../shared/types'
import { AlarmIcon, DeleteIcon, EditIcon } from '../../components/icons'

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: '300px',
    maxWidth: '640px',
    height: '100px',
    padding: '16px',
    marginBottom: '20px',
    ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
      height: '120px'
    },
    ['@media (min-width:1162px)']: { // eslint-disable-line no-useless-computed-key
      height: '100px'
    }
  },
  editButton: {
    color: theme.palette.text.secondary,
  },
  alarm: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  alarmText: {
    marginLeft: '5px',
  }
}))

interface Props {
  expense: RecurringExpense;
  editExpense: (expense: RecurringExpense) => void;
  removeExpense: (expense: RecurringExpense) => void;
}

const RecurringExpenseCard = ({ expense, editExpense, removeExpense }: Props) => {
  const classes = useStyles();
  
  return (
    <Paper key={expense.name} className={classes.paper} elevation={6}>
      <Grid container direction="row">
        <Grid item container xs={3} md={4} direction="column" justify="space-between">
          <Typography variant="h5">{expense.name}</Typography>
          <div className={classes.alarm}>
            <AlarmIcon />
            <Typography className={classes.alarmText} variant="caption">{expense.notifyDaysBefore}</Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={5} container direction="column" justify="space-around">
          <Typography variant="body1">{expense.amount} {expense.recurs}</Typography>
          { expense.recurs === 'monthly' && <Typography variant="body1">Occurs on {expense.day}. of each month</Typography>}
          { expense.recurs === 'yearly' && <Typography variant="body1">Occurs on {expense.day}.{expense.month}. of each year</Typography>}
        </Grid>
        <Grid item xs={3} container justify="flex-end">
          <IconButton
            className={classes.editButton}
            onClick={() => editExpense(expense)} 
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            color="secondary"
            onClick={() => removeExpense(expense)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RecurringExpenseCard
