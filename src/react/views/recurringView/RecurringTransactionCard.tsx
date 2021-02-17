import { Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { AlarmIcon, DeleteIcon, EditIcon } from '../../components/icons'
import { RecurringTransaction } from './RecurringView'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '640px',
    height: '80px',
    padding: '10px',
    marginBottom: '20px',
  },
  editButton: {
    color: theme.palette.text.secondary,
  },
  alarm: {
    marginTop: '10px',
  },
  alarmText: {
    marginLeft: '5px',
  }
}))

interface Props {
  transaction: RecurringTransaction;
}

const RecurringTransactionCard = ({ transaction }: Props) => {
  const classes = useStyles();
  
  return (
    <Paper key={transaction.title} className={classes.paper} elevation={6}>
      <Grid container direction="row">
        <Grid item container xs={3} direction="column" justify="space-between">
          <Typography variant="h5">{transaction.title}</Typography>
          <Grid className={classes.alarm} item container alignItems="flex-end">
            <AlarmIcon />
            <Typography className={classes.alarmText} variant="caption">{transaction.notifyDaysBefore}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={5} container direction="column">
          <Typography variant="body1">{transaction.amount} / {transaction.recurs}</Typography>
          { transaction.recurs === 'monthly' && <Typography variant="body1">Occurs on {transaction.day}. of each month</Typography>}
          { transaction.recurs === 'yearly' && <Typography variant="body1">Occurs on {transaction.day}.{transaction.day} of each year</Typography>}
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <IconButton className={classes.editButton}><EditIcon /></IconButton>
          <IconButton color="secondary"><DeleteIcon /></IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RecurringTransactionCard
