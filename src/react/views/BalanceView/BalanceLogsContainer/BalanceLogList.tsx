import { createStyles, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UpdateIcon from '@material-ui/icons/Update';
import React from 'react'
import { BalanceLog } from '../../../../shared/types'
import { formatDate } from '../../../utils/format';

interface Props {
  balanceLogs: BalanceLog[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

const BalanceLogList = ({ balanceLogs }: Props) => {
  const classes = useStyles();

  function generateText(balanceLog: BalanceLog) {
    const date = formatDate(balanceLog.date);
    switch (balanceLog.reason) {
      case 'add':
        return `${date} Added an ${balanceLog.type} of ${balanceLog.amount}`;
      case 'remove':
        return `${date}: Removed an ${balanceLog.type} of ${balanceLog.amount}`;
      case 'update':
        return `${date}: Updated an ${balanceLog.type} by ${balanceLog.amount}`;
    }
  }

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" className={classes.title}>
        Logs
      </Typography>
      <div className={classes.demo}>
        <List dense>
          {balanceLogs.map(bl => 
            <ListItem key={bl.id}>
              <ListItemIcon>
                {bl.reason === 'add' && <AddIcon />}
                {bl.reason === 'remove' && <RemoveIcon />}
                {bl.reason === 'update' && <UpdateIcon />}
              </ListItemIcon>
              <ListItemText
                primary={generateText(bl)}
              />
            </ListItem>,
          )}
        </List>
      </div>
    </Grid>
  )
}

export default BalanceLogList
