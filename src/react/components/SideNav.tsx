import { Button, Drawer, makeStyles, Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import BalancesIcon from './icons/BalancesIcon';
import MonthIcon from './icons/MonthIcon';
import SettingsIcon from './icons/SettingsIcon';
import YearIcon from './icons/YearIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: 100,
    flexShrink: 0,
    textDecoration: 'none',
    textAlign: 'center',
    padding: 0
  },
  drawerPaper: {
    width: 80,
  },
  link: {
    textDecoration: 'none',
    margin: 0,
  },
  activeLink: {
    '& button': {
      color: theme.palette.primary.main,
    }
  },
  button: {
    width: '100%',
    padding: '30px 0',
    margin: 0,
  }
}))

interface NavButton {
  link: string;
  title: string;
  icon: JSX.Element;
  active: boolean;
}

const navButtons: NavButton[] = [
  { link: '/month', title: 'Month', icon: <MonthIcon />, active: true },
  { link: '/year', title: 'Year', icon: <YearIcon />, active: false },
  { link: '/balance', title: 'Balances', icon: <BalancesIcon />, active: false },
  { link: '/settings', title: 'Settings', icon: <SettingsIcon />, active: false },
]

const SideNav = (): JSX.Element => {
  const [buttons, setButtons] = useState<NavButton[]>(navButtons);
  const classes = useStyles();

  function activate(buttonToActivate: NavButton) {
    const newButtons = [...buttons];
    newButtons.forEach(button => {
      if (button.title === buttonToActivate.title) button.active = true;
      else button.active = false;
    })

    console.log(newButtons);
    setButtons(newButtons);
  }

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{ paper: classes.drawerPaper}}
      anchor="left"
    >
      {buttons.map(button => (
        <Tooltip title={button.title} placement="right" arrow>
          <NavLink to={button.link} className={classes.link} activeClassName={classes.activeLink}>
            <Button className={classes.button}>{button.icon}</Button>
          </NavLink>
        </Tooltip>
      ))}
    </Drawer>
  )
}

export default SideNav
