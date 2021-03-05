import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { remote } from 'electron'
import CustomIcon from './CustomIcon';
import './TitleBar.css'
import { Notification } from '../../shared/types';
import YearMonthSelector from './YearMonthSelector'
import { useDispatch, useSelector } from 'react-redux'
import { selectDate, selectDateSelectionStatus } from '../slices/dateSelection'
import { selectNotifications, updateNotification } from '../slices/notifications';
import Notifications from './Notifications'

const window = remote.getCurrentWindow();

const useStyles = makeStyles(theme => ({
  titleBar: {
    padding: '2px',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
  }
}))

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(window.isMaximized());
  
  const classes = useStyles();
  const selectedDate = useSelector(selectDate);
  const dateSelectionStatus = useSelector(selectDateSelectionStatus);
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const minimize = () => window.minimize();
  const toggleMaximize = () => {
    window.isMaximized() ? window.unmaximize() : window.maximize();
    setIsMaximized(window.isMaximized());
  }
  const close = () => window.close();

  function markNotificationRead(notification: Notification) {
    dispatch(updateNotification({ ...notification, read: 1 }));
  }

  return (
    <AppBar position="fixed" elevation={0} className={classes.titleBar}>
      <Toolbar id="titlebar" variant="dense" className={classes.toolBar}>
        <Typography variant="subtitle1">Finance Tracker</Typography>
        <div className={classes.actions}>
          <YearMonthSelector selectedDate={selectedDate} dateSelectionStatus={dateSelectionStatus} />
          <Notifications notifications={notifications} markNotificationRead={markNotificationRead} />
          <IconButton onClick={minimize}><CustomIcon icon="minimize" /></IconButton>
          <IconButton onClick={toggleMaximize}>{isMaximized ? <CustomIcon icon="unmaximize" /> : <CustomIcon icon="maximize" />}</IconButton>
          <IconButton onClick={close}><CustomIcon icon="close" /></IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
