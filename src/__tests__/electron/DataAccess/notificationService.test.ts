import NotificationService from '../../../electron/DataAccess/services/notificationService';
import { NewNotification, Notification } from '../../../shared/types';
import { clearTables } from '../../utils/database';
import { generate } from '../../utils/generate';
import { verifyNotificationEquality } from '../../utils/verification';

const sampleNotifications = generate.notifications;

describe('notificationService', () => {
  const notificationService = new NotificationService();

  afterAll(() => clearTables('notifications'));

  describe('table is empty', () => {
    afterEach(() => clearTables('notifications'));

    it('getNotification returns undefined', () => {
      const notification = notificationService.getNotification(1);
      expect(notification).toBeUndefined();
    })

    it('getNotifications returns empty array', () => {
      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(0);
    })

    it('saveNotification creates a new row in table', () => {
      const notification: NewNotification = {
        message: 'This is a test message',
      }

      const id = notificationService.saveNotification(notification);
      expect(id).toEqual(1);

      const savedNotification = notificationService.getNotification(id);
      expect(savedNotification.id).toEqual(id);
      expect(savedNotification).toMatchObject(notification);
    })
  })

  describe('table has existing notifications', () => {
    beforeAll(() => {
      for (const notification of sampleNotifications) {
        notificationService.saveNotification(notification);
      }
    })

    it('getNotification returns correct notification', () => {
      const id = 1;
      const notification = notificationService.getNotification(id);
      expect(notification.id).toEqual(id);
      verifyNotificationEquality(notification, sampleNotifications[0]);
    })

    it('getNotifications returns correct notifications', () => {
      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(sampleNotifications.length);
      for (const notification of notifications) {
        verifyNotificationEquality(notification, sampleNotifications.filter(n => n.id === notification.id)[0]);
      }
    })

    it('saveNotification creates a new row in table', () => {
      const notification: NewNotification = {
        message: 'This is a test message',
      }

      const id = notificationService.saveNotification(notification);
      expect(id).toEqual(sampleNotifications.length + 1);

      const savedNotification = notificationService.getNotification(id);
      verifyNotificationEquality(savedNotification, notification);
    })

    it('updateNotification changes read property to 1', () => {
      const notification = sampleNotifications[3];
      expect(notification.read).toBeFalsy();
      notificationService.updateNotification(notification.id);
      const updatedNotification = notificationService.getNotification(notification.id);
      expect(updatedNotification.read).toEqual(1);
    })

    it('deleteNotification removes a row from table', () => {
      const notification = sampleNotifications[2];
      notificationService.deleteNotification(notification.id);
      const deletedNotification = notificationService.getNotification(notification.id);
      expect(deletedNotification).toBeUndefined();
    })
  })
})