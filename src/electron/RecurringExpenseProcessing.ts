import { format, formatDistanceToNowStrict, set, sub } from "date-fns";
import ApplicationService from "./DataAccess/services/applicationService";
import NotificationService from "./DataAccess/services/notificationService";
import RecurringExpenseService from "./DataAccess/services/recurringExpenseService"
import TransactionService from "./DataAccess/services/transactionService";

export function processRecurringExpenses(date: Date) {
  const applicationService = new ApplicationService();
  const lastOpened = applicationService.getLastOpened();
  const today = format(new Date(), 'yyyy-MM-dd');

  if (lastOpened === today) return;
  const lastOpenedDate = new Date(lastOpened);

  const transactionService = new TransactionService();
  const recurringExpenseService = new RecurringExpenseService();
  const notificationService = new NotificationService();
  const recurringExpenses = recurringExpenseService.getRecurringExpenses();

  for (const expense of recurringExpenses) {
    if (expense.month) expense.month -= 1;
    const expenseDate = set(date, { date: expense.day, month: expense.month || date.getMonth() })
    const notifyDate = sub(expenseDate, { days: expense.notifyDaysBefore });
    let message = '';

    if (format(expenseDate, 'yyyy-MM-dd') === today) {
      transactionService.saveTransaction({
        categoryId: expense.categoryId,
        amount: expense.amount,
        label: expense.name,
        type: 'expense',
        date: today
      })
      message = `Recurring expense '${expense.name}' was added today`;
    }
    else if (format(notifyDate, 'yyyy-MM-dd') === today) {
      message = `Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore} days`;
    }
    else if (lastOpenedDate.getDate() < expenseDate.getDate() && expenseDate.getDate() < date.getDate()) {
      const distance = formatDistanceToNowStrict(expenseDate);
      message = `Recurring expense '${expense.name}' was added ${distance} ago`;
    } 
    else if (lastOpenedDate.getDate() < notifyDate.getDate() && notifyDate.getDate() < date.getDate()) {
      const daysSinceNotifyDate = Number(formatDistanceToNowStrict(notifyDate).charAt(0));
      message = `Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore - daysSinceNotifyDate} days`;
    }

    if (message) notificationService.saveNotification({ message, date: today });
  }
}