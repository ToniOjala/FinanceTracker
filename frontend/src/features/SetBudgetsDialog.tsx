import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectBudgets } from '../slices/budgets';
import { selectCategories } from '../slices/categories';
import { Category } from '../types';
import { getBudgetOfCategory } from './MonthView/utils';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSetBudgets: () => void;
}

const SetBudgetsDialog = ({ isOpen, handleClose, handleSetBudgets }: Props): JSX.Element => {
  const { errors, control, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  const categories = useSelector(selectCategories);
  const budgets = useSelector(selectBudgets);

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleSetBudgets)}>
        <DialogTitle>Set Budgets</DialogTitle>
        <DialogContent>
          {categories.map(category => (
            <Controller
              key={category.name}
              as={<TextField />}
              control={control}
              rules={{required: `Budget for ${category.name} is required`}}
              margin="normal"
              name={`${category.name}_budget`}
              label={`${category.name}`}
              defaultValue={getBudgetOfCategory(category.name, budgets)}
              error={errors[`${category.name}_budget`] && true}
              helperText={errors[`${category.name}_budget`]?.message}
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
            disabled={!isDirty || isValid}
          >
            Set
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SetBudgetsDialog;