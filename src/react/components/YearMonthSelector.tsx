import React from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { IconButton, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../slices/dateSelection';
import { add, format, sub } from 'date-fns';
import CustomIcon from './CustomIcon';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '25px',
    marginTop: '4px',
  },
  picker: {
    padding: 0,
  },
  input: {
    padding: '8px 0 8px 8px',
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
    if (dateString) {
      const d = format(new Date(dateString), 'yyyy-MM-dd');
      dispatch(setSelectedDate(d));
    }
  }

  if (dateSelectionStatus === 'hidden') return null;

  function incrementMonth() {
    const newDate = format(add(new Date(selectedDate), { months: 1 }), 'yyyy-MM-dd');
    dispatch(setSelectedDate(newDate));
  }

  function decrementMonth() {
    const newDate = format(sub(new Date(selectedDate), { months: 1 }), 'yyyy-MM-dd');
    dispatch(setSelectedDate(newDate));
  }

  function incrementYear() {
    const newDate = format(add(new Date(selectedDate), { years: 1 }), 'yyyy-MM-dd');
    dispatch(setSelectedDate(newDate));
  }

  function decrementYear() {
    const newDate = format(sub(new Date(selectedDate), { years: 1 }), 'yyyy-MM-dd');
    dispatch(setSelectedDate(newDate));
  }

  return (
    <>
      {dateSelectionStatus === 'month' && 
        <div className={classes.root}>
          <IconButton size="small" onClick={decrementMonth}><CustomIcon icon="arrowLeft" /></IconButton>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={classes.picker}
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
          <IconButton size="small" onClick={incrementMonth}><CustomIcon icon="arrowRight" /></IconButton>
        </div>
      }

      {dateSelectionStatus === 'year' &&
        <div className={classes.root}>
          <IconButton size="small" onClick={decrementYear}><CustomIcon icon="arrowLeft" /></IconButton>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={classes.picker}
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
        <IconButton size="small" onClick={incrementYear}><CustomIcon icon="arrowRight" /></IconButton>
        </div>
      }
    </>
  )
}

export default YearMonthSelector;