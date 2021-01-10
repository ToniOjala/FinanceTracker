import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../shared/types'

interface Props {
  categories: Category[]
}

const BalancesAccordion = ({ categories }: Props) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Balances</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {categories.map((category) => {
          <TextField id={category.name} label={category.name} />
        })}
      </AccordionDetails>
    </Accordion>
  )
}

export default BalancesAccordion
