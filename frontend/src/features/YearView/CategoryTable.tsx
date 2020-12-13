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
              <TableCell key={`${title}${month}`}>{month}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(category => (
            <TableRow key={category.name}>
              <TableCell>{category.name}</TableCell>
              {yearlyData[category.name]?.map((monthlyValues, index) => 
                <TableCell key={`${category.name}_${index}`}>{monthlyValues}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable
