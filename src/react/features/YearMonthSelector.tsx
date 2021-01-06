import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, setSelectedDate } from '../slices/dateSelection';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    marginLeft: "70%"
  },
})

const YearMonthSelector = (): JSX.Element => {
  const selectedDate = useSelector(selectDate);
  console.log('selectedDate: ', selectedDate);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (date: ParsableDate) => {
    const dateString = date?.toLocaleString();
    console.log('dateString: ', dateString);
    if (dateString) dispatch(setSelectedDate(dateString));
  }

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