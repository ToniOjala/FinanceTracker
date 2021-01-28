import { Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { Transaction } from '../../../../shared/types';
import { format } from 'date-fns';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    marginBottom: '20px',
  },
  table: {
    marginTop: '20px',
    marginBottom: '20px'
  }
})

interface Props {
  transactions: Transaction[];
  title: string;
  selectedTransaction: Transaction | null;
  selectTransaction: (transaction: Transaction) => void;
}

const TransactionTable = ({ transactions, title, selectedTransaction, selectTransaction }: Props): JSX.Element | null => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Typography variant="h6">{title}</Typography>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow
                  key={transaction.id}
                  hover
                  selected={transaction === selectedTransaction}
                  onClick={() => selectTransaction(transaction)}
                >
                  <TableCell component="th" scope="row">
                    {format(new Date(transaction.date), 'dd.MM.yy')}
                  </TableCell>
                  <TableCell>{transaction.label}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default TransactionTable;