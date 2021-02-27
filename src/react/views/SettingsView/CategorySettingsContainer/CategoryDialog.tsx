import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category, CategoryType } from '../../../../shared/types';

export interface CategoryDialogValues {
  name: string;
  type: CategoryType;
}

interface AddCategoryProps {
  isOpen: boolean;
  categoryToEdit: Category | null;
  categories: Category[];
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

const CategoryDialog = ({ isOpen, categoryToEdit, categories, handleClose, handleCategory }: AddCategoryProps): JSX.Element => {
  const { errors, control, formState, handleSubmit, watch, setError } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;

  const onSubmit = (values: CategoryDialogValues) => handleCategory(values);

  const watchName = watch('name', '');
  const nameExists = (): boolean => {
    const exists = categories.map(cat => cat.name).includes(watchName);
    if (exists) setError('name', {
      type: 'manual',
      message: 'This name is used already'
    })
    return exists;
  };

  return (
    <Dialog open={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{categoryToEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent>
          <Controller
            as={TextField}
            control={control}
            rules={{required: 'Name is required'}}
            defaultValue={categoryToEdit?.name || ''}
            margin="normal"
            name="name"
            label="Name"
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
            fullWidth
            select
          >
            {typeOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Controller>
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
            disabled={!isDirty || !isValid || nameExists()}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CategoryDialog;