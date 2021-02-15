import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../slices/dateSelection';

const useStyles = makeStyles({
  root: {
    padding: 0,
    marginRight: '50px'
  },
  input: {
    padding: '10px 0 10px 10px',
  }
})

interface Props {
  selectedDate: string;
  dateSelectionStatus: string;
}

const YearMonthSelector = ({ selectedDate, dateSelectionStatus }: Props): JSX.Element | null => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (date: ParsableDate) => {
    const dateString = date?.toLocaleString();
    if (dateString) dispatch(setSelectedDate(dateString));
  }

  if (dateSelectionStatus === 'hidden') return null;

  return (
    <>
      {dateSelectionStatus === 'month' && 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={classes.root}
            variant="inline"
            inputVariant="outlined"
            inputProps={{ className: classes.input }}
            views={["month", "year"]}
            format="MMMM yyyy"
            value={selectedDate}
            onChange={handleChange}
            autoOk
          />
        </MuiPickersUtilsProvider>
      }

      {dateSelectionStatus === 'year' &&
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className={classes.root}
            variant="inline"
            inputVariant="outlined"
            inputProps={{ className: classes.input }}
            views={["year"]}
            format="yyyy"
            value={selectedDate}
            onChange={handleChange}
            autoOk
          />
        </MuiPickersUtilsProvider>
      }
    </>
  )
}

export default YearMonthSelector;