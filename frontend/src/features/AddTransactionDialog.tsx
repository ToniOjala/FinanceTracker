import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form';
import DatePickerField from '../components/DatePickerField';

interface AddTransactionProps {
  isOpen: boolean;
  handleClose: () => void;
  handleAddTransaction: (newTransaction: PartialNewTransaction) => void;
}

export interface PartialNewTransaction {
  date: string;
  amount: string;
}

const AddTransactionDialog = ({ isOpen, handleClose, handleAddTransaction }: AddTransactionProps): JSX.Element => {
  const { errors, control, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleAddTransaction)}>
        <DialogTitle>Add transaction</DialogTitle>
        <DialogContent>
            <Controller
              as={<DatePickerField />}
              control={control}
              rules={{required: 'Date is required'}}
              defaultValue=""
              margin="normal"
              name="date"
              label="Date"
              error={errors.date && true}
              helperText={errors.date?.message}
              fullWidth
              required
              autoFocus
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <Controller 
              as={<TextField />}
              control={control}
              rules={{required: 'Amount is required'}}
              defaultValue=""
              margin="normal"
              name="amount"
              label="Amount"
              error={errors.amount && true}
              helperText={errors.amount?.message}
              fullWidth
              required
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

export default AddTransactionDialog