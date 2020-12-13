import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Category, Transaction } from '../../types'
import { sumOfCategoryTransactions } from './utils'

interface CategoryListProps {
  className: string,
  title: string,
  categories: Category[],
  selectedCategory: Category,
  transactions: Transaction[],
  selectCategory: (category: Category) => void
}

const CategoryTable = ({ className, title, categories, selectedCategory, transactions, selectCategory }: CategoryListProps): JSX.Element | null => {
  return (
    <div className={className}>
      <Typography variant="h5">{title}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Real</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow
                key={category.name}
                hover 
                selected={selectedCategory === category}
                onClick={() => selectCategory(category)}>
                <TableCell>{category.name}</TableCell>
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