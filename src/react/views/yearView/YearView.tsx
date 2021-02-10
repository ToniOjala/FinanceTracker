import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { selectYear, setDateSelectionStatus } from '../../slices/dateSelection'
import { fetchYearlyData, selectYearlyData } from '../../slices/transactions'
import YearTable from './YearTable'

const YearView = (): JSX.Element => {
  const dispatch = useDispatch();
  const year = useSelector(selectYear);
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const yearlyData = useSelector(selectYearlyData);

  useEffect(() => {
    dispatch(setDateSelectionStatus('year'));
  }, []);

  useEffect(() => {
    dispatch(fetchYearlyData(year));
  }, [year]);

  return (
    <Grid
      container
      spacing={6}
      direction="column"
      alignContent="center"
      style={{ width: '100%', margin: 0 }}
    >
      <Grid item>
        <YearTable
          title="Income"
          categories={incomeCategories}
          yearlyData={yearlyData}
        />
      </Grid>
      <Grid item>
        <YearTable
          title="Expense"
          categories={expenseCategories}
          yearlyData={yearlyData}
        />
      </Grid>
    </Grid>
  )
}

export default YearView
