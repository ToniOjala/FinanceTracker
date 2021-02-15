import React from 'react'
import { Pagination } from '@material-ui/lab'

interface Props {
  balanceLogCount: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const BalanceLogPagination = ({ balanceLogCount, onChange }: Props) => {
  return (
    <Pagination
      disabled={balanceLogCount <= 10}
      count={Math.floor((balanceLogCount - 1) / 10 + 1)}
      variant="outlined"
      onChange={onChange}
    />
  )
}

export default BalanceLogPagination
