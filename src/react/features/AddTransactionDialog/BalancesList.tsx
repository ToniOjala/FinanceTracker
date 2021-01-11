import { makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Category } from '../../../shared/types'
import { CategoryBalances } from '../AddBalanceDialog'

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
  const [sum, setSum] = useState(0);
  const [categoryBalances, setCategoryBalances] = useState<CategoryBalances>({} as CategoryBalances);
  const classes = useStyles();
  
  if (!categories) return null;

  useEffect(() => {
    if (!amount || isNaN(amount)) setSum(0);
    else setSum(amount);
  }, [amount])

  useEffect(() => {
    const balances = {} as CategoryBalances;
    categories.forEach((category: Category) => {
      balances[category.name] = sum / categories.length;
    })
    setCategoryBalances(balances);
  }, [sum])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const balances = {...categoryBalances};
    balances[event.currentTarget.id] = Number(event.currentTarget.value);
    console.log('id: ', event.currentTarget.id);
    console.log('value: ', Number(event.currentTarget.value));
    console.log('balance: ', balances[event.currentTarget.id])
    setCategoryBalances(balances);
  }

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.title}>Balances</Typography>
        {categories.map(category =>
          <TextField
            key={category.name}
            className={classes.row}
            id={category.name}
            label={category.name}
            value={categoryBalances[category.name] || ''}
            onChange={handleChange}
          />
        )}
    </Paper>
  )
}

export default BalancesList
