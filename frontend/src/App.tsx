import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoriesView from './features/CategoriesView';
import TransactionsList from './features/TransactionsList';

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

const App = (): JSX.Element | null => {


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/categories/:category">
              <TransactionsList />
            </Route>
            <Route path="/">
              <CategoriesView />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App;
