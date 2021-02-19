import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { AddIcon } from '../../components/icons'
import RecurringExpenseCard from './RecurringExpenseCard'
import RecurringExpenseDialog from './RecurringExpenseDialog'

const useStyles = makeStyles({
  container: {
    paddingTop: '24px',
  },
  title: {
    marginBottom: '24px',
  }
})

export interface RecurringExpense {
  name: string;
  amount: number;
  recurs: 'monthly' | 'yearly';
  day: number;
  month?: number;
  notifyDaysBefore: number;
}

const monthly: RecurringExpense[] = [
  {
    name: 'Netflix',
    amount: 12.99,
    recurs: 'monthly',
    day: 1,
    notifyDaysBefore: 5
  },
  {
    name: 'Spotify',
    amount: 8.49,
    recurs: 'monthly',
    day: 15,
    notifyDaysBefore: 1,
  },
]

const yearly: RecurringExpense[] = [
  {
    name: 'Notion',
    amount: 49.99,
    recurs: 'yearly',
    day: 1,
    month: 6,
    notifyDaysBefore: 35,
  },
]

const RecurringView = () => {
  const [monthlyRecurringExpenses, setMonthlyRecurringExpenses] = useState(monthly);
  const [yearlyRecurringExpenses, setYearlyRecurringExpenses] = useState(yearly);
  const [expenseToEdit, setExpenseToEdit] = useState<RecurringExpense | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recurs, setRecurs] = useState<'monthly' | 'yearly'>('monthly');

  const classes = useStyles();

  function openDialog (recurs: 'monthly' | 'yearly') {
    setRecurs(recurs);
    setIsDialogOpen(true);
  }

  function closeDialog () {
    setIsDialogOpen(false);
    setExpenseToEdit(null);
  }

  function addExpense(newExpense: RecurringExpense) {
    if (recurs === 'monthly') setMonthlyRecurringExpenses([ ...monthlyRecurringExpenses, newExpense ]);
    else setYearlyRecurringExpenses([ ...yearlyRecurringExpenses, newExpense ]);
    closeDialog();
  }

  function editExpense(expense: RecurringExpense) {
    setExpenseToEdit(expense);
    setRecurs(expense.recurs);
    setIsDialogOpen(true);
  }

  function updateExpense(expense: RecurringExpense) {
    setIsDialogOpen(false);
    if (expense.recurs === 'monthly') {
      setMonthlyRecurringExpenses(monthlyRecurringExpenses.map(exp => {
        if (exp.name === expense.name) return expense;
        else return exp;
      }))
    } else {
      setYearlyRecurringExpenses(yearlyRecurringExpenses.map(exp => {
        if (exp.name === expense.name) return expense;
        else return exp;
      }))
    }
    setExpenseToEdit(null);
  }

  function removeExpense(expense: RecurringExpense) {
    if (expense.recurs === 'monthly') {
      const filteredExpenses = monthlyRecurringExpenses.filter(exp => exp.name !== expense.name);
      setMonthlyRecurringExpenses(filteredExpenses);
    } else {
      const filteredExpenses = yearlyRecurringExpenses.filter(exp => exp.name !== expense.name);
      setYearlyRecurringExpenses(filteredExpenses);
    }
  }

  return (
    <Grid container style={{ paddingTop: '24px' }} justify="space-around">
      <Grid container item direction="column" xs={5}>
        <Grid className={classes.title} container alignItems="center">
          <Typography variant="h6">Monthly Recurring</Typography>
          <IconButton
            style={{ marginLeft: '10px' }}
            color="primary"
            onClick={() => openDialog('monthly')}
          >
            <AddIcon />
          </IconButton>
        </Grid>
        {monthlyRecurringExpenses.map(exp => (
          <RecurringExpenseCard
            expense={exp}
            editExpense={editExpense}
            removeExpense={removeExpense}
          />
        ))}
      </Grid>
      <Grid container item direction="column" xs={5}>
        <Grid className={classes.title} container alignItems="center">
          <Typography variant="h6">Yearly Recurring</Typography>
          <IconButton
            style={{ marginLeft: '10px' }}
            color="primary"
            onClick={() => openDialog('yearly')}
          >
            <AddIcon />
          </IconButton>
        </Grid>
        {yearlyRecurringExpenses.map(expense => (
          <RecurringExpenseCard
            expense={expense}
            editExpense={editExpense}
            removeExpense={removeExpense}
          />
        ))}
      </Grid>
      <RecurringExpenseDialog
        isOpen={isDialogOpen}
        recurs={recurs}
        expenseToEdit={expenseToEdit}
        handleClose={closeDialog}
        addExpense={addExpense}
        updateExpense={updateExpense}
      />
    </Grid>
  )
}

export default RecurringView
