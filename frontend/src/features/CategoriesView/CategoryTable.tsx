import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Category } from '../../types'

interface CategoryListProps {
  title: string,
  categories: Category[],
  selectCategory: (category: Category) => void
}

const CategoryTable = ({ title, categories, selectCategory }: CategoryListProps): JSX.Element | null => {
  return (
    <>
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
              <TableRow key={category.name} onClick={() => selectCategory(category)}>
                <TableCell>{category.name}</TableCell>
                <TableCell>0.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CategoryTable;