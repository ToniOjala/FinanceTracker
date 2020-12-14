import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBudgets } from '../../slices/budgets'
import { Category, Transaction } from '../../types'
import { roundToDecimals } from '../../utils/round'
import { sumOfCategoryTransactions } from './utils'

const useStyles = makeStyles({
  headerCell: {
    width: '30%',
  },
  budgetCell: {
    width: '35%',
  },
  valueCell: {
    width: '35%',
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

  const getBudgetOfCategory = (category: string): string => {
    const amount = budgets.find(b => b.category === category)?.amount;
    if (amount) return roundToDecimals(amount, 2);
    return '0.00';
  }

  return (
    <div className={className}>
      <Typography variant="h5">{title}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Category</TableCell>
              <TableCell className={classes.budgetCell}>Budgeted</TableCell>
              <TableCell className={classes.valueCell}>Real</TableCell>
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
                <TableCell>{getBudgetOfCategory(category.name)}</TableCell>
                <TableCell>{sumOfCategoryTransactions(category, transactions)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CategoryTable;