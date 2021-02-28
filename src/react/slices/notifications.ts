import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../../shared/types";
import { RootState } from "../rootReducer";
import { getNotifications, updateNotificationInDB } from '../services/notificationService';
import { AppThunk } from "../store";
import { isNotification } from "../utils/verify";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [] as Notification[],
  reducers: {
    setNotifications: (state, action) => {
      return action.payload;
    },
    replaceNotification: (state, action) => {
      return state.map(n => {
        if (n.id === action.payload.id) return action.payload;
        else return n;
      })
    }
  }
})

export const { setNotifications, replaceNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const fetchNotifications = (): AppThunk => async dispatch => {
  try {
    let notifications = await getNotifications();
    notifications = notifications.filter(n => isNotification(n))
    if (notifications && notifications.length > 0) dispatch(setNotifications(notifications));
  } catch (error) {
    console.error('Error while fetching notifications: ', error);
  }
}

export const updateNotification = (notification: Notification): AppThunk => async dispatch => {
  try {
    const updatedNotification = await updateNotificationInDB(notification);
    dispatch(replaceNotification(updatedNotification));
  } catch (error) {
    console.error('Error while deleting notification', error);
  }
}

export const selectNotifications = (state: RootState): Notification[] => state.notifications;