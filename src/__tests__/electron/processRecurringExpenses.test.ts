import NotificationService from "../../electron/DataAccess/services/notificationService";
import RecurringExpenseService from '../../electron/DataAccess/services/recurringExpenseService';
import TransactionService from '../../electron/DataAccess/services/transactionService';
import ApplicationService from '../../electron/DataAccess/services/applicationService';
import CategoryService from '../../electron/DataAccess/services/categoryService';
import { processRecurringExpenses } from '../../electron/processRecurringExpenses';
import { clearTables } from '../utils/database';
import { generate } from '../utils/generate';
import { format, formatDistanceToNowStrict, set, sub } from "date-fns";

describe('processRecurringExpenses', () => {
  const recurringExpenseService = new RecurringExpenseService();
  const transactionService = new TransactionService();
  const notificationService = new NotificationService();
  const applicationService = new ApplicationService();
  const categoryService = new CategoryService();

  const dateString = '2021-02-25';
  const date = new Date(dateString);

  const sampleCategories = generate.categories;

  beforeAll(() => {
    applicationService.setLastOpened('2021-02-20')
    sampleCategories.forEach(category => categoryService.saveCategory(category));
  });
  afterAll(() => clearTables('recurringExpenses', 'transactions', 'notifications', 'categories'));

  describe('monthly recurring expenses', () => {
    const monthlyRecurringExpenses = generate.monthlyRecurringExpenses;

    afterEach(() => clearTables('recurringExpenses', 'transactions', 'notifications'));

    it('handles correctly an expense due on the day', () => {
      const expense = monthlyRecurringExpenses[0];
      recurringExpenseService.saveRecurringExpense(expense);

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(1);
      const tr = transactions[0];
      expect(tr.amount).toEqual(expense.amount);
      expect(tr.categoryId).toEqual(expense.categoryId);
      expect(tr.label).toEqual(expense.name);
      expect(tr.date).toEqual(dateString);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' was added`);
      expect(n.date).toEqual(dateString);
    })

    it('handles correctly a notification due on the day', () => {
      const expense = monthlyRecurringExpenses[1];
      recurringExpenseService.saveRecurringExpense(expense);

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(0);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore} days`);
      expect(n.date).toEqual(dateString);
    })

    it('handles correctly an expense which has been due since app was last opened', () => {
      const expense = monthlyRecurringExpenses[2];
      recurringExpenseService.saveRecurringExpense(expense);
      const expenseDateString = format(set(date, { date: expense.day, month: date.getMonth() }), 'yyyy-MM-dd');

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(1);
      const tr = transactions[0];
      expect(tr.amount).toEqual(expense.amount);
      expect(tr.categoryId).toEqual(expense.categoryId);
      expect(tr.label).toEqual(expense.name);
      expect(tr.date).toEqual(expenseDateString);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' was added`);
      expect(n.date).toEqual(expenseDateString);
    })

    it('handles correctly a notification which has been due since app was last opened', () => {
      const expense = monthlyRecurringExpenses[3];
      recurringExpenseService.saveRecurringExpense(expense);
      const expenseDate = set(date, { date: expense.day, month: date.getMonth() })
      const notifyDate = sub(expenseDate, { days: expense.notifyDaysBefore });
      const daysSinceNotifyDate = Number(formatDistanceToNowStrict(notifyDate).charAt(0));

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(0);
      
      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore - daysSinceNotifyDate} days`)
      expect(n.date).toEqual(dateString);
    })

    it('handles correctly an expense which should not cause action', () => {
      const expense = monthlyRecurringExpenses[4];
      recurringExpenseService.saveRecurringExpense(expense);

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(0);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(0);
    })
  })

  describe('yearly recurring expenses', () => {
    const yearlyRecurringExpenses = generate.yearlyRecurringExpenses;
    
    afterEach(() => clearTables('recurringExpenses', 'transactions', 'notifications'));

    it('handles correctly an expense due on the day', () => {
      const expense = yearlyRecurringExpenses[0];
      recurringExpenseService.saveRecurringExpense(expense);

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(1);
      const tr = transactions[0];
      expect(tr.amount).toEqual(expense.amount);
      expect(tr.categoryId).toEqual(expense.categoryId);
      expect(tr.label).toEqual(expense.name);
      expect(tr.date).toEqual(dateString);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' was added`);
      expect(n.date).toEqual(dateString);
    })

    it('handles correctly a notification due on the day', () => {
      const expense = yearlyRecurringExpenses[1];
      recurringExpenseService.saveRecurringExpense(expense);

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(0);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore} days`);
      expect(n.date).toEqual(dateString);
    })

    it('handles correctly an expense which has been due since app was last opened', () => {
      const expense = yearlyRecurringExpenses[2];
      recurringExpenseService.saveRecurringExpense(expense);
      const expenseDateString = format(set(date, { date: expense.day, month: date.getMonth() }), 'yyyy-MM-dd');

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(1);
      const tr = transactions[0];
      expect(tr.amount).toEqual(expense.amount);
      expect(tr.categoryId).toEqual(expense.categoryId);
      expect(tr.label).toEqual(expense.name);
      expect(tr.date).toEqual(expenseDateString);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' was added`);
      expect(n.date).toEqual(expenseDateString);
    })

    it('handles correctly a notification which has been due since app was last opened', () => {
      const expense = yearlyRecurringExpenses[3];
      recurringExpenseService.saveRecurringExpense(expense);
      const expenseDate = set(date, { date: expense.day, month: date.getMonth() })
      const notifyDate = sub(expenseDate, { days: expense.notifyDaysBefore });
      const daysSinceNotifyDate = Number(formatDistanceToNowStrict(notifyDate).charAt(0));

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(0);
      
      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(1);
      const n = notifications[0];
      expect(n.message).toEqual(`Recurring expense '${expense.name}' will be added in ${expense.notifyDaysBefore - daysSinceNotifyDate} days`)
      expect(n.date).toEqual(dateString);
    })

    it('handles correctly an expense which should not cause action', () => {
      const expense = yearlyRecurringExpenses[4];
      recurringExpenseService.saveRecurringExpense(expense);

      processRecurringExpenses(date);

      const transactions = transactionService.getTransactions();
      expect(transactions).toHaveLength(0);

      const notifications = notificationService.getNotifications();
      expect(notifications).toHaveLength(0);
    })
  })
})