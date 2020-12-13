import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectYearlyData } from '../../slices/transactions';
import { Category } from '../../types';
import { months } from './constants'

interface Props {
  title: string,
  categories: Category[]
}

const CategoryTable = ({ title, categories }: Props): JSX.Element | null => {
  const yearlyData = useSelector(selectYearlyData);

  if (!yearlyData || !categories) return null;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            {months.map(month => 
              <TableCell key={month}>{month}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(category => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              {yearlyData[category.name]?.map(monthlyValues => 
                <TableCell key={monthlyValues}>{monthlyValues}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable
