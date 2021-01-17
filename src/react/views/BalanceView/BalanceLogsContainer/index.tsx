import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../shared/types'
import { fetchBalanceLogs, selectBalanceLogs } from '../../../slices/balanceLogs'
import BalanceLogList from './BalanceLogList'
import BalanceLogPagination from './BalanceLogPagination'

interface Props {
  category: Category | null;
}

const BalanceLogsContainer = ({ category }: Props): JSX.Element | null => {
  if (!category) return null;

  const dispatch = useDispatch();
  const balanceLogs = useSelector(selectBalanceLogs);

  useEffect(() => {
    dispatch(fetchBalanceLogs(category.id))
  }, [category]);

  return (
    <>
      <BalanceLogList
        balanceLogs={balanceLogs}
      />
      <BalanceLogPagination />
    </>
  )
}

export default BalanceLogsContainer
