import React, { useState } from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DatefnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const DatePickerField = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(new Date(''));

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date);
  }

  return (
    <MuiPickersUtilsProvider utils={DatefnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default DatePickerField
