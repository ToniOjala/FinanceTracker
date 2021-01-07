import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectIsDateSelectionShown, setSelectedDate } from '../slices/dateSelection';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    marginLeft: "70%"
  },
})

const YearMonthSelector = (): JSX.Element | null => {
  const selectedDate = useSelector(selectDate);
  const isComponentShown = useSelector(selectIsDateSelectionShown);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (date: ParsableDate) => {
    const dateString = date?.toLocaleString();
    if (dateString) dispatch(setSelectedDate(dateString));
  }

  if (!isComponentShown) return null;

  return (
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
  )
}

export default YearMonthSelector;