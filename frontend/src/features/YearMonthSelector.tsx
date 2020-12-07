import React, { useState } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { YearMonth } from '../types';

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
  setYearMonth: (yearMonth: YearMonth) => void
}

const YearMonthSelector = ({ setYearMonth }: YearMonthProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<ParsableDate>(moment().format());

  const classes = useStyles();

  const handleChange = (date: ParsableDate) => {
    setSelectedDate(date);
    const dateString = date?.toLocaleString();
    if (dateString) {
      const parsedDate = new Date(dateString);
      const yearMonth = { year: parsedDate.getFullYear(), month: parsedDate.getMonth() + 1 }
      setYearMonth(yearMonth);
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

export default YearMonthSelector
