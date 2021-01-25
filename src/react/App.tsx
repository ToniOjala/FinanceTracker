import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import BalanceView from './views/BalanceView';
import MonthView from './views/MonthView';
import YearMonthSelector from './components/YearMonthSelector';
import YearView from './views/YearView';
import { theme } from './theme';
import SettingsView from './views/SettingsView';
import { useSelector } from 'react-redux';
import { selectDate, selectDateSelectionStatus } from './slices/dateSelection';

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

  const selectedDate = useSelector(selectDate);
  const dateSelectionStatus = useSelector(selectDateSelectionStatus);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <SideNav />
          <main className={classes.content}>
            <YearMonthSelector 
              selectedDate={selectedDate}
              dateSelectionStatus={dateSelectionStatus}
            />
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
