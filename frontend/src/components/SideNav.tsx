import { Button, Drawer, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  root: {
    width: 100,
    flexShrink: 0
  },
  drawerPaper: {
    width: 100
  }
})

const SideNav = (): JSX.Element => {
  const classes = useStyles();
  
  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{ paper: classes.drawerPaper}}
      anchor="left"
    >
      <Button>Month</Button>
      <Button>Year</Button>
    </Drawer>
  )
}

export default SideNav
