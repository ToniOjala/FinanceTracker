import React from 'react';
import { NewTransaction, TransactionType } from "../../types";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';

interface Props {
  categoryName: string,
  type: TransactionType,
  onSubmit: (values: NewTransaction) => void;
  onCancel: () => void;
}

const validationSchema = yup.object({
  date: yup.string().required('Date is required'),
  amount: yup.number().required('Amount is required'),
})

const AddTransactionForm = ({ categoryName, type, onSubmit, onCancel}: Props): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      date: '',
      amount: 0,
      category: categoryName,
      type: type
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="date"
        name="date"
        label="Date"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />
      <TextField
        fullWidth
        id="amount"
        name="amount"
        label="Amount"
        value={formik.values.amount}
        onChange={formik.handleChange}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
      />
      <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="contained" color="primary" type="submit">Add</Button>
    </form>
  )
}

export default AddTransactionForm;