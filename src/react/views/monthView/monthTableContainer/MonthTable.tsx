import { Card, Divider, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Category, Transaction } from '../../../../shared/types'
import { BudgetsByCategory } from '../../../types'
import { roundToDecimals } from '../../../utils/round'
import { sumOfTransactionsInCategories, sumOfTransactionsInCategory } from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '20px',
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
  },
  totalRow: {
    borderTop: '2px solid',
    borderColor: theme.palette.text.secondary,
    width: '100%',
    paddingTop: '2px'
  }
}))

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
      <Typography variant="h6" className={classes.title}>{title}</Typography>
      <TableContainer className={classes.table}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Category</TableCell>
              <TableCell className={classes.valueCell}>Budgeted</TableCell>
              <TableCell className={classes.valueCell}>Real</TableCell>
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
                <TableCell>{roundToDecimals(budgets[category.id], 2)}</TableCell>
                <TableCell>{sumOfTransactionsInCategory(category, transactions)}</TableCell>
              </TableRow>
            ))}
            <TableRow className={classes.totalRow}>
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