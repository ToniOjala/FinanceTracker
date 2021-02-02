import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { Category } from '../../../shared/types';
import { roundToDecimals } from '../../utils/round';
import { months } from './constants'
import { YearlyData } from '../../types';

const useStyles = makeStyles({
  categoryCell: {
    width: '10%',
  },
  monthCell: {
    width: '7.5%',
  }
})

interface Props {
  title: string,
  categories: Category[],
  yearlyData: YearlyData
}

const CategoryTable = ({ title, categories, yearlyData }: Props): JSX.Element | null => {
  const classes = useStyles();

  if (!yearlyData || !categories) return null;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.categoryCell}>{title}</TableCell>
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
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable
