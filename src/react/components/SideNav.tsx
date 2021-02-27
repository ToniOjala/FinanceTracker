import { Box, Button, Drawer, makeStyles, Typography, Toolbar } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom';
import { BalancesIcon, MonthIcon, RecurringIcon, SettingsIcon, YearIcon } from './icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: 80,
    flexShrink: 0,
    textDecoration: 'none',
    textAlign: 'center',
    padding: 0,
  },
  drawerPaper: {
    width: 80,
    border: 'none',
  },
  link: {
    textDecoration: 'none',
    margin: 0,
  },
  activeLink: {
    '& button': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.main,
      borderLeft: '2px solid',
      borderColor: theme.palette.primary.main,
    }
  },
  button: {
    width: '100%',
    padding: '20px 0',
    margin: 0,
  },
  buttonText: {
    marginTop: '5px',
  }
}))

interface NavButton {
  link: string;
  title: string;
  icon: JSX.Element | null;
}

const SideNav = (): JSX.Element => {
  const classes = useStyles();

  const buttons: NavButton[] = [
    { link: '/month', title: 'Month', icon: <MonthIcon /> },
    { link: '/year', title: 'Year', icon: <YearIcon /> },
    { link: '/recurring', title: 'Recurring', icon: <RecurringIcon /> },
    { link: '/balance', title: 'Balances', icon: <BalancesIcon /> },
    { link: '/settings', title: 'Settings', icon: <SettingsIcon /> },
  ]

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{ paper: classes.drawerPaper}}
      anchor="left"
    >
      <Toolbar variant="dense" />
      {buttons.map(button => (
        <NavLink key={button.title} to={button.link} className={classes.link} activeClassName={classes.activeLink}>
          <Button className={classes.button}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyItems="space-between">
              {button.icon}
              <Typography className={classes.buttonText} variant="caption">{button.title}</Typography>
            </Box>
          </Button>
        </NavLink>
      ))}
    </Drawer>
  )
}

export default SideNav
