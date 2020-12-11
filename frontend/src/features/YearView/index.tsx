import React from 'react'
import CategoryTable from './CategoryTable'

const YearView = (): JSX.Element => {
  return (
    <>
      <CategoryTable title="Income" />
      <CategoryTable title="Expense" />
    </>
  )
}

export default YearView
