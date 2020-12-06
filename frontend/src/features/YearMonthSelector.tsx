import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    marginLeft: "70%"
  },
  item: {
    marginLeft: '20px'
  }
})

interface YearMonthProps {
  selectedDate: ParsableDate,
  setSelectedDate: (date: ParsableDate) => void
}

const YearMonthSelector = ({ selectedDate, setSelectedDate }: YearMonthProps): JSX.Element => {
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
          autoOk
        />
        <DatePicker
          className={classes.item}
          variant="inline"
          views={["year"]}
          label="Year"
          value={selectedDate}
          onChange={setSelectedDate}
          autoOk
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default YearMonthSelector
