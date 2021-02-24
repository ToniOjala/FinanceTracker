import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Category, NewRecurringExpense, RecurringExpense } from '../../../shared/types';

const useStyles = makeStyles({
  menuPaper: {
    maxHeight: '200px',
  }
})

interface Props {
  isOpen: boolean;
  recurs: 'monthly' | 'yearly';
  expenseToEdit: RecurringExpense | null;
  categories: Category[];
  handleClose: () => void;
  addExpense: (expense: NewRecurringExpense) => void;
  updateExpense: (expense: RecurringExpense) => void;
}

interface RecurringExpenseFormValues {
  name: string;
  amount: number;
  category: number;
  day: number;
  month?: number;
  notifyDaysBefore: number;
}

const RecurringExpenseDialog = ({ isOpen, recurs, expenseToEdit, categories, handleClose, addExpense, updateExpense }: Props) => {
  const { errors, control, formState, handleSubmit, reset } = useForm<RecurringExpenseFormValues>({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const onSubmit = (values: RecurringExpenseFormValues) => {
    if (expenseToEdit) {
      updateExpense({
        id: expenseToEdit.id,
        categoryId: values.category,
        name: values.name,
        amount: Number(values.amount),
        day: Number(values.day),
        month: Number(values.month),
        recurs,
        notifyDaysBefore: Number(values.notifyDaysBefore)
      })
    } else {
      addExpense({
        categoryId: values.category,
        name: values.name,
        amount: Number(values.amount),
        day: Number(values.day),
        month: Number(values.month),
        recurs,
        notifyDaysBefore: Number(values.notifyDaysBefore)
      });
    }
    reset();
  }

  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <DialogTitle>{expenseToEdit ? 'Edit Recurring Expense' : 'Add Recurring Expense'}</DialogTitle>
        <DialogContent>
          <Controller 
            as={TextField}
            control={control}
            rules={{required: 'Name is required'}}
            defaultValue={expenseToEdit?.name || ''}
            margin="normal"
            name="name"
            label="Name"
            error={errors.name && true}
            helperText={errors.name?.message}
            disabled={expenseToEdit !== null}
            fullWidth
            required
          />
          <Controller 
            as={TextField}
            control={control}
            rules={{required: 'Amount is required'}}
            defaultValue={expenseToEdit?.amount || ''}
            margin="normal"
            name="amount"
            label="Amount"
            error={errors.amount && true}
            helperText={errors.amount?.message}
            fullWidth
            required
          />
          <Controller
            as={Select}
            control={control}
            rules={{required: 'Category is required'}}
            defaultValue={categories[0]?.id}
            name="category"
            label="Category"
            error={errors.category && true}
            fullWidth
            required
            MenuProps={{ classes: { paper: classes.menuPaper } }}
          >
            {categories.map(cat => <MenuItem key={cat.name} value={cat.id}>{cat.name}</MenuItem>)}
          </Controller>
          <Controller
            as={TextField}
            control={control}
            rules={{ min: 1, max: 30 }}
            defaultValue={expenseToEdit?.day || 1}
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
              defaultValue={expenseToEdit?.month || 1}
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
            defaultValue={expenseToEdit?.notifyDaysBefore || 0}
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
            {expenseToEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default RecurringExpenseDialog
