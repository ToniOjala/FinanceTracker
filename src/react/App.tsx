import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import BalanceView from './views/balanceView/BalanceView';
import MonthView from './views/monthView/MonthView';
import YearView from './views/yearView/YearView';
import SettingsView from './views/settingsView/SettingsView';
import { theme } from './theme';
import TitleBar from './components/TitleBar';
import './App.css';
import RecurringView from './views/recurringView/RecurringView';
import { useDispatch, batch } from 'react-redux';
import { fetchNotifications } from './slices/notifications';
import { fetchCategories } from './slices/categories';
import { fetchRecurringExpenses } from './slices/recurringExpenses';
  
const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%'
  },
  content: {
    width: '100%',
  },
})

const App = (): JSX.Element | null => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(fetchCategories());
      dispatch(fetchNotifications());
      dispatch(fetchRecurringExpenses());
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <TitleBar />
        <Router>
          <SideNav />
          <main className={classes.content}>
            <Switch>
              <Route path="/year" component={YearView} />
              <Route path="/recurring" component={RecurringView} />
              <Route path="/balance" component={BalanceView} />
              <Route path="/settings" component={SettingsView} />
              <Route path="/" component={MonthView} />
            </Switch>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App;
