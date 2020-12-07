import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import MonthView from './features/MonthView';
import YearMonthSelector from './features/YearMonthSelector';
import YearView from './features/YearView';
import { YearMonth } from './types';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#CBD0C9',
      main: '#69927B',
    },
    background: {
      paper: '#424242',
      default: '#303030'
    }
  }
})

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  }
})

const App = (): JSX.Element | null => {
  const [yearMonth, setYearMonth] = useState<YearMonth>({ year: moment().year(), month: moment().month() + 1 });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <SideNav />
          <main className={classes.content}>
            <YearMonthSelector setYearMonth={setYearMonth} />
              <Switch>
                <Route path="/year">
                  <YearView yearMonth={yearMonth} />
                </Route>
                <Route path="/">
                  <MonthView yearMonth={yearMonth} />
                </Route>
              </Switch>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App;
