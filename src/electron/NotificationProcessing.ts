import { formatDistanceToNowStrict } from "date-fns";
import NotificationService from "./DataAccess/services/notificationService";

export function processNotifications() {
  const notificationService = new NotificationService();

  notificationService.getNotifications().forEach(n => {
    const distance = formatDistanceToNowStrict(new Date(n.date));
    const [ value,  word ] = distance.split(' ');

    if (word === 'days' && Number(value) > 7) {
      notificationService.deleteNotification(n.id);
    }
  })
}