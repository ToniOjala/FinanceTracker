import { Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { NewCategory, TransactionType } from '../../types';
import { TextBox, TypeOption, TypeSelection } from './FormFields';

interface Props {
  onSubmit: (values: NewCategory) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: TransactionType.Expense, label: 'Expense' },
  { value: TransactionType.Income, label: 'Income' }
];

const AddCategoryForm = ({ onSubmit, onCancel }: Props): JSX.Element => {
  return (
    <Formik
      initialValues={{
        name: "",
        type: TransactionType.Expense
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.name) errors.name = requiredError;
        if (!values.type) errors.type = requiredError;
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextBox}
            />
            <TypeSelection
              label="Type"
              name="gender"
              options={typeOptions}
            />
            <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
            <Button variant="contained" color="primary" disabled={!dirty || !isValid}>Create</Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddCategoryForm;