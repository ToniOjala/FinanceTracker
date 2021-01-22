import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category, CategoryType } from '../../../../shared/types';

export interface CategoryDialogValues {
  name: string;
  type: CategoryType;
}

interface AddCategoryProps {
  isOpen: boolean;
  categoryToEdit: Category | null;
  handleClose: () => void;
  handleCategory: (category: CategoryDialogValues) => void;
}

interface TypeOption {
  value: CategoryType;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' }
]

const CategoryDialog = ({ isOpen, categoryToEdit, handleClose, handleCategory }: AddCategoryProps): JSX.Element => {
  const { errors, control, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  return (
    <Dialog open={isOpen}>
      <form onSubmit={handleSubmit(handleCategory)}>
        <DialogTitle>Add new category</DialogTitle>
        <DialogContent>
          <Controller
            as={TextField}
            control={control}
            rules={{required: 'Name is required'}}
            defaultValue={categoryToEdit?.name || ''}
            margin="normal"
            name="name"
            label="Name"
            id="categoryDialog_name"
            error={errors.name && true}
            helperText={errors.name?.message}
            fullWidth
            required
            autoFocus
          />
          <Controller
            as={TextField}
            control={control}
            defaultValue={categoryToEdit?.type || 'expense'}
            margin="normal"
            name="type"
            label="Type"
            id="categoryDialog_type"
            fullWidth
            select
          >
            {typeOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Controller>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            id="categoryDialog_cancel"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            color="primary"
            id="categoryDialog_add"
            disabled={!isDirty || !isValid}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CategoryDialog;