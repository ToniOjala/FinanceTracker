import { makeStyles, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Category } from '../../../../shared/types'
import { roundToDecimals } from '../../../utils/round'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '20px',
  },
  title: {
    padding: '20px',
    backgroundColor: theme.palette.primary.dark,
  },
  table: {
    padding: '20px',
  },
  headerCell: {
    width: '28%',
    color: theme.palette.text.secondary,
  },
  valueCell: {
    width: '24%',
    color: theme.palette.text.secondary,
  },
  darkerRow: {
    backgroundColor: theme.palette.background.default,
  },
}))

interface Props {
  categories: Category[],
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void;
}

const BalanceTable = ({ categories, selectedCategory, selectCategory }: Props): JSX.Element | null => {
  const [total, setTotal] = useState(0);
  const classes = useStyles();  

  useEffect(() => {
    setTotal(categories.reduce((acc, curr) => acc += curr.balance, 0));
  }, [categories])

  return (
    <Card className={classes.root}>
      <Typography variant="h6" className={classes.title}>Balances</Typography>
      <TableContainer className={classes.table}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Category</TableCell>
              <TableCell className={classes.valueCell}>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                className={index % 2 === 0 ? classes.darkerRow: ''}
                key={category.name}
                hover
                selected={category.id === selectedCategory?.id}
                onClick={() => selectCategory(category)}
              >
                <TableCell>{category.name}</TableCell>
                <TableCell>{roundToDecimals(category.balance, 2)}</TableCell>
              </TableRow>
            ))}
            <TableRow className={categories.length % 2 === 0 ? classes.darkerRow : ''}>
              <TableCell>Total</TableCell>
              <TableCell>{total && roundToDecimals(total, 2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default BalanceTable;