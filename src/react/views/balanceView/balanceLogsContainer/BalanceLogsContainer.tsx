import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../shared/types'
import { fetchBalanceLogs, selectBalanceLogs, selectBalanceLogCount, fetchBalanceLogCount, clearBalanceLogs } from '../../../slices/balanceLogs'
import BalanceLogList from './BalanceLogList'
import BalanceLogPagination from './BalanceLogPagination'

interface Props {
  category: Category | null;
}

const BalanceLogsContainer = ({ category }: Props): JSX.Element | null => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const balanceLogs = useSelector(selectBalanceLogs);
  const balanceLogCount = useSelector(selectBalanceLogCount);

  useEffect(() => {
    if (category) {
      dispatch(fetchBalanceLogs(category.id, currentPage))
      dispatch(fetchBalanceLogCount(category.id));
    } else {
      dispatch(clearBalanceLogs());
    }
  }, [category, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }

  return (
    <div>
      <BalanceLogList 
        balanceLogs={balanceLogs}
      />
      <BalanceLogPagination
        balanceLogCount={balanceLogCount}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default BalanceLogsContainer
