/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { format } from 'date-fns';
import { RootState } from "../rootReducer";

const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState: format(new Date(), 'yyyy-MM'),
  reducers: {
    setSelectedDate: (state, action) => {
      const selectedDate = format(new Date(action.payload), 'yyyy-MM');
      return selectedDate;
    }
  }
})

export const { setSelectedDate } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;

export const selectDate = (state: RootState): string => state.dateSelection;
export const selectYearAndMonth = (state: RootState): Array<number> => [Number(format(new Date(state.dateSelection), 'yyyy')), Number(format(new Date(state.dateSelection), 'MM'))]
export const selectYear = (state: RootState): number => Number(format(new Date(state.dateSelection), 'yyyy'));