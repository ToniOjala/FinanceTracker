import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { remote } from 'electron'
import { MinimizeIcon, MaximizeIcon, CloseIcon, UnmaximizeIcon } from './icons'
import './TitleBar.css'
import YearMonthSelector from './YearMonthSelector'
import { useSelector } from 'react-redux'
import { selectDate, selectDateSelectionStatus } from '../slices/dateSelection'

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
  button: {
    padding: '2px',
  }
}))

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(window.isMaximized());
  
  const classes = useStyles();
  const selectedDate = useSelector(selectDate);
  const dateSelectionStatus = useSelector(selectDateSelectionStatus);

  const minimize = () => window.minimize();
  const toggleMaximize = () => {
    window.isMaximized() ? window.unmaximize() : window.maximize();
    setIsMaximized(window.isMaximized());
  }
  const close = () => window.close();

  return (
    <AppBar position="fixed" elevation={0} className={classes.titleBar}>
      <Toolbar id="titlebar" variant="dense" className={classes.toolBar}>
        <Typography variant="subtitle1">Finance Tracker</Typography>
        <div>
          <YearMonthSelector selectedDate={selectedDate} dateSelectionStatus={dateSelectionStatus} />
          <IconButton onClick={minimize}><MinimizeIcon /></IconButton>
          <IconButton onClick={toggleMaximize}>{isMaximized ? <UnmaximizeIcon /> : <MaximizeIcon />}</IconButton>
          <IconButton onClick={close}><CloseIcon /></IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
