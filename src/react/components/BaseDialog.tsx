import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  children: JSX.Element
  handleClose: () => void;
  handleConfirm: (params: any) => void;
}

const BaseDialog = ({ isOpen, title = 'title', confirmButtonText='Confirm', children, handleClose, handleConfirm }: Props) => {
  const { handleSubmit, formState } = useForm();
  const { isValid, isDirty } = formState;

  return (
    <Dialog open={isOpen} onClose={() => handleClose}>
      <form onSubmit={handleSubmit(handleConfirm)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => handleClose()}
          >
              Cancel
          </Button>
          <Button 
            type="submit"
            color="primary"
            disabled={!isDirty || !isValid}
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default BaseDialog
