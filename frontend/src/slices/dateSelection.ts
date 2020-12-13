/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { DateSelection } from "../types";
import moment from 'moment';
import { RootState } from "../rootReducer";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

const initialState: DateSelection = {
  selectedDate: moment().format(),
  year: 2020,
  month: 12
}

const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState,
  reducers: {
    setDateSelection: (state, action) => {
      const { year, month } = action.payload;

      let dateString;
      if (month < 10) dateString = `${year}0${month}01`;
      else dateString = `${year}${month}01`;

      const selectedDate = moment(dateString).format();

      state.year = year;
      state.month = month;
      state.selectedDate = selectedDate;
    }
  }
})

export const { setDateSelection } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;

export const selectDate = (state: RootState): ParsableDate => state.dateSelection.selectedDate;
export const selectYearAndMonth = (state: RootState): Array<number> => [ state.dateSelection.year, state.dateSelection.month ]
export const selectYear = (state: RootState): number => state.dateSelection.year;