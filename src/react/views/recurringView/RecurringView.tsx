import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewRecurringExpense, RecurringExpense } from '../../../shared/types'
import { AddIcon } from '../../components/icons'
import { selectExpenseCategories } from '../../slices/categories'
import { setDateSelectionStatus } from '../../slices/dateSelection'
import { deleteRecurringExpense, fetchRecurringExpenses, postRecurringExpense, selectMonthlyRecurringExpenses, selectYearlyRecurringExpenses, updateRecurringExpense } from '../../slices/recurringExpenses'
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

const RecurringView = () => {
  const [expenseToEdit, setExpenseToEdit] = useState<RecurringExpense | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recurs, setRecurs] = useState<'monthly' | 'yearly'>('monthly');

  const classes = useStyles();
  const dispatch = useDispatch();
  const monthlyRecurring = useSelector(selectMonthlyRecurringExpenses);
  const yearlyRecurring = useSelector(selectYearlyRecurringExpenses);
  const expenseCategories = useSelector(selectExpenseCategories);

  useEffect(() => {
    dispatch(setDateSelectionStatus('hidden'));
    if (!monthlyRecurring && !yearlyRecurring || [...monthlyRecurring, ...yearlyRecurring].length === 0) dispatch(fetchRecurringExpenses());
  }, [])

  function openDialog (recurs: 'monthly' | 'yearly') {
    setRecurs(recurs);
    setIsDialogOpen(true);
  }

  function closeDialog () {
    setIsDialogOpen(false);
    setExpenseToEdit(null);
  }

  function addExpense(newExpense: NewRecurringExpense) {
    dispatch(postRecurringExpense(newExpense));
    closeDialog();
  }

  function editExpense(expense: RecurringExpense) {
    setExpenseToEdit(expense);
    setRecurs(expense.recurs);
    setIsDialogOpen(true);
  }

  function updateExpense(expense: RecurringExpense) {
    setIsDialogOpen(false);
    dispatch(updateRecurringExpense(expense));
    setExpenseToEdit(null);
  }

  function removeExpense(expense: RecurringExpense) {
    dispatch(deleteRecurringExpense(expense));
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
        {monthlyRecurring.map(expense => (
          <RecurringExpenseCard
            key={expense.id}
            expense={expense}
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
        {yearlyRecurring.map(expense => (
          <RecurringExpenseCard
            key={expense.id}
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
        categories={expenseCategories}
        handleClose={closeDialog}
        addExpense={addExpense}
        updateExpense={updateExpense}
      />
    </Grid>
  )
}

export default RecurringView
