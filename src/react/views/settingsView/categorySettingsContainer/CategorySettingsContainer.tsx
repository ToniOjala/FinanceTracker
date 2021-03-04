import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { format } from 'date-fns';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../../../../shared/types';
import { postCategory, selectCategories, updateCategory } from '../../../slices/categories';
import CategoryDialog, { CategoryDialogValues } from './CategoryDialog';
import CategoryTable from './CategoryTable'

const CategorySettingsContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => {
    setSelectedCategory(null);
    setIsDialogOpen(false);
    setTimeout(() => {
      setCategoryToEdit(null);
    }, 300)
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
      <CategoryTable
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={setSelectedCategory}
      />
      <Box display="flex">
        <Button
          onClick={openDialog}
        >
          New
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
        categories={categories}
        handleClose={closeDialog}
        handleCategory={handleCategory}
      />
    </>
  )
}

export default CategorySettingsContainer
