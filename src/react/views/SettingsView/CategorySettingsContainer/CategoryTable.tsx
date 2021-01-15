import { makeStyles, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../../shared/types'

const useStyles = makeStyles({
  headerCell: {
    width: '28%',
  },
  valueCell: {
    width: '24%',
  }
})

interface Props {
  className: string;
  categories: Category[];
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void;
}

const CategoryTable = ({ className, categories, selectedCategory, selectCategory }: Props): JSX.Element | null => {
  const classes = useStyles();

  return (
    <TableContainer
      className={className}
      component={Card}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>Category</TableCell>
            <TableCell className={classes.valueCell}><TableSortLabel>Type</TableSortLabel></TableCell>
            <TableCell className={classes.valueCell}>Created</TableCell>
            <TableCell className={classes.valueCell}>Removed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(category => (
            <TableRow
                key={category.name}
                hover 
                selected={selectedCategory === category}
                onClick={() => selectCategory(category)}
              >
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.type[0].toUpperCase() + category.type.substr(1)}</TableCell>
              <TableCell>{category.created}</TableCell>
              <TableCell>{category.removed || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable;