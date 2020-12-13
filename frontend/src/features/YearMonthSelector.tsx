import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import MomentUtils from '@date-io/moment';
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
    if (dateString) {
      const parsedDate: Date = new Date(dateString);
      const dateSelection = {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1
      }
      dispatch(setDateSelection(dateSelection));
    }  
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <DatePicker
          variant="inline"
          views={["month"]}
          label="Month"
          format="MMMM"
          value={selectedDate}
          onChange={handleChange}
          autoOk
        />
        <DatePicker
          className={classes.item}
          variant="inline"
          views={["year"]}
          label="Year"
          value={selectedDate}
          onChange={handleChange}
          autoOk
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default YearMonthSelector;