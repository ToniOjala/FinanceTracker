/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { DateSelection, YearMonth } from "../types";
import moment from 'moment';
import { RootState } from "../rootReducer";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

const initialState: DateSelection = {
  selectedDate: moment().format(),
  yearMonth: { year: 2020, month: 12 }
}

const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState,
  reducers: {
    setDateSelection: (state, action) => {
      state.selectedDate = moment().format();
      state.yearMonth = action.payload.year;
    }
  }
})

export const { setDateSelection } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;

export const selectDate = (state: RootState): ParsableDate => state.dateSelection.selectedDate;
export const selectYearMonth = (state: RootState): YearMonth => state.dateSelection.yearMonth;
export const selectYear = (state: RootState): number => state.dateSelection.yearMonth.year;