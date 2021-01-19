import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { format } from 'date-fns';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../../../../shared/types';
import { postCategory, selectCategories, updateCategory } from '../../../slices/categories';
import CategoryDialog, { CategoryDialogValues } from './CategoryDialog';
import CategoryTable from './CategoryTable'

const useStyles = makeStyles({
  table: {
    width: '70%',
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
    if (categoryToEdit) {
      dispatch(updateCategory({
        ...categoryToEdit,
        name: values.name,
        type: values.type
      }));
    } else {
      dispatch(postCategory({
        name: values.name,
        type: values.type,
        balance: 0,
        created: format(new Date(), 'yyyy')
      }));
    }
    closeDialog();
  }
  
  const removeCategory = () => {
    if (!selectedCategory) return;
    const category = { ...selectedCategory, removed: format(new Date(), 'yyyy')};
    dispatch(updateCategory(category));
    setSelectedCategory(null);
  }

  const editCategory = () => {
    if (!selectedCategory) return;
    setCategoryToEdit(selectedCategory);
    openDialog();
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
        <Button
          onClick={openDialog}
        >
          Add
        </Button>
        <Button
          disabled={!selectedCategory}
          onClick={removeCategory}
        >
          Remove
        </Button>
        <Button
          disabled={!selectedCategory}
          onClick={editCategory}
        >
          Edit
        </Button>
      </Box>
      <CategoryDialog
        isOpen={isDialogOpen}
        categoryToEdit={categoryToEdit}
        handleClose={closeDialog}
        handleCategory={handleCategory}
      />
    </>
  )
}

export default CategorySettingsContainer
