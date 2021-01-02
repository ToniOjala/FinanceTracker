import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectYearlyData } from '../../slices/transactions';
import { Category } from '../../../shared/types';
import { roundToDecimals } from '../../utils/round';
import { months } from './constants'

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
  categories: Category[]
}

const CategoryTable = ({ title, categories }: Props): JSX.Element | null => {
  const yearlyData = useSelector(selectYearlyData);
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
