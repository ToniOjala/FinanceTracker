import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectSumsByCategory } from '../../slices/transactions';
import { months } from './constants'

interface Props {
  title: string,
}

const CategoryTable = ({ title }: Props): JSX.Element => {
  const sumsByCategory = useSelector(selectSumsByCategory);

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
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable
