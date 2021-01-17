import React from 'react'
import { Pagination } from '@material-ui/lab'

interface Props {
  disabled: boolean;
}

const BalanceLogPagination = ({ disabled }: Props) => {
  return (
    <Pagination
      disabled={disabled}
      count={10}
      variant="outlined"
    />
  )
}

export default BalanceLogPagination
