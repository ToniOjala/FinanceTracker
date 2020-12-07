import { Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { YearMonth } from '../../types'

interface Props {
  yearMonth: YearMonth
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const YearView = ({ yearMonth }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Expenses</TableCell>
            {months.map(month => 
              <TableCell key={month}>{month}</TableCell>
            )}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default YearView
