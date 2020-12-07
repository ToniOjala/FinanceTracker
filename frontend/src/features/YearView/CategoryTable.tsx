import { Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { months } from './constants'

interface Props {
  title: string
}

const CategoryTable = ({ title }: Props): JSX.Element => {
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
      </Table>
    </TableContainer>
  )
}

export default CategoryTable
