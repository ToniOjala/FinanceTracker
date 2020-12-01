import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { NewCategory, TransactionType } from '../../types';
import * as yup from 'yup';

interface Props {
  onSubmit: (values: NewCategory) => void;
  onCancel: () => void;
}

interface TypeOption {
  value: TransactionType,
  label: string
}

const typeOptions: TypeOption[] = [
  { value: TransactionType.Expense, label: 'Expense' },
  { value: TransactionType.Income, label: 'Income' }
];

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

const AddCategoryForm = ({ onSubmit, onCancel }: Props): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      name: '',
      type: TransactionType.Expense
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <Select
        fullWidth
        id="type"
        name="type"
        label="Type"
        value={formik.values.type}
        onChange={formik.handleChange}
        error={formik.touched.type && Boolean(formik.errors.type)}
      >
        {typeOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="contained" color="primary" type="submit">Add</Button>
    </form>
  )
};

export default AddCategoryForm;