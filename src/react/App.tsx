import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import BalanceView from './views/BalanceView';
import MonthView from './views/MonthView';
import YearMonthSelector from './features/YearMonthSelector';
import YearView from './views/YearView';
import { theme } from './theme';
import SettingsView from './views/SettingsView';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  }
})

const App = (): JSX.Element | null => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <SideNav />
          <main className={classes.content}>
            <YearMonthSelector />
            <Switch>
              <Route path="/settings">
                <SettingsView />
              </Route>
              <Route path="/balance">
                <BalanceView />
              </Route>
              <Route path="/year">
                <YearView />
              </Route>
              <Route path="/">
                <MonthView />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App;
