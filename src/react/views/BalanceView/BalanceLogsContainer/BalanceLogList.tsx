import { Paper, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'
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
    padding: 0,
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
  removeIcon: {
    color: theme.palette.secondary.main,
  },
  listItem: {
    padding: '5px 0 5px 20px',
  },
  darkerListItem: {
    backgroundColor: theme.palette.background.default,
  },
}));

interface Props {
  balanceLogs: BalanceLog[];
}

const BalanceLogList = ({ balanceLogs }: Props) => {

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={6}>
      <Typography variant="h6" className={classes.title}>Logs</Typography>
      <List className={classes.list} dense>
        {balanceLogs.length === 0 &&
          <ListItem className={classes.listItem}>
            <ListItemText primary="No logs available" />
          </ListItem> 
        }
        {balanceLogs.map((bl, index) => 
          <ListItem className={`${classes.listItem} ${index % 2 === 1 && classes.darkerListItem}`} key={bl.id}>
            <ListItemIcon>
              {bl.amount > 0 ? <AddIcon className={classes.addIcon} /> : <RemoveIcon className={classes.removeIcon} />}
            </ListItemIcon>
            <ListItemText
              primary={format(new Date(bl.date), 'dd.MM.yy')}
              secondary={bl.label}
            />
            <ListItemText primary={bl.amount} primaryTypographyProps={{ variant: "h6" }} />
          </ListItem>,
        )}
      </List>
    </Paper>
  )
}

export default BalanceLogList
