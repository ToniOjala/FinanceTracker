import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { Controller, useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { startOfMonth, endOfMonth } from 'date-fns';
import { selectDate } from '../../slices/dateSelection';
import { useSelector } from 'react-redux';
import { Category } from '../../../shared/types';
import BalancesAccordion from './BalancesAccordion';

interface Props {
  isOpen: boolean;
  categories: Category[];
  handleClose: () => void;
  handleAddTransaction: (newTransaction: PartialNewTransaction) => void;
}

export interface PartialNewTransaction {
  date: Date;
  amount: string;
}

const AddTransactionDialog = ({ isOpen, categories, handleClose, handleAddTransaction }: Props): JSX.Element => {
  const { errors, control, handleSubmit, formState, setValue } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const selectedDate = useSelector(selectDate);

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleAddTransaction)}>
        <DialogTitle>Add Transaction</DialogTitle>
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
          <BalancesAccordion
            categories={categories}
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