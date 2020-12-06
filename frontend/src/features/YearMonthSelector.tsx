import React, { useState } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    marginLeft: "60%",
    display: "flex"
  }
})

const YearMonthSelector = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<ParsableDate>(moment().format());

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.root}>
        <DatePicker
          variant="inline"
          views={["month"]}
          label="Month"
          format="MMMM"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <DatePicker
          className={classes.root}
          variant="inline"
          views={["year"]}
          label="Year"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default YearMonthSelector
