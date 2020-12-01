import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { Category } from '../../types'

interface CategoryListProps {
  title: string,
  categories: Category[],
  selectCategory: (category: string) => void
}

export const CategoryList = ({ title, categories, selectCategory }: CategoryListProps): JSX.Element | null => {
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <List>
        {categories.map(category => (
          <ListItem key={category.name}>
              <ListItemText primary={category.name} onClick={() => selectCategory(category.name)} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
