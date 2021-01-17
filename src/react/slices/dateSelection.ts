/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { format, getMonth, getYear } from 'date-fns';
import { RootState } from "../rootReducer";

type ComponentStatus = 'month' | 'year' | 'hidden'

const initialState: { componentStatus: ComponentStatus, selectedDate: string } = {
  componentStatus: 'hidden',
  selectedDate: format(new Date().setDate(1), 'yyyy-MM-dd')
}

const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState: initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      const selectedDate = format(new Date(action.payload).setDate(1), 'yyyy-MM-dd');
      state.selectedDate = selectedDate;
    },
    setDateSelectionStatus: (state, action) => { state.componentStatus = action.payload },
  }
})

export const { setSelectedDate, setDateSelectionStatus } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;

export const selectDate = (state: RootState): string => state.dateSelection.selectedDate;
export const selectYearAndMonth = (state: RootState): Array<number> => [getYear(new Date(state.dateSelection.selectedDate)), getMonth(new Date(state.dateSelection.selectedDate))+1];
export const selectYear = (state: RootState): number => getYear(new Date(state.dateSelection.selectedDate));
export const selectDateSelectionStatus = (state: RootState): string => state.dateSelection.componentStatus;