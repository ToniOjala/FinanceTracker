import React from 'react'
import { YearMonth } from '../../types'
import CategoryTable from './CategoryTable'

interface Props {
  yearMonth: YearMonth
}

const YearView = ({ yearMonth }: Props) => {
  return (
    <>
      <CategoryTable title="Income" />
      <CategoryTable title="Expense" />
    </>
  )
}

export default YearView
