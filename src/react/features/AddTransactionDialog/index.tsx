import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { Controller, useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { selectDate } from '../../slices/dateSelection';
import { useSelector } from 'react-redux';
import { Category, KeyNumberPairs } from '../../../shared/types';
import BalancesList from './BalancesList';

interface Props {
  isOpen: boolean;
  transactionType: string;
  categories: Category[];
  handleClose: () => void;
  handleAddTransaction: (newTransaction: AddTransactionFormValues) => void;
}

export interface AddTransactionFormValues {
  date: Date;
  amount: string;
  balanceAdditions: KeyNumberPairs;
}

const AddTransactionDialog = ({ isOpen, transactionType, categories, handleClose, handleAddTransaction }: Props): JSX.Element => {
  const [sumOfBalances, setSumOfBalances] = useState(0);
  const { errors, control, handleSubmit, formState, setValue, watch } = useForm<AddTransactionFormValues>({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const selectedDate = useSelector(selectDate);
  const watchAmount = watch('amount', '0');
  const watchBalanceAdditions = watch('balanceAdditions', {});

  useEffect(() => {
    let total = 0;
    for (const category of categories) {
      total += Number(watchBalanceAdditions[category.name]) || 0;
    }
    setSumOfBalances(total);
  }, [watchBalanceAdditions])

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleAddTransaction)}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              as={KeyboardDatePicker}
              control={control}
              rules={{required: 'Date is required'}}
              margin="normal"
              name="date"
              label="Date"
              defaultValue={parseISO(selectedDate)}
              value=''
              format="dd.MM.yyyy"
              onChange={(date: ParsableDate) => setValue('date', date)}
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
            as={TextField}
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
          {transactionType === 'income' && 
            <BalancesList
              categories={categories}
              amount={Number(watchAmount)}
              control={control}
              errors={errors}
            />
          }
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
            disabled={!isDirty || !isValid || (transactionType === 'income' && Number(watchAmount) !== sumOfBalances)}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddTransactionDialog