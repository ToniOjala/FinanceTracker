import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../rootReducer'
import { fetchTransactionsOfYear } from '../../slices/transactions'
import CategoryTable from './CategoryTable'

const YearView = (): JSX.Element => {
  const dispatch = useDispatch();
  const yearMonth = useSelector((state: RootState) => state.dateSelection.yearMonth);
  const categories = useSelector((state: RootState) => state.categories);
  const transactions = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactionsOfYear(yearMonth.year));
  }, [yearMonth]);

  return (
    <>
      <CategoryTable title="Income" />
      <CategoryTable title="Expense" />
    </>
  )
}

export default YearView
