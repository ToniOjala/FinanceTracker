import RecurringExpenseService from '../../../electron/DataAccess/services/recurringExpenseService';
import { NewRecurringExpense, RecurringExpense } from '../../../shared/types';
import { clearTables } from '../../utils/database';
import { generate } from '../../utils/generate';

describe('recurringExpenseService', () => {
  const recurringExpenseService = new RecurringExpenseService();
  const sampleExpenses = generate.recurringExpenses;

  afterAll(() => clearTables('recurringExpenses'));

  describe('database is empty', () => {
    afterAll(() => clearTables('recurringExpenses'));

    it('getRecurringExpense returns undefined', () => {
      const expense = recurringExpenseService.getRecurringExpense(1);
      expect(expense).toBeUndefined();
    })

    it('getRecurringExpenses returns empty array', () => {
      const expenses = recurringExpenseService.getRecurringExpenses();
      expect(expenses).toHaveLength(0);
    })

    it('saveRecurringExpense adds a row to table', () => {
      const expense: NewRecurringExpense = {
        name: 'Test',
        amount: 30.00,
        recurs: 'monthly',
        day: 5,
        notifyDaysBefore: 1
      }

      const id = recurringExpenseService.saveRecurringExpense(expense);
      expect(id).toEqual(1);

      const savedExpense = recurringExpenseService.getRecurringExpense(id);
      expect(savedExpense.id).toBe(id);
      expect(savedExpense).toMatchObject(expense);
    })
  })

  describe('database has existing recurring expenses', () => {
    beforeAll(() => {
      for (const expense of sampleExpenses) 
        recurringExpenseService.saveRecurringExpense(expense);
    })

    it('getRecurringExpense returns correct expense', () => {
      const id = 2;
      const expectedExpense = sampleExpenses.filter(exp => exp.id === id)[0];
      const expense = recurringExpenseService.getRecurringExpense(id);

      expect(expense.id).toEqual(id);
      expect(expense).toMatchObject(expectedExpense);
    })

    it('getRecurringExpenses return correct expenses', () => {
      const expenses = recurringExpenseService.getRecurringExpenses();

      expect(expenses).toHaveLength(sampleExpenses.length);
      for (const expense of expenses) {
        expect(expense).toMatchObject(sampleExpenses.filter(exp => exp.id === expense.id)[0]);
      }
    })

    it('saveRecurringExpense adds a row to table', () => {
      const expense: NewRecurringExpense = {
        name: 'Test',
        amount: 30.00,
        recurs: 'monthly',
        day: 5,
        notifyDaysBefore: 1
      }

      const id = recurringExpenseService.saveRecurringExpense(expense);
      expect(id).toEqual(sampleExpenses.length + 1);

      const savedExpense = recurringExpenseService.getRecurringExpense(id);
      expect(savedExpense).toMatchObject(expense);
    })

    it('updateRecurringExpense updates a row in table', () => {
      const expense: RecurringExpense = {
        id: 1,
        name: 'MonthlyExpense #1',
        amount: 30.00,
        recurs: 'monthly',
        day: 5,
        notifyDaysBefore: 1
      }

      recurringExpenseService.updateRecurringExpense(expense);
      const updatedExpense = recurringExpenseService.getRecurringExpense(expense.id);

      expect(updatedExpense).toMatchObject(expense);
    })

    it('deleteRecurringExpense removes a row in table', () => {
      const expense = sampleExpenses[3];
      recurringExpenseService.deleteRecurringExpense(expense);

      const deletedExpense = recurringExpenseService.getRecurringExpense(expense.id);
      expect(deletedExpense).toBeUndefined();
    })
  })
})