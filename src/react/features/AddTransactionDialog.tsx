import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { startOfMonth, endOfMonth } from 'date-fns';
import { selectDate } from '../slices/dateSelection';
import { useSelector } from 'react-redux';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleAddTransaction: (newTransaction: PartialNewTransaction) => void;
}

export interface PartialNewTransaction {
  date: Date;
  amount: string;
}

const AddTransactionDialog = ({ isOpen, handleClose, handleAddTransaction }: Props): JSX.Element => {
  const { errors, control, handleSubmit, formState, setValue } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const selectedDate = useSelector(selectDate);

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleAddTransaction)}>
        <DialogTitle>Add transaction</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              as={
                <KeyboardDatePicker 
                  value=''
                  onChange={(date: ParsableDate) => setValue('date', date)}
                  format="dd.MM.yyyy"
                />
              }
              control={control}
              rules={{required: 'Date is required'}}
              margin="normal"
              name="date"
              label="Date"
              defaultValue={selectedDate}
              error={errors.date && true}
              helperText={errors.date?.message}
              minDate={startOfMonth(new Date(selectedDate))}
              maxDate={endOfMonth(new Date(selectedDate))}
              fullWidth
              required
              autoOk
            />
          </MuiPickersUtilsProvider>
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