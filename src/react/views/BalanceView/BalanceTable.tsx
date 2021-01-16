import { makeStyles, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../shared/types'
import { roundToDecimals } from '../../utils/round'

const useStyles = makeStyles({
  headerCell: {
    width: '28%',
  },
  valueCell: {
    width: '24%',
  }
})

interface Props {
  className: string,
  categories: Category[],
}

const BalanceTable = ({ className, categories }: Props): JSX.Element | null => {
  const classes = useStyles();  

  return (
    <TableContainer
      className={className}
      component={Card}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>Category</TableCell>
            <TableCell className={classes.valueCell}>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(category => (
            <TableRow
                key={category.name}
                hover
              >
              <TableCell>{category.name}</TableCell>
              <TableCell>{roundToDecimals(category.balance, 2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BalanceTable;