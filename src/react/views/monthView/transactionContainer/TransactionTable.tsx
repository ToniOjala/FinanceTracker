import { Card, makeStyles, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Typography, Paper } from '@material-ui/core';
import React from 'react';
import { Transaction } from '../../../../shared/types';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '20px',
  },
  title: {
    padding: '20px', 
    backgroundColor: theme.palette.primary.dark,
  },
  table: {
    padding: '20px',
  },
  headerCell: {
    color: theme.palette.text.secondary
  },
  darkerRow: {
    backgroundColor: theme.palette.background.default,
  }
}))

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
      <Paper className={classes.root} elevation={6}>
        <Typography variant="h6" className={classes.title}>{title}</Typography>
        <TableContainer className={classes.table}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>Date</TableCell>
                <TableCell className={classes.headerCell}>Label</TableCell>
                <TableCell className={classes.headerCell}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  className={index % 2 === 0 ? classes.darkerRow : ''}
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
      </Paper>
    </>
  )
}

export default TransactionTable;