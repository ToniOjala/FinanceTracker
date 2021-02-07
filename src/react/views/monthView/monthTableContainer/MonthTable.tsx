import { Card, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Category, Transaction } from '../../../../shared/types'
import { BudgetsByCategory } from '../../../types'
import { roundToDecimals } from '../../../utils/round'
import { sumOfCategoryTransactions, sumOfTransactions } from '../utils'

const useStyles = makeStyles({
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
  className: string,
  title: string,
  categories: Category[],
  selectedCategory: Category,
  transactions: Transaction[],
  budgets: BudgetsByCategory,
  selectCategory: (category: Category) => void
}

const MonthTable = ({ className, title, categories, selectedCategory, transactions, budgets, selectCategory }: Props): JSX.Element | null => {
  const classes = useStyles();

  return (
    <Card className={className}>
      <Typography variant="h5" className={classes.title}>{title}</Typography>
      <TableContainer>
        <Table>
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
                <TableCell>{sumOfCategoryTransactions(category, transactions)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                {title === 'Incomes'
                  ? roundToDecimals(budgets['income'], 2) 
                  : roundToDecimals(budgets['expense'], 2)
                }
                </TableCell>
              <TableCell>{sumOfTransactions(transactions)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default MonthTable;