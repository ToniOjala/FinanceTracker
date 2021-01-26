import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  categoryName: string | undefined;
  handleClose: () => void;
  handleAddToBalance: (values: AddBalanceValues) => void;
}

interface AddBalanceValues {
  amount: number;
}

const AddBalanceDialog = ({ isOpen, categoryName, handleClose, handleAddToBalance }: Props): JSX.Element => {
  const { errors, control, formState, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const { isValid, isDirty } = formState;
  const onSubmit: SubmitHandler<AddBalanceValues> = data => handleAddToBalance(data);
  const watchAmount = watch('amount', 0);

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
            disabled={!isDirty || !isValid || watchAmount == 0}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddBalanceDialog;