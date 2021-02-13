import { Card, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { format } from 'date-fns';
import React from 'react'
import { BalanceLog } from '../../../../shared/types'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '20px',
  },
  title: {
    padding: '20px',
    backgroundColor: theme.palette.primary.dark,
  },
  list: {
    padding: '20px',
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
  removeIcon: {
    color: 'red',
  }
}));

interface Props {
  balanceLogs: BalanceLog[];
}

const BalanceLogList = ({ balanceLogs }: Props) => {

  const classes = useStyles();

  function generateText(balanceLog: BalanceLog) {
    const date = format(new Date(balanceLog.date), 'dd.MM.yy');
    return `${date} ${balanceLog.amount}`;
  }

  return (
    <Card className={classes.root}>
      <Typography variant="h6" className={classes.title}>Logs</Typography>
      <List className={classes.list} dense>
        {balanceLogs.length === 0 &&
          <ListItem>
            <ListItemText primary="No logs available" />
          </ListItem>
        }
        {balanceLogs.map(bl => 
          <ListItem key={bl.id}>
            <ListItemIcon>
              {bl.amount > 0 ? <AddIcon className={classes.addIcon} /> : <RemoveIcon className={classes.removeIcon} />}
            </ListItemIcon>
            <ListItemText
              primary={generateText(bl)}
              secondary={bl.label}
            />
          </ListItem>,
        )}
      </List>
    </Card>
  )
}

export default BalanceLogList
