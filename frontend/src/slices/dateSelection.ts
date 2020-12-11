/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { DateSelection } from "../types";
import moment from 'moment';

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