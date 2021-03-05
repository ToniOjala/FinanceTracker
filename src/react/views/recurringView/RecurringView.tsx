import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewRecurringExpense, RecurringExpense } from '../../../shared/types'
import CustomIcon from '../../components/CustomIcon'
import { selectExpenseCategories } from '../../slices/categories'
import { setDateSelectionStatus } from '../../slices/dateSelection'
import { deleteRecurringExpense, postRecurringExpense, selectMonthlyRecurringExpenses, selectYearlyRecurringExpenses, updateRecurringExpense } from '../../slices/recurringExpenses'
import RecurringExpenseCard from './RecurringExpenseCard'
import RecurringExpenseDialog from './RecurringExpenseDialog'

const useStyles = makeStyles({
  container: {
    paddingTop: '24px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
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
  }, [])

  function openDialog (recurs: 'monthly' | 'yearly') {
    setRecurs(recurs);
    setIsDialogOpen(true);
  }

  function closeDialog () {
    setIsDialogOpen(false);
    setTimeout(() => {
      setExpenseToEdit(null);
    }, 300)
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
    <Grid container style={{ padding: '24px 32px' }} justify="space-around">
      <Grid container item direction="column" sm={12} md={5} xl={4}>
        <div className={classes.title}>
          <Typography variant="h6">Monthly Recurring</Typography>
          <IconButton
            style={{ marginLeft: '10px' }}
            color="primary"
            onClick={() => openDialog('monthly')}
          >
            <CustomIcon icon="add" size="large" />
          </IconButton>
        </div>
        {monthlyRecurring.map(expense => (
          <RecurringExpenseCard
            key={expense.id}
            expense={expense}
            editExpense={editExpense}
            removeExpense={removeExpense}
          />
        ))}
      </Grid>
      <Grid container item direction="column" sm={12} md={5} xl={4}>
        <div className={classes.title}>
          <Typography variant="h6">Yearly Recurring</Typography>
          <IconButton
            style={{ marginLeft: '10px' }}
            color="primary"
            onClick={() => openDialog('yearly')}
          >
            <CustomIcon icon="add" size="large" />
          </IconButton>
        </div>
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
