import React from 'react'
import { Pagination } from '@material-ui/lab'

interface Props {
  disabled: boolean;
  balanceLogCount: number;
}

const BalanceLogPagination = ({ disabled, balanceLogCount }: Props) => {
  return (
    <Pagination
      disabled={disabled}
      count={Math.floor(balanceLogCount / 20 + 1)}
      variant="outlined"
    />
  )
}

export default BalanceLogPagination
