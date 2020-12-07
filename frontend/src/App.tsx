import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoriesView from './features/CategoriesView';
import YearMonthSelector from './features/YearMonthSelector';
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

const App = (): JSX.Element | null => {
  const [yearMonth, setYearMonth] = useState<YearMonth>({ year: moment().year(), month: moment().month() + 1 });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YearMonthSelector 
        setYearMonth={setYearMonth}
      />
      <Router>
        <Switch>
          <Route path="/">
            <CategoriesView
              yearMonth={yearMonth}
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
