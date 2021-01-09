import { Button, Drawer, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 100,
    flexShrink: 0,
    textDecoration: 'none',
    textAlign: 'center',
    padding: 0
  },
  drawerPaper: {
    width: 100
  },
  links: {
    margin: 0,
    padding: 0
  },
  button: {
    padding: '30px 0',
    margin: '0'
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
      <div className={classes.links}>
        <Link to="/month">
          <Button className={classes.button}>Month</Button>
        </Link>
        <Link to="year">
          <Button className={classes.button}>Year</Button>
        </Link>
        <Link to="/balance">
          <Button className={classes.button}>Balances</Button>
        </Link>
      </div>
    </Drawer>
  )
}

export default SideNav
