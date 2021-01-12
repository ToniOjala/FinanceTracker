import { Box, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useEffect, useState } from 'react'
import { Category } from '../../../shared/types'
import { roundToDecimalsAsNumber } from '../../utils/round';

interface Props {
  categories: Category[];
  amount: number;
}

interface BalanceAdditions {
  [key: string]: { value: number, locked: boolean } 
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

const BalancesList = ({ categories, amount }: Props): JSX.Element | null => {
  const [balanceAdditions, setBalanceAdditions] = useState<BalanceAdditions>({} as BalanceAdditions);
  const classes = useStyles();
  
  if (!categories) return null;

  useEffect(() => {
    if (!amount || isNaN(amount)) return;
    
    const balances = {...balanceAdditions};
    updateBalances(balances);
  }, [amount])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const balances = {...balanceAdditions};
    balances[event.currentTarget.id].value = Number(event.currentTarget.value);
    balances[event.currentTarget.id].locked = true;
    updateBalances(balances);
  }

  const getAmountOfUnlockedBalances = (balances: BalanceAdditions) => {
    let unlockedAmount = 0;

    for (const category of categories) {
      if (balances[category.name] === undefined || balances[category.name].locked === false) {
        unlockedAmount++;
      }
    }
    if (unlockedAmount === 0) return 1;
    return unlockedAmount;
  }

  const updateBalances = (balances: BalanceAdditions) => {
    let total = amount;
    let unlockedAmount = getAmountOfUnlockedBalances(balances);

    for (const category of categories) {
      if (balances[category.name]?.locked === true) {
        total -= balances[category.name].value;
      }
    }

    for (const category of categories) {
      if (!balances[category.name]) {
        balances[category.name] = { value: 0, locked: false };
      }

      if (balances[category.name].locked === false) {
        const value = roundToDecimalsAsNumber(total / unlockedAmount, 2);
        balances[category.name].value = value;
        total -= value;
        unlockedAmount--;
      }
    }

    setBalanceAdditions(balances);
  }

  const toggleLocked = (category: string) => {
    if (!amount || amount === 0) return;
    const balances = {...balanceAdditions}
    balances[category].locked = !balances[category].locked;
    setBalanceAdditions(balances);
  }

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.title}>Balances</Typography>
        {categories.map(category =>
          <Box
            key={category.name}
            className={classes.row}
          >
            <TextField
              id={category.name}
              label={category.name}
              value={balanceAdditions[category.name]?.value || ''}
              onChange={handleChange}
              className={classes.text}
              disabled={!amount || amount === 0}
              fullWidth
            />
            <Box onClick={() => toggleLocked(category.name)}>
              {balanceAdditions[category.name]?.locked &&
                <LockIcon />
              }
              {!balanceAdditions[category.name]?.locked &&
                <LockOpenIcon />
              }
            </Box>
          </Box>
        )}
    </Paper>
  )
}

export default BalancesList
