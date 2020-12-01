import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { NewTransaction, TransactionType } from '../../types';
import AddTransactionForm from './AddTransactionForm';

const useStyles = makeStyles({
  errorText: {
    color: 'red',
  }
})

interface Props {
  categoryName: string;
  type: TransactionType;
  dialogOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewTransaction) => void;
  error?: string;
}

const AddTransactionDialog = ({ categoryName, type, dialogOpen, onClose, onSubmit, error }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Add new transaction</DialogTitle>
      <DialogContent>
        {error && 
        <Typography 
          className={classes.errorText}
          variant="subtitle1"
          gutterBottom
        >
            {`Error ${error}`}
        </Typography>}
        <AddTransactionForm
          categoryName={categoryName}
          type={type}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionDialog;