import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';
import { BalanceLog, NewBalanceLog } from '../../shared/types';
import { getBalanceLogCount, getBalanceLogs, postBalanceLog } from '../services/balanceLogService';

const initialState = {
  logs: [] as BalanceLog[],
  count: 0,
}

const balanceLogSlice = createSlice({
  name: 'balanceLog',
  initialState,
  reducers: {
    setBalanceLogs: (state, action) => {
      state.logs = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    addBalanceLog: (state, action) => {
      state.logs.push(action.payload);
    }
  }
})

export const { setBalanceLogs, setCount, addBalanceLog } = balanceLogSlice.actions;
export default balanceLogSlice.reducer;

export const fetchBalanceLogs = (categoryId: number, page: number): AppThunk => async dispatch => {
  try {
    const balanceLogs = await getBalanceLogs(categoryId, page);
    dispatch(setBalanceLogs(balanceLogs));
  } catch (error) {
    console.error('Error while fetcing balance logs: ', error)
  }
}

export const fetchBalanceLogCount = (categoryId: number): AppThunk => async dispatch => {
  try {
    const count = await getBalanceLogCount(categoryId);
    dispatch(setCount(count));
  } catch (error) {
    console.error('Error while fetching balance log count: ', error);
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

export const selectBalanceLogs = (state: RootState): BalanceLog[] => state.balanceLogs.logs;
export const selectBalanceLogCount = (state: RootState): number => state.balanceLogs.count;