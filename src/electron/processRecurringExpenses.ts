import { format, formatDistanceToNowStrict, set, sub } from "date-fns";
import { RecurringExpense } from "../shared/types";
import ApplicationService from "./DataAccess/services/applicationService";
import NotificationService from "./DataAccess/services/notificationService";
import RecurringExpenseService from "./DataAccess/services/recurringExpenseService"
import TransactionService from "./DataAccess/services/transactionService";
import CategoryService from './DataAccess/services/categoryService';
import BalanceLogService from './DataAccess/services/balanceLogService';

export function processRecurringExpenses(date: Date) {

  const lastOpened = new ApplicationService().getLastOpened();
  const today = format(date, 'yyyy-MM-dd');

  if (lastOpened === today) return;
  const lastOpenedDate = new Date(lastOpened);

  const notificationService = new NotificationService();
  const recurringExpenses = new RecurringExpenseService().getRecurringExpenses();

  for (const expense of recurringExpenses) {
    if (expense.month) expense.month -= 1;
    const expenseDate = set(date, { date: expense.day, month: expense.month || date.getMonth() })
    const notifyDate = sub(expenseDate, { days: expense.notifyDaysBefore });

    // Expense is due today
    if (format(expenseDate, 'yyyy-MM-dd') === today) {
      saveExpense(expense, format(expenseDate, 'yyyy-MM-dd'));
      const message = `Recurring expense '${expense.name}' was added`;
      notificationService.saveNotification({ message, date: today });
    }
    // Expense notification is due is today
    else if (format(notifyDate, 'yyyy-MM-dd') === today) {
      const message = `Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore} days`;
      notificationService.saveNotification({ message, date: today });
    }
    // Expense has been due since app was last opened
    else if (lastOpenedDate.getDate() < expenseDate.getDate() && expenseDate.getDate() < date.getDate()) {
      saveExpense(expense, format(expenseDate, 'yyyy-MM-dd'));
      const message = `Recurring expense '${expense.name}' was added`;
      notificationService.saveNotification({ message, date: format(expenseDate, 'yyyy-MM-dd') });
    } 
    // Expense notification has been due since app was last opened
    else if (lastOpenedDate.getTime() < notifyDate.getTime() && notifyDate.getTime() < date.getTime()) {
      const daysSinceNotifyDate = Number(formatDistanceToNowStrict(notifyDate).charAt(0));
      const message = `Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore - daysSinceNotifyDate} days`;
      notificationService.saveNotification({ message, date: today });
    }
  }
}

function saveExpense (expense: RecurringExpense, date: string) {
  const transactionId = new TransactionService().saveTransaction({
    categoryId: expense.categoryId,
    amount: expense.amount,
    label: expense.name,
    type: 'expense',
    date
  })
  new BalanceLogService().saveBalanceLog({
    categoryId: expense.categoryId,
    amount: -expense.amount,
    label: expense.name,
    transactionId, 
    date
  })
  new CategoryService().addToBalanceOfCategory(expense.categoryId, -expense.amount);
}