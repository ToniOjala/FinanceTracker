import React from 'react'
import { Pagination } from '@material-ui/lab'

interface Props {
  disabled: boolean;
  balanceLogCount: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const BalanceLogPagination = ({ disabled, balanceLogCount, onChange }: Props) => {
  return (
    <Pagination
      disabled={disabled}
      count={Math.floor(balanceLogCount / 20 + 1)}
      variant="outlined"
      onChange={onChange}
    />
  )
}

export default BalanceLogPagination
