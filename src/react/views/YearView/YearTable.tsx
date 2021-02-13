import { Card, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../shared/types';
import { roundToDecimals } from '../../utils/round';
import { months } from './constants'
import { YearlyData } from '../../types';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    maxWidth: '1400px'
  },
  title: {
    marginBottom: '20px'
  },
  categoryCell: {
    width: '10%',
    color: '#AAAAAA',
  },
  monthCell: {
    width: '7.5%',
    color: '#AAAAAA',
  }
})

interface Props {
  title: 'Income' | 'Expense',
  categories: Category[],
  yearlyData: YearlyData
}

const YearTable = ({ title, categories, yearlyData }: Props): JSX.Element | null => {
  const classes = useStyles();

  if (!yearlyData || !categories) return null;

  return (
    <Card className={classes.root}>
      <Typography variant="h6" className={classes.title}>{title}</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.categoryCell}>Category</TableCell>
              {months.map(month => 
                <TableCell key={`${title}${month}`} className={classes.monthCell}>{month}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.name} hover>
                <TableCell>{category.name}</TableCell>
                {yearlyData[category.name]?.map((monthlyValues, index) => 
                  <TableCell key={`${category.name}_${index}`}>{roundToDecimals(monthlyValues, 2)}</TableCell>
                )}
              </TableRow>
            ))}
            <TableRow hover>
              <TableCell>Total</TableCell>
              {months.map((monthName, index) => 
                title === 'Expense' 
                  ? <TableCell key={`ExpenseTotal_${index}`}>{yearlyData.expenseTotal && roundToDecimals(yearlyData.expenseTotal[index], 2)}</TableCell>
                  : <TableCell key={`IncomeTotal_${index}`}>{yearlyData.incomeTotal && roundToDecimals(yearlyData.incomeTotal[index], 2)}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default YearTable
