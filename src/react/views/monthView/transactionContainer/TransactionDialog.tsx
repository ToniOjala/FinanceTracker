import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { Controller, useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { startOfMonth, endOfMonth, parseISO, format, add, sub, isLastDayOfMonth, isFirstDayOfMonth } from 'date-fns';
import { Category, KeyNumberPairs, Label, Transaction } from '../../../../shared/types';
import BalancesList from './BalancesList';
import CustomIcon from '../../../components/CustomIcon';
import AutoCompleteField from '../../../components/AutoCompleteField';

interface Props {
  isOpen: boolean;
  transactionType: 'income' | 'expense';
  categories: Category[];
  labels: Label[];
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

const TransactionDialog = ({ isOpen, transactionType, categories, labels, transactionToEdit, selectedDate, handleClose, handleTransaction }: Props): JSX.Element => {
  const [addMultiple, setAddMultiple] = useState(false);
  const [sumOfBalances, setSumOfBalances] = useState(0);
  const { errors, control, formState, handleSubmit, setValue, watch, reset, register } = useForm<TransactionFormValues>({ mode: 'onBlur' });
  const { isValid, isDirty } = formState;

  const onSubmit = (values: TransactionFormValues) => {
    const date = values.date;
    if (values.amount.includes(',')) {
      const splitAmount = values.amount.split(',');
      values.amount = `${splitAmount[0]}.${splitAmount[1]}`;
    }
    handleTransaction({ ...values, date: format(new Date(values.date), 'yyyy-MM-dd') }, !addMultiple);
    reset();
    if (addMultiple) setValue('date', date);
  }
  const watchAmount = watch('amount', '0');
  const watchDate = watch('date', '');
  const watchBalanceAdditions = watch('balanceAdditions', {});

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [])

  useEffect(() => {
    let total = 0;
    for (const category of categories) {
      total += Number(watchBalanceAdditions[category.name]) || 0;
    }
    setSumOfBalances(total);
  }, [watchBalanceAdditions])

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') event.preventDefault();
  }

  function increaseDate() {
    const date = new Date(watchDate); 
    if (isLastDayOfMonth(date) === false) setValue('date', format(add(date, { days: 1 }), 'yyyy-MM-dd' ));
  }

  function decreaseDate() {
    const date = new Date(watchDate);
    if (isFirstDayOfMonth(date) === false) setValue('date', format(sub(date, { days: 1 }), 'yyyy-MM-dd' ));
  }

  function handleAddMultipleChange(event: ChangeEvent<HTMLInputElement>) {
    setAddMultiple(event.currentTarget.checked);
  }

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form data-testid="transaction-form" onSubmit={handleSubmit(onSubmit)} >
        <DialogTitle>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={10}>
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
            </Grid>
            <Grid item container direction="column" xs={1}>
              <IconButton size="small" onClick={increaseDate}><CustomIcon icon="arrowUp" size="small" /></IconButton>
              <IconButton size="small" onClick={decreaseDate}><CustomIcon icon="arrowDown" size="small" /></IconButton>
            </Grid>
          </Grid>
          <Controller 
            as={TextField}
            control={control}
            rules={{required: 'Amount is required', pattern: /^[-]?\d*((\.|\,)\d{1,2})?$/ }}
            defaultValue={transactionToEdit?.amount || ''}
            margin="normal"
            name="amount"
            label="Amount"
            error={errors.amount && true}
            helperText={errors.amount?.message}
            fullWidth
            required
          />
          <AutoCompleteField
            name="label"
            label="Label"
            options={labels.map(l => l.name)}
            ref={register}
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