import { makeStyles, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Category } from '../../../../shared/types'
import { roundToDecimals } from '../../../utils/round'

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
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void;
}

const BalanceTable = ({ className, categories, selectedCategory, selectCategory }: Props): JSX.Element | null => {
  const [total, setTotal] = useState(0);
  const classes = useStyles();  

  useEffect(() => {
    setTotal(categories.reduce((acc, curr) => acc += curr.balance, 0));
  }, [categories])

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
                selected={category.id === selectedCategory?.id}
                onClick={() => selectCategory(category)}
              >
              <TableCell>{category.name}</TableCell>
              <TableCell>{roundToDecimals(category.balance, 2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{total && roundToDecimals(total, 2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BalanceTable;