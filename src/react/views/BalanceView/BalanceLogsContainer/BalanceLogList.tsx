import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { format } from 'date-fns';
import React from 'react'
import { BalanceLog } from '../../../../shared/types'

interface Props {
  className: string;
  balanceLogs: BalanceLog[];
}

const BalanceLogList = ({ className, balanceLogs }: Props) => {

  function generateText(balanceLog: BalanceLog) {
    const date = format(new Date(balanceLog.date), 'dd.MM.yy');
    return `${date} ${balanceLog.amount}`;
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
                {bl.amount > 0 ? <AddIcon /> : <RemoveIcon />}
              </ListItemIcon>
              <ListItemText
                primary={generateText(bl)}
                secondary={bl.label}
              />
            </ListItem>,
          )}
        </List>
      </div>
    </div>
  )
}

export default BalanceLogList
