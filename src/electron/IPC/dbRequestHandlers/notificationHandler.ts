import { KeyValuePair, Notification, NewNotification } from "../../../shared/types";
import NotificationService from '../../DataAccess/services/notificationService';

let notificationService: NotificationService;

export function handleNotificationRequest (method: string, data?: KeyValuePair) {
  notificationService = new NotificationService();

  switch (method) {
    case 'getMany':
      return handleGetMany();
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return handlePost(data.item as NewNotification);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      return handleUpdate(data.item as Notification);
    case 'delete':
      if (!data) throw new Error('Data to delete was not given');
      return handleDelete(data.item as Notification);
    default:
      throw new Error(`Request method not recognized: ${method}`);
  }
}

function handleGetMany(): Notification[] {
  return notificationService.getNotifications();
}

function handlePost(notification: NewNotification): Notification {
  const id = notificationService.saveNotification(notification);
  return notificationService.getNotification(id);
}

function handleUpdate(notification: Notification): Notification {
  notificationService.updateNotification(notification.id);
  return notificationService.getNotification(notification.id);
}

function handleDelete(notification: Notification): boolean {
  notificationService.deleteNotification(notification.id);
  const deletedNotification = notificationService.getNotification(notification.id);
  return deletedNotification == null;
}