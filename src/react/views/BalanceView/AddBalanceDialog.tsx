import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from '../../../shared/types';

export interface CategoryBalances {
  [key: string]: number;
}

interface Props {
  isOpen: boolean;
  categories: Category[];
  handleClose: () => void;
  handleAddToBalance: (balances: CategoryBalances) => void;
}

const SetBudgetsDialog = ({ isOpen, categories, handleClose, handleAddToBalance }: Props): JSX.Element => {
  const { errors, control, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  return (
    <Dialog maxWidth='xs' open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleAddToBalance)}>
        <DialogTitle>Add to Balance</DialogTitle>
        <DialogContent>
          {categories.map(category => (
            <Controller
              key={category.name}
              as={<TextField />}
              control={control}
              margin="normal"
              name={`${category.name}`}
              label={`${category.name}`}
              defaultValue='0'
              error={errors[`${category.name}`] && true}
              helperText={errors[`${category.name}`]?.message}
              fullWidth
              required
            />
          ))}
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

export default SetBudgetsDialog;