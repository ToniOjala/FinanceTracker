import { Box, makeStyles } from '@material-ui/core'
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import React, { useState } from 'react'
import { Category } from '../../types';
import CategoriesCard from './CategoriesCard';
import TransactionsCard from './TransactionsCard'

const useStyles = makeStyles({
  categories: {
    width: '70%',
    margin: '20px'
  },
  transactions: {
    width: '30%',
    margin: '20px 20px 20px 0'
  }
})

interface Props {
  date: ParsableDate
}

const CategoriesView = ({ date }: Props): JSX.Element | null => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  return (
    <Box display="flex">
      <Box className={classes.categories}>
        <CategoriesCard selectCategory={setSelectedCategory} />
      </Box>
      <Box className={classes.transactions}>
        {selectedCategory && <TransactionsCard category={selectedCategory} date={date} />}
      </Box>
    </Box>
  )
}

export default CategoriesView
