import { Button, Drawer, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';

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
      <Link to="/"><Button>Month</Button></Link>
      <Link to="year"><Button>Year</Button></Link>
    </Drawer>
  )
}

export default SideNav
