import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleAddTransaction: (newTransaction: PartialNewTransaction) => void;
}

export interface PartialNewTransaction {
  date: string;
  amount: string;
}

const AddTransactionDialog = ({ isOpen, handleClose, handleAddTransaction }: Props): JSX.Element => {
  const { errors, control, handleSubmit, formState, setValue } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleAddTransaction)}>
        <DialogTitle>Add transaction</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              as={
                <KeyboardDatePicker 
                  value=''
                  onChange={(date: ParsableDate) => setValue('date', date)}
                  format="DD.MM.yyyy"
                />
              }
              control={control}
              rules={{required: 'Date is required'}}
              margin="normal"
              name="date"
              label="Date"
              defaultValue={moment().format()}
              error={errors.date && true}
              helperText={errors.date?.message}
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