import { Badge, Divider, Grid, IconButton, makeStyles, Popover, Tooltip, Typography } from '@material-ui/core'
import { formatRelative } from 'date-fns'
import { formatDistanceToNowStrict } from 'date-fns/esm'
import React, { useEffect, useState } from 'react'
import { Notification } from '../../shared/types'
import { AlarmIcon } from './icons'

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: '50px',
  },
  notificationBox: {
    width: '350px',
    padding: '10px',
    '&:hover': {
      backgroundColor: '#242A43',
    }
  },
}))

interface Props {
  notifications: Notification[];
  markNotificationRead: (notification: Notification) => void;
}

const Notifications = ({ notifications, markNotificationRead }: Props) => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [numUnread, setNumUnread] = useState(0);

  useEffect(() => {
    let total = 0;
    notifications.forEach(n => {
      if (!n.read) total++;
    })
    setNumUnread(total);
  }, [notifications])

  function getRelativeFormat(date: string) {
    const relativeSplit = formatRelative(new Date(date), new Date(), { weekStartsOn: 1 }).split(' ');
    if (relativeSplit[1] === 'at') return relativeSplit[0];
    return formatDistanceToNowStrict(new Date(date)) + ' ago';
  }

  function open(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event.currentTarget)
  }

  function close() {
    setAnchorElement(null);
  }

  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <IconButton onClick={open}>
        <Badge badgeContent={numUnread} color="error"><AlarmIcon /></Badge>
      </IconButton>
      <Popover
        open={anchorElement !== null}
        anchorEl={anchorElement}
        onClose={close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {notifications.map((notification, index) => (
          <div key={notification.id}>
            <Grid className={classes.notificationBox} container alignItems="center" justify="space-between">
              <Grid item xs={11}>
                <Typography color="textSecondary" variant="caption">{getRelativeFormat(notification.date)}</Typography>
                <Typography variant={notification.read ? "body1" : "h6"}>{notification.message}</Typography>
              </Grid>
              {!notification.read &&
                <Grid item xs={1}>
                  <Tooltip title="Mark as Read">
                    <IconButton onClick={() => markNotificationRead(notification)} size="small">M</IconButton>
                  </Tooltip>
                </Grid>
              }
            </Grid>
            { index !== notifications.length - 1 && <Divider />}
          </div>
        ))}
      </Popover>
    </div>
  )
}

export default Notifications
