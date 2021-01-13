import { Box, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
// import LockIcon from '@material-ui/icons/Lock';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import React from 'react'
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import { AddTransactionFormValues } from '.';
import { Category } from '../../../shared/types'

interface Props {
  categories: Category[];
  amount: number;
  control: Control<AddTransactionFormValues>;
  errors: DeepMap<AddTransactionFormValues, FieldError>;
}

// interface Locked {
//   [key: string]: boolean
// }

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
  // const [locked, setLocked] = useState({} as Locked);
  const classes = useStyles();
  
  if (!categories) return null;

  // const toggleLocked = (categoryName: string) => {
  //   const newLocked = {...locked}
  //   newLocked[categoryName] = !newLocked[categoryName];
  //   setLocked(newLocked);
  // }

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
              name={`${category.name}`}
              label={`${category.name}`}
              defaultValue={0}
              error={errors.balanceAdditions && errors.balanceAdditions[`${category.name}`] && true}
              helperText={errors.balanceAdditions && errors.balanceAdditions[`${category.name}`]?.message}
              disabled={!amount || amount === 0}
              fullWidth
              required
            />
            {/* <Box onClick={() => toggleLocked(category.name)}>
              {locked[category.name] ? <LockIcon /> : <LockOpenIcon />}
            </Box> */}
          </Box>
        )}
    </Paper>
  )
}

export default BalancesList
