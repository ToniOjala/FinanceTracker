import { TextField, Select } from '@material-ui/core';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';
import { TransactionType } from '../../types';

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextBox = ({ field, label, placeholder }: TextProps): JSX.Element => (
  <TextField>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </TextField>
);

export interface TypeOption {
  value: TransactionType,
  label: string
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: TypeOption[];
}

export const TypeSelection = ({ name, label, options }: SelectFieldProps): JSX.Element => (
  <Select>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Select>
) 