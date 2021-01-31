import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  categoryName: string | undefined;
  handleClose: () => void;
  handleAddToBalance: (values: FormValues) => void;
}

interface FormValues {
  amount: number;
}

const AddBalanceDialog = ({ isOpen, categoryName, handleClose, handleAddToBalance }: Props): JSX.Element => {
  const { errors, control, formState, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const onSubmit = (values: FormValues) => handleAddToBalance(values);
  const watchAmount = watch('amount', 0);

  function disableAdd () {
    return (watchAmount <= 0 || isNaN(Number(watchAmount)));
  }

  return (
    <Dialog maxWidth='xs' open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Balance to {categoryName}</DialogTitle>
        <DialogContent>
        <Controller
          as={<TextField />}
          control={control}
          rules={{required: 'Amount is required'}}
          margin="normal"
          name="amount"
          label="Amount"
          defaultValue='0'
          error={errors['amount'] && true}
          helperText={errors['amount']?.message}
          fullWidth
          required
        />
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
            disabled={!isDirty || !isValid || disableAdd() }
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddBalanceDialog;