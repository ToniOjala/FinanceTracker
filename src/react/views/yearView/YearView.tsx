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
    <>
      <YearTable
        title="Income"
        categories={incomeCategories}
        yearlyData={yearlyData}
      />
      <YearTable
        title="Expense"
        categories={expenseCategories}
        yearlyData={yearlyData}
      />
    </>
  )
}

export default YearView
