import { getMany, post, update, deleteItem } from './dbService';
import { NewNotification, Notification } from '../../shared/types';

const table = 'notifications';

export function getNotifications (): Promise<Notification[]> {
  return getMany<Notification[]>(table);
}

export function saveNotification (notification: NewNotification): Promise<Notification> {
  return post<NewNotification, Notification>(table, notification);
}

export function deleteNotificationFromDB (notification: Notification): Promise<boolean> {
  return deleteItem<Notification>(table, notification);
}

export function updateNotificationInDB (notification: Notification): Promise<Notification> {
  return update<Notification>(table, notification);
}