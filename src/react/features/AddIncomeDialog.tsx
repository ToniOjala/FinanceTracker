import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MenuItem, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ParsableDate } from '@material-ui/pickers/constants/prop-types'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Category, Transaction } from '../../shared/types'
import BaseDialog from '../components/BaseDialog'
import { selectDate } from '../slices/dateSelection'
import CustomSelect from '../components/CustomSelect'

interface Props {
  isOpen: boolean;
  categories: Category[];
  handleClose: () => void;
  handleAddIncome: (newIncome: Transaction) => void;
}

const AddIncomeDialog = ({ isOpen, categories, handleClose, handleAddIncome }: Props) => {
  const { errors, control, setValue } = useForm({ mode: 'onChange' });
  const selectedDate = useSelector(selectDate);

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Add Income"
      confirmButtonText="Add"
      handleClose={handleClose}
      handleConfirm={handleAddIncome}
    >
      <>
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
        <CustomSelect
          control={control}
          name="category"
          label="Category"
          defaultValue={{} as Category}
        >
          {categories.map((category: Category) => <MenuItem value={category.name}>{category.name}</MenuItem>)}
        </CustomSelect>
      </>
    </BaseDialog>
  )
}

export default AddIncomeDialog
