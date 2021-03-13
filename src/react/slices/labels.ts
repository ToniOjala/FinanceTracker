import { createSlice } from "@reduxjs/toolkit";
import { Label, NewLabel } from "../../shared/types";
import { RootState } from "../rootReducer";
import { getLabelsByCategory, saveLabel, updateLabelInDb } from "../services/labelService";
import { AppThunk } from "../store";

const labelSlice = createSlice({
  name: 'label',
  initialState: [] as Label[],
  reducers: {
    setLabels: (state, action) => {
      return action.payload;
    },
    addLabel: (state, action) => {
      state.push(action.payload);
    },
    replaceLabel: (state, action) => {
      state.map(l => l.id === action.payload.id ? action.payload : l);
    }
  }
})

export const { setLabels, addLabel, replaceLabel } = labelSlice.actions;
export default labelSlice.reducer;

export const fetchLabels = (categoryId: number): AppThunk => async dispatch => {
  try {
    const labels = await getLabelsByCategory(categoryId);
    dispatch(setLabels(labels));
  } catch (error) {
    console.error('Error while fetching labels: ', error);
  }
}

export const postLabel = (label: NewLabel): AppThunk => async dispatch => {
  try {
    const savedLabel = await saveLabel(label);
    dispatch(addLabel(savedLabel));
  } catch (error) {
    console.error('Error while posting label: ', error);
  }
}

export const updateLabel = (label: Label): AppThunk => async dispatch => {
  try {
    const updatedLabel = await updateLabelInDb(label);
    if (updatedLabel) dispatch(replaceLabel(updatedLabel));
  } catch (error) {
    console.error('Error while updating label: ', error);
  }
}

export const selectLabels = (state: RootState): Label[] => state.labels;