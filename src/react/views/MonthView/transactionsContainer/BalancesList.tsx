import { Box, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import { TransactionFormValues } from './TransactionDialog';
import { Category } from '../../../../shared/types'

interface Props {
  categories: Category[];
  amount: number;
  control: Control<TransactionFormValues>;
  errors: DeepMap<TransactionFormValues, FieldError>;
}

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginBottom: '20px'
  },
  row: {
    margin: '10px 20px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  text: {
    marginRight: '10px',
  }
})

const BalancesList = ({ categories, amount, control, errors }: Props): JSX.Element | null => {
  const classes = useStyles();
  
  if (!categories) return null;

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.title}>Balances</Typography>
        {categories.map(category =>
          <Box
            key={category.name}
            className={classes.row}
          >
            <Controller
              as={TextField}
              control={control}
              name={`balanceAdditions[${category.name}]`}
              label={`${category.name}`}
              defaultValue={0}
              error={errors.balanceAdditions && errors.balanceAdditions[`${category.name}`] && true}
              helperText={errors.balanceAdditions && errors.balanceAdditions[`${category.name}`]?.message}
              disabled={!amount || amount === 0}
              fullWidth
              required
            />
          </Box>
        )}
    </Paper>
  )
}

export default BalancesList
