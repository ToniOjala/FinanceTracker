import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../../shared/types'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px 0',
  },
  title: {
    padding: '20px',
    backgroundColor: theme.palette.primary.dark,
  },
  table: {
    padding: '20px',
  },
  headerCell: {
    width: '28%',
    color: theme.palette.text.secondary,
  },
  valueCell: {
    width: '24%',
    color: theme.palette.text.secondary,
  },
  darkerRow: {
    backgroundColor: theme.palette.background.default,
  }
}))

interface Props {
  categories: Category[];
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void;
}

const CategoryTable = ({ categories, selectedCategory, selectCategory }: Props): JSX.Element | null => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={6}>
      <Typography variant="h6" className={classes.title}>Categories</Typography>
      <TableContainer className={classes.table}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Category</TableCell>
              <TableCell className={classes.valueCell}><TableSortLabel>Type</TableSortLabel></TableCell>
              <TableCell className={classes.valueCell}>Created</TableCell>
              <TableCell className={classes.valueCell}>Removed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                className={index % 2 === 0 ? classes.darkerRow : ''}
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
    </Paper>
  )
}

export default CategoryTable;