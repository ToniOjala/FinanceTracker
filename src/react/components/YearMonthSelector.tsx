import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../slices/dateSelection';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    marginLeft: "70%"
  },
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
            views={["month", "year"]}
            label="Month/Year"
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
            views={["year"]}
            label="Year"
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