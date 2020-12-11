import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import MonthView from './features/MonthView';
import YearMonthSelector from './features/YearMonthSelector';
import YearView from './features/YearView';

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
