import { Paper, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, Grid } from '@material-ui/core'
import CustomIcon from '../../../components/CustomIcon';
import { format } from 'date-fns';
import React from 'react'
import { BalanceLog } from '../../../../shared/types'
import { roundToDecimals } from '../../../utils/round';

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
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ListItemIcon>
                  {bl.amount > 0 ? <CustomIcon icon="plus" color="primary" /> : <CustomIcon icon="minus" color="secondary" />}
                </ListItemIcon>
              </Grid>
              <Grid item xs={7}>
                <ListItemText
                  primary={format(new Date(bl.date), 'dd.MM.yy')}
                  secondary={bl.label}
                />
              </Grid>
              <Grid item xs={4} style={{ textAlign: 'center' }}>
                <ListItemText primary={roundToDecimals(bl.amount, 2)} primaryTypographyProps={{ variant: "h6" }} />
              </Grid>
            </Grid>
          </ListItem>,
        )}
      </List>
    </Paper>
  )
}

export default BalanceLogList
