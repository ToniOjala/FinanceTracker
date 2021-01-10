import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectExpenseCategories, selectIncomeCategories } from '../../slices/categories'
import { selectYear, setDateSelectionStatus } from '../../slices/dateSelection'
import { fetchYearlyData } from '../../slices/transactions'
import CategoryTable from './CategoryTable'

const YearView = (): JSX.Element => {
  const dispatch = useDispatch();
  const year = useSelector(selectYear);
  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);

  useEffect(() => {
    dispatch(setDateSelectionStatus('year'));
  }, []);

  useEffect(() => {
    dispatch(fetchYearlyData(year));
  }, [year]);

  return (
    <>
      <CategoryTable title="Income" categories={incomeCategories} />
      <CategoryTable title="Expense" categories={expenseCategories} />
    </>
  )
}

export default YearView
