/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { DateSelection } from "../types";
import { format } from 'date-fns';
import { RootState } from "../rootReducer";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

const initialState: DateSelection = {
  selectedDate: new Date(),
  year: Number(format(new Date(), 'yyyy')),
  month: Number(format(new Date(), 'MM'))
}

const dateSelectionSlice = createSlice({
  name: 'dateSelection',
  initialState,
  reducers: {
    setDateSelection: (state, action) => {
      const selectedDate = format(new Date(action.payload), 'yyyy-MM');
      console.log('selectedDate: ', selectedDate);
      state.selectedDate = selectedDate;
    }
  }
})

export const { setDateSelection } = dateSelectionSlice.actions;
export default dateSelectionSlice.reducer;

export const selectDate = (state: RootState): ParsableDate => state.dateSelection.selectedDate;
export const selectYearAndMonth = (state: RootState): Array<number> => [ state.dateSelection.year, state.dateSelection.month ]
export const selectYear = (state: RootState): number => state.dateSelection.year;