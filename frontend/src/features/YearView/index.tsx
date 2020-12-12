import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectYear } from '../../slices/dateSelection'
import { fetchSumsByCategory } from '../../slices/transactions'
import CategoryTable from './CategoryTable'

const YearView = (): JSX.Element => {
  const dispatch = useDispatch();
  const year = useSelector(selectYear);

  useEffect(() => {
    dispatch(fetchSumsByCategory(year));
  }, [year]);

  return (
    <>
      <CategoryTable title="Income" />
      <CategoryTable title="Expense" />
    </>
  )
}

export default YearView
