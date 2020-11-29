import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { NewCategory } from '../../types';
import AddCategoryForm from './AddCategoryForm';

const useStyles = makeStyles({
  errorText: {
    color: 'red',
  }
})

interface Props {
  dialogOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewCategory) => void;
  error?: string;
}

const AddCategoryDialog = ({ dialogOpen, onClose, onSubmit, error }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Add new category</DialogTitle>
      <DialogContent>
        {error && <Typography className={classes.errorText} variant="subtitle1" gutterBottom>{`Error: ${error}`}</Typography>}
        <AddCategoryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog;