import { makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Category } from '../../../shared/types'

interface Props {
  categories: Category[];
  amount: number;
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
  }
})

const BalancesList = ({ categories, amount }: Props): JSX.Element | null => {
  const [sum, setSum] = useState(categories.length);
  const classes = useStyles();
  
  if (!categories) return null;
  
  useEffect(() => {
    if (!amount || isNaN(amount)) setSum(categories.length);
    else setSum(amount);
  }, [amount])

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.title}>Balances</Typography>
        {categories.map(category =>
          <TextField
            key={category.name}
            className={classes.row}
            id={category.name}
            label={category.name}
            value={sum / categories.length}
          />
        )}
    </Paper>
  )
}

export default BalancesList
