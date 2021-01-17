import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../shared/types'
import { fetchBalanceLogs, selectBalanceLogs, selectBalanceLogCount, fetchBalanceLogCount } from '../../../slices/balanceLogs'
import BalanceLogList from './BalanceLogList'
import BalanceLogPagination from './BalanceLogPagination'

interface Props {
  classes: Record<'logsContainer' | 'title' | 'list', string>
  category: Category | null;
}

const BalanceLogsContainer = ({ classes, category }: Props): JSX.Element | null => {
  const dispatch = useDispatch();
  const balanceLogs = useSelector(selectBalanceLogs);
  const balanceLogCount = useSelector(selectBalanceLogCount);

  useEffect(() => {
    if (category) {
      dispatch(fetchBalanceLogs(category.id))
      dispatch(fetchBalanceLogCount(category.id));
    }
  }, [category]);

  return (
    <div className={classes.logsContainer}>
      <Typography variant="h6" className={classes.title}>Logs</Typography>
      <BalanceLogList
        className={classes.list}
        balanceLogs={balanceLogs}
      />
      <BalanceLogPagination
        disabled={!balanceLogs || balanceLogs.length === 0}
        balanceLogCount={balanceLogCount}
      />
    </div>
  )
}

export default BalanceLogsContainer
