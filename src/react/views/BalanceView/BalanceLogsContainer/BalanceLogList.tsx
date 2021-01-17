import { createStyles, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import React from 'react'
import { BalanceLog } from '../../../../shared/types'

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
    const text = `${balanceLog.reason}ed ${balanceLog.type} of ${balanceLog.amount} on ${balanceLog.date}`;
    return text;
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
                <FolderIcon />
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
