/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { format, getMonth, getYear } from 'date-fns';
import { RootState } from "../rootReducer";

const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState: format(new Date().setDate(1), 'yyyy-MM-dd'),
  reducers: {
    setSelectedDate: (state, action) => {
      const selectedDate = format(new Date(action.payload).setDate(1), 'yyyy-MM-dd');
      return selectedDate;
    }
  }
})

export const { setSelectedDate } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;

export const selectDate = (state: RootState): string => state.dateSelection;
export const selectYearAndMonth = (state: RootState): Array<number> => [getYear(new Date(state.dateSelection)), getMonth(new Date(state.dateSelection))];
export const selectYear = (state: RootState): number => getYear(new Date(state.dateSelection));