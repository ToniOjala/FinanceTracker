import { format } from "date-fns";
import { sub } from "date-fns";
import NotificationService from "../../electron/DataAccess/services/notificationService";
import { processNotifications } from '../../electron/processNotifications';
import { clearTables } from '../utils/database';
import { NewNotification } from "../../shared/types";

describe('processNotifications', () => {
  const newNotifications: NewNotification[] = [
    {
      message: 'abc',
      date: format(sub(new Date(), { days: 8 }), 'yyyy-MM-dd')
    },
    {
      message: 'def',
      date: format(sub(new Date(), { days: 6 }), 'yyyy-MM-dd')
    },
    {
      message: 'ghi',
      date: format(sub(new Date(), { days: 9 }), 'yyyy-MM-dd')
    },
    {
      message: 'jkl',
      date: format(sub(new Date(), { weeks: 1 }), 'yyyy-MM-dd')
    }
  ]
  const notificationService = new NotificationService();

  beforeAll(() => newNotifications.forEach(n => notificationService.saveNotification(n)));
  afterAll(() => clearTables('notifications'));

  it('Removes correct notifications', () => {
    let notifications = notificationService.getNotifications();
    expect(notifications).toHaveLength(4);

    processNotifications();

    notifications = notificationService.getNotifications();
    expect(notifications).toHaveLength(1);
    expect(notifications[0]).toMatchObject(newNotifications[1]);
  })
})