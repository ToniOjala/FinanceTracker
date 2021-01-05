import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, setDateSelection } from '../slices/dateSelection';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    marginLeft: "70%"
  },
  item: {
    marginLeft: '20px'
  }
})

const YearMonthSelector = (): JSX.Element => {
  const selectedDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (date: ParsableDate) => {
    const dateString = date?.toLocaleString();
    console.log('dateString: ', dateString);
    if (dateString) dispatch(setDateSelection(dateString));
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <DatePicker
          variant="inline"
          views={["month", "year"]}
          label="Month/Year"
          format="MMMM yyyy"
          value={selectedDate}
          onChange={handleChange}
          autoOk
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default YearMonthSelector;