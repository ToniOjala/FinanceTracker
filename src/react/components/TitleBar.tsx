import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { remote } from 'electron'
import MinimizeIcon from './icons/MinimizeIcon'
import MaximizeIcon from './icons/MaximizeIcon'
import CloseIcon from './icons/CloseIcon'
import UnmaximizeIcon from './icons/UnmaximizeIcon'

const window = remote.getCurrentWindow();

const useStyles = makeStyles(theme => ({
  titleBar: {
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

  const minimize = () => window.minimize();
  const toggleMaximize = () => {
    window.isMaximized() ? window.unmaximize() : window.maximize();
    setIsMaximized(window.isMaximized());
  }
  const close = () => window.close();

  return (
    <AppBar position="fixed" className={classes.titleBar}>
      <Toolbar variant="dense" className={classes.toolBar}>
        <Typography variant="subtitle1">Finance Tracker</Typography>
        <div>
          <IconButton onClick={minimize}><MinimizeIcon /></IconButton>
          <IconButton onClick={toggleMaximize}>{isMaximized ? <UnmaximizeIcon /> : <MaximizeIcon />}</IconButton>
          <IconButton onClick={close}><CloseIcon /></IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
