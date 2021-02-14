import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import BalanceView from './views/balanceView/BalanceView';
import MonthView from './views/monthView/MonthView';
import YearView from './views/yearView/YearView';
import SettingsView from './views/settingsView/SettingsView';
import YearMonthSelector from './components/YearMonthSelector';
import { theme } from './theme';
import { useSelector } from 'react-redux';
import { selectDate, selectDateSelectionStatus } from './slices/dateSelection';
import TitleBar from './components/TitleBar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%'
  },
  content: {
    width: '100%'
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
        <TitleBar />
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
