import DateFnsUtils from '@date-io/date-fns'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ParsableDate } from '@material-ui/pickers/constants/prop-types'
import { add, endOfMonth, format, isFirstDayOfMonth, isLastDayOfMonth, parseISO, startOfMonth, sub } from 'date-fns'
import React, { ChangeEvent, useState } from 'react'
import { Category, KeyNumberPairs, Label, Transaction } from '../../../../shared/types'
import AmountField from '../../../components/AmountField'
import CustomIcon from '../../../components/CustomIcon'
import { useForm } from '../../../hooks/useForm'

interface Props {
  isOpen: boolean;
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

const ExpenseDialog = (props: Props) => {
  const [addMultiple, setAddMultiple] = useState(false);
  const { values, setValue } = useForm({ 
    date: format(new Date(), 'yyyy-MM-dd'),
    amount: '0',
  });

  function increaseDate() {
    const date = new Date(values['date']);
    if (isLastDayOfMonth(date) === false) setValue('date', format(add(date, { days: 1 }), 'yyyy-MM-dd'));
  }

  function decreaseDate() {
    const date = new Date(values['date']);
    if (isFirstDayOfMonth(date) === false) setValue('date', format(sub(date, { days: 1 }), 'yyyy-MM-dd'));
  }

  function handleAddMultipleChange(event: ChangeEvent<HTMLInputElement>) {
    setAddMultiple(event.currentTarget.checked);
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClose}>
      <form data-testid="transaction-form">
        <DialogTitle>{props.transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={10}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  name="date"
                  label="Date"
                  defaultValue={props.transactionToEdit && parseISO(props.transactionToEdit.date) || parseISO(props.selectedDate)}
                  value=''
                  format="dd.MM.yyyy"
                  onChange={(date: ParsableDate) => setValue('date', date as string)}
                  minDate={startOfMonth(new Date(props.selectedDate))}
                  maxDate={endOfMonth(new Date(props.selectedDate))}
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
          <AmountField
            name="amount"
            label="Amount"
            // defaultValue={props.transactionToEdit?.amount || ''}
            // error={errors.amount && true}
            // helperText={errors.amount?.message}
            required
          />
          {/* <AutoCompleteField
            name="label"
            label="Label"
            options={props.labels.map(l => l.name)}
            defaultValue={props.transactionToEdit?.label || ''}
          /> */}
        </DialogContent>
        <DialogActions>
          {props.transactionToEdit === null && 
            <FormControlLabel
              control={<Checkbox checked={addMultiple} onChange={handleAddMultipleChange} name="addMultipleCheckBox" />}
              label="Add Multiple"
            />
          }
          <Button
            color="secondary"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            color="primary"
            disabled={values['amount'].length <= 0}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ExpenseDialog
