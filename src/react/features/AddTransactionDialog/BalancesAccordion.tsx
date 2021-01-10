import { Accordion, AccordionDetails, AccordionSummary, makeStyles, TextField, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react'
import { Category } from '../../../shared/types'
import { CategoryBalances } from '../AddBalanceDialog';

interface Props {
  categories: Category[];
  amount: number;
}

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
    border: 'none',
    boxShadow: 'none',
    elevation: '0'
  },
  summary: {
    padding: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    marginBottom: '6px',
  }
})

const BalancesAccordion = ({ categories, amount }: Props): JSX.Element | null => {
  const [sum, setSum] = useState(categories.length);
  const classes = useStyles();
  
  if (!categories) return null;
  
  useEffect(() => {
    if (!amount || isNaN(amount)) setSum(categories.length);
    else setSum(amount);
  }, [amount])

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        className={classes.summary}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Balances</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.list}>
        {categories.map(category =>
          <TextField
            key={category.name}
            className={classes.row}
            id={category.name}
            label={category.name}
            value={sum / categories.length}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default BalancesAccordion
