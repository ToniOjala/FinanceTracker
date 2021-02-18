import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RecurringExpense } from './RecurringView';

interface Props {
  isOpen: boolean;
  recurs: 'monthly' | 'yearly';
  handleClose: () => void;
  handleNewExpense: (newExpense: RecurringExpense) => void;
}

interface RecurringExpenseFormValues {
  name: string;
  amount: number;
  day: number;
  month?: number;
  notifyDaysBefore: number;
}

const RecurringExpenseDialog = ({ isOpen, recurs, handleClose, handleNewExpense }: Props) => {
  const { errors, control, formState, handleSubmit, reset } = useForm<RecurringExpenseFormValues>({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const onSubmit = (values: RecurringExpenseFormValues) => {
    handleNewExpense({
      name: values.name,
      amount: Number(values.amount),
      day: Number(values.day),
      month: Number(values.month),
      recurs,
      notifyDaysBefore: Number(values.notifyDaysBefore)
    });
    reset();
  }

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <DialogTitle>{`Add ${recurs.charAt(0).toUpperCase() + recurs.substr(1)} Recurring Transaction`}</DialogTitle>
        <DialogContent>
          <Controller 
            as={TextField}
            control={control}
            rules={{required: 'Name is required'}}
            defaultValue={''}
            margin="normal"
            name="name"
            label="Name"
            error={errors.name && true}
            helperText={errors.name?.message}
            fullWidth
            required
          />
          <Controller 
            as={TextField}
            control={control}
            rules={{required: 'Amount is required'}}
            defaultValue={''}
            margin="normal"
            name="amount"
            label="Amount"
            error={errors.amount && true}
            helperText={errors.amount?.message}
            fullWidth
            required
          />
          <Controller
            as={TextField}
            control={control}
            rules={{ min: 1, max: 30 }}
            defaultValue={1}
            margin="normal"
            name="day"
            label="Day of Month"
            error={errors.day && true}
            helperText={errors.day?.message}
            fullWidth
          />
          {recurs === 'yearly' &&
            <Controller
              as={TextField}
              control={control}
              rules={{ min: 1, max: 12 }}
              defaultValue={1}
              margin="normal"
              name="month"
              label="Month of Year"
              error={errors.month && true}
              helperText={errors.month?.message}
              fullWidth
            />
          }
          <Controller
            as={TextField}
            control={control}
            defaultValue={0}
            margin="normal"
            name="notifyDaysBefore"
            label="Notify Days Before"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            color="primary"
            disabled={!isDirty || !isValid}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RecurringExpenseDialog
