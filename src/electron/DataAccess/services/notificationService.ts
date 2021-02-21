import { Notification, NewNotification } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class NotificationService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getNotification(id: number): Notification {
    const notification: Notification = this.db.get<Notification>('SELECT * FROM notifications WHERE id = ?', id);
    return notification;
  }

  getNotifications(): Notification[] {
    const notifications: Notification[] = this.db.getMany<Notification>('SELECT * FROM notifications');
    return notifications;
  }

  saveNotification(notification: NewNotification): number {
    const sql = 'INSERT INTO notifications (message, read) VALUES (?, false)';
    return this.db.run(sql, [notification.message]);
  }

  updateNotification(id: number): void {
    this.db.run('UPDATE notifications SET read = 1 WHERE id = ?', id);
  }

  deleteNotification(id: number): void {
    this.db.run('DELETE FROM notifications WHERE id = ?', id);
  }
}