import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../shared/types'
import { fetchBalanceLogs, selectBalanceLogs } from '../../../slices/balanceLogs'
import BalanceLogList from './BalanceLogList'
import BalanceLogPagination from './BalanceLogPagination'

interface Props {
  classes: Record<'logsContainer' | 'title' | 'list', string>
  category: Category | null;
}

const BalanceLogsContainer = ({ classes, category }: Props): JSX.Element | null => {
  const dispatch = useDispatch();
  const balanceLogs = useSelector(selectBalanceLogs);

  useEffect(() => {
    if (category) dispatch(fetchBalanceLogs(category.id))
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
      />
    </div>
  )
}

export default BalanceLogsContainer
