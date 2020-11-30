import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../../types'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.light,
    fontWeight: 'bold'
  }
}));

interface CategoryListProps {
  categories: Category[]
}

export const CategoryList = ({ categories }: CategoryListProps): JSX.Element | null => {
  const classes = useStyles();

  return (
    <List>
      {categories.map(category => (
        <ListItem key={category.name}>
          <Link className={classes.link} to={`/categories/${category.name}`}>
            <ListItemText primary={category.name} />
          </Link>
        </ListItem>
      ))}
    </List>
  )
}
