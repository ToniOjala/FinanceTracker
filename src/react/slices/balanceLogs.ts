import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { BalanceLog, NewBalanceLog } from '../../shared/types';
import { getBalanceLogs, postBalanceLog } from '../services/balanceLogService';

const balanceLogSlice = createSlice({
  name: 'balanceLog',
  initialState: [] as BalanceLog[],
  reducers: {
    setBalanceLogs: (state, action) => {
      return action.payload;
    },
    addBalanceLog: (state, action) => {
      state.push(action.payload);
    }
  }
})

export const { setBalanceLogs, addBalanceLog } = balanceLogSlice.actions;
export default balanceLogSlice.reducer;

export const fetchBalanceLogs = (categoryId: number): AppThunk => async dispatch => {
  try {
    const balanceLogs = await getBalanceLogs(categoryId);
    dispatch(setBalanceLogs(balanceLogs));
  } catch (error) {
    console.error('Error while fetcing balance logs: ', error)
  }
}

export const saveBalanceLog = (balanceLog: NewBalanceLog): AppThunk => async dispatch => {
  try {
    const savedBalanceLog = await postBalanceLog(balanceLog);
    dispatch(addBalanceLog(savedBalanceLog));
  } catch (error) {
    console.error('Error while saving balance log: ', error);
  }
}

export const selectBalanceLogs = (state: RootState): BalanceLog[] => state.balanceLog;