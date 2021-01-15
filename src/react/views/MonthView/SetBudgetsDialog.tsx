import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from '../../../shared/types';
import { BudgetsByCategory } from '../../types';

export interface UnprocessedBudgets {
  [key: string]: string
}

interface Props {
  isOpen: boolean;
  incomeCategories: Category[];
  expenseCategories: Category[];
  budgets: BudgetsByCategory;
  handleClose: () => void;
  handleSetBudgets: (budgets: UnprocessedBudgets) => void;
}

const SetBudgetsDialog = ({ isOpen, incomeCategories, expenseCategories, budgets, handleClose, handleSetBudgets }: Props): JSX.Element => {
  const { errors, control, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  return (
    <Dialog maxWidth='xs' open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleSetBudgets)}>
        <DialogTitle>Set Budgets</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Income</Typography>
          {incomeCategories.map(category => (
            <Controller
              key={category.name}
              as={TextField}
              control={control}
              rules={{required: `Budget for ${category.name} is required`}}
              margin="normal"
              name={`${category.name}`}
              label={`${category.name}`}
              defaultValue={budgets[category.name]}
              error={errors[`${category.name}`] && true}
              helperText={errors[`${category.name}`]?.message}
              fullWidth
              required
            />
          ))}
          <Typography variant="h6" style={{ marginTop: '30px' }}>Expense</Typography>
          {expenseCategories.map(category => (
            <Controller
              key={category.name}
              as={TextField}
              control={control}
              rules={{required: `Budget for ${category.name} is required`}}
              margin="normal"
              name={`${category.name}`}
              label={`${category.name}`}
              defaultValue={budgets[category.name]}
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
            Set
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SetBudgetsDialog;