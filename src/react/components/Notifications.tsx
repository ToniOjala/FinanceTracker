import { Badge, IconButton, makeStyles, Popover, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Notification } from '../../shared/types'
import { AlarmIcon } from './icons'

const useStyles = makeStyles({
  root: {
    marginRight: '50px',
  },  
  notification: {
    padding: '20px',
  }
})

interface Props {
  notifications: Notification[];
}

const Notifications = ({ notifications }: Props) => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [numUnread, setNumUnread] = useState(0);

  useEffect(() => {
    let total = 0;
    notifications.forEach(n => {
      if (!n.read) total++;
    })
    setNumUnread(total);
  }, [notifications])

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
        {notifications.map(notification => (
          <Typography className={classes.notification}>{notification.message}</Typography>
        ))}
      </Popover>
    </div>
  )
}

export default Notifications
