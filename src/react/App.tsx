import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import BalanceView from './features/BalanceView';
import MonthView from './features/MonthView';
import YearMonthSelector from './features/YearMonthSelector';
import YearView from './features/YearView';
import { theme } from './theme';

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
