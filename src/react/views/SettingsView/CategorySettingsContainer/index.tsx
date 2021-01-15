import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { format } from 'date-fns';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../../../../shared/types';
import { postCategory, selectCategories } from '../../../slices/categories';
import CategoryDialog, { CategoryDialogValues } from './CategoryDialog';
import CategoryTable from './CategoryTable'

const useStyles = makeStyles({
  table: {
    padding: '10px',
    margin: '20px 0 20px 0',
  }
});

const CategorySettingsContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const classes = useStyles();

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => {
    setSelectedCategory(null);
    setCategoryToEdit(null);
    setIsDialogOpen(false);
  }

  const handleCategory = (values: CategoryDialogValues) => {
    dispatch(postCategory({
      name: values.name,
      type: values.type,
      balance: 0,
      created: format(new Date(), 'yyyy')
    }));
    closeDialog();
  }

  return (
    <>
      <Typography variant="h5">Categories</Typography>
      <CategoryTable
        className={classes.table}
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={setSelectedCategory}
      />
      <Box display="flex">
        <Button onClick={openDialog}>Add</Button>
        <Button
          disabled={!selectedCategory}
        >
          Remove
        </Button>
        <Button
          disabled={!selectedCategory}
        >
          Edit
        </Button>
      </Box>
      <CategoryDialog
        isOpen={isDialogOpen}
        handleClose={closeDialog}
        handleCategory={handleCategory}
      />
    </>
  )
}

export default CategorySettingsContainer
