import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import moment from 'moment';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoriesView from './features/CategoriesView';
import YearMonthSelector from './features/YearMonthSelector';

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
  const [selectedDate, setSelectedDate] = useState<ParsableDate>(moment().format());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YearMonthSelector 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Router>
        <Switch>
          <Route path="/">
            <CategoriesView
              date={selectedDate}
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
