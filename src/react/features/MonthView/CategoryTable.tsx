import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBudgets } from '../../slices/budgets'
import { Category, Transaction } from '../../../shared/types'
import { roundToDecimals } from '../../utils/round'
import { sumOfCategoryTransactions } from './utils'

const useStyles = makeStyles({
  headerCell: {
    width: '28%',
  },
  valueCell: {
    width: '24%',
  }
})

interface CategoryListProps {
  className: string,
  title: string,
  categories: Category[],
  selectedCategory: Category,
  transactions: Transaction[],
  selectCategory: (category: Category) => void
}

const CategoryTable = ({ className, title, categories, selectedCategory, transactions, selectCategory }: CategoryListProps): JSX.Element | null => {
  const classes = useStyles();  
  const budgets = useSelector(selectBudgets);

  return (
    <div className={className}>
      <Typography variant="h5">{title}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Category</TableCell>
              <TableCell className={classes.valueCell}>Budgeted</TableCell>
              <TableCell className={classes.valueCell}>Real</TableCell>
              <TableCell className={classes.valueCell}>Balance</TableCell>
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
                <TableCell>{roundToDecimals(budgets[category.name], 2)}</TableCell>
                <TableCell>{sumOfCategoryTransactions(category, transactions)}</TableCell>
                <TableCell>{category.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CategoryTable;