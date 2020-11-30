import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { Category } from '../../types'

interface CategoryListProps {
  categories: Category[]
}

export const CategoryList = ({ categories }: CategoryListProps): JSX.Element | null => {
  return (
    <List>
      {categories.map(category => (
        <ListItem key={category.name}>
          <ListItemText primary={category.name} />
        </ListItem>
      ))}
    </List>
  )
}
