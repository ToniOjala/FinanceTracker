import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../slices/categories';
import CategoryTable from './CategoryTable'

const useStyles = makeStyles({
  table: {
    padding: '10px',
    margin: '20px 0 20px 0',
  }
});

const CategorySettingsContainer = () => {
  const categories = useSelector(selectCategories);
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5">Categories</Typography>
      <CategoryTable
        className={classes.table}
        categories={categories}
      />
      <Box display="flex">
        <Button>Add</Button>
        <Button>Remove</Button>
        <Button>Edit</Button>
      </Box>
    </>
  )
}

export default CategorySettingsContainer
