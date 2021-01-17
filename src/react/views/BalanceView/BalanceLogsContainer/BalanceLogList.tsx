import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UpdateIcon from '@material-ui/icons/Update';
import React from 'react'
import { BalanceLog } from '../../../../shared/types'
import { formatDate } from '../../../utils/format';

interface Props {
  className: string;
  balanceLogs: BalanceLog[];
}

const BalanceLogList = ({ className, balanceLogs }: Props) => {

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
    <div>
      <div className={className}>
        <List dense>
          {balanceLogs.length === 0 &&
            <ListItem>
              <ListItemText primary="No logs available" />
            </ListItem>
          }
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
    </div>
  )
}

export default BalanceLogList
