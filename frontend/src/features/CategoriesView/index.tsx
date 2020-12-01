import { Box, makeStyles } from '@material-ui/core'
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

const CategoriesView = (): JSX.Element | null => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  return (
    <Box display="flex">
      <Box className={classes.categories}>
        <CategoriesCard selectCategory={setSelectedCategory} />
      </Box>
      <Box className={classes.transactions}>
        {selectedCategory && <TransactionsCard category={selectedCategory} />}
      </Box>
    </Box>
  )
}

export default CategoriesView
