import { Accordion, AccordionDetails, AccordionSummary, makeStyles, TextField, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react'
import { Category } from '../../../shared/types'

interface Props {
  categories: Category[];
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

const BalancesAccordion = ({ categories }: Props): JSX.Element | null => {
  const classes = useStyles();
  
  if (!categories) return null;

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
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default BalancesAccordion
