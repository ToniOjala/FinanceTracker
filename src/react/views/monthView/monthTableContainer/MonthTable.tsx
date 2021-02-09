import { Card, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Category, Transaction } from '../../../../shared/types'
import { BudgetsByCategory } from '../../../types'
import { roundToDecimals } from '../../../utils/round'
import { sumOfTransactionsInCategories, sumOfTransactionsInCategory } from '../utils'

const useStyles = makeStyles({
  root: {
    padding: '20px',
    marginBottom: '20px',
    maxWidth: '800px'
  },
  title: {
    marginBottom: '20px'
  },
  headerCell: {
    width: '28%',
  },
  valueCell: {
    width: '24%',
  }
})

interface Props {
  title: 'Income' | 'Expense',
  categories: Category[],
  selectedCategory: Category,
  transactions: Transaction[],
  budgets: BudgetsByCategory,
  selectCategory: (category: Category) => void
}

const MonthTable = ({ title, categories, selectedCategory, transactions, budgets, selectCategory }: Props): JSX.Element | null => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h5" className={classes.title}>{title}</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Category</TableCell>
              <TableCell className={classes.valueCell}>Budgeted</TableCell>
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
                <TableCell>{roundToDecimals(budgets[category.id], 2)}</TableCell>
                <TableCell>{sumOfTransactionsInCategory(category, transactions)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                {title === 'Income' ? roundToDecimals(budgets['income'], 2) : roundToDecimals(budgets['expense'], 2)}
                </TableCell>
              <TableCell>{sumOfTransactionsInCategories(categories, transactions)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default MonthTable;