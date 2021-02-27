import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { Controller, useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';
import { Category, KeyNumberPairs, Transaction } from '../../../../shared/types';
import BalancesList from './BalancesList';

interface Props {
  isOpen: boolean;
  transactionType: 'income' | 'expense';
  categories: Category[];
  transactionToEdit: Transaction | null;
  selectedDate: string;
  handleClose: () => void;
  handleTransaction: (newTransaction: TransactionFormValues, close: boolean) => void;
}

export interface TransactionFormValues {
  date: string;
  amount: string;
  label?: string;
  balanceAdditions: KeyNumberPairs;
}

const TransactionDialog = ({ isOpen, transactionType, categories, transactionToEdit, selectedDate, handleClose, handleTransaction }: Props): JSX.Element => {
  const [addMultiple, setAddMultiple] = useState(false);
  const [sumOfBalances, setSumOfBalances] = useState(0);
  const { errors, control, handleSubmit, formState, setValue, watch, reset } = useForm<TransactionFormValues>({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const onSubmit = (values: TransactionFormValues) => {
    handleTransaction({ ...values, date: format(new Date(values.date), 'yyyy-MM-dd') }, !addMultiple);
    reset();
  }
  const watchAmount = watch('amount', '0');
  const watchBalanceAdditions = watch('balanceAdditions', {});

  useEffect(() => {
    let total = 0;
    for (const category of categories) {
      total += Number(watchBalanceAdditions[category.name]) || 0;
    }
    setSumOfBalances(total);
  }, [watchBalanceAdditions])

  function handleAddMultipleChange(event: ChangeEvent<HTMLInputElement>) {
    setAddMultiple(event.currentTarget.checked);
  }

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form data-testid="transaction-form" onSubmit={handleSubmit(onSubmit)} >
        <DialogTitle>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              as={KeyboardDatePicker}
              control={control}
              rules={{required: 'Date is required'}}
              margin="normal"
              name="date"
              label="Date"
              defaultValue={transactionToEdit && parseISO(transactionToEdit.date) || parseISO(selectedDate)}
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
            type="number"
            defaultValue={transactionToEdit?.amount || ''}
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
            defaultValue={transactionToEdit?.label || ''}
            margin="normal"
            name="label"
            label="Label"
            error={errors.label && true}
            helperText={errors.label?.message}
            fullWidth
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
          {transactionToEdit === null && 
            <FormControlLabel
              control={<Checkbox checked={addMultiple} onChange={handleAddMultipleChange} name="addMultipleCheckBox" />}
              label="Add Multiple"
            />
          }
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

export default TransactionDialog