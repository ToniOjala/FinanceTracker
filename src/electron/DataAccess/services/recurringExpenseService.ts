import { RecurringExpense, NewRecurringExpense } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class RecurringExpenseService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getRecurringExpense(id: number): RecurringExpense {
    return this.db.get<RecurringExpense>('SELECT * FROM recurringExpenses WHERE id = ?', id);
  }

  getRecurringExpenses(): RecurringExpense[] {
    return this.db.getMany<RecurringExpense>('SELECT * FROM recurringExpenses');
  }

  saveRecurringExpense(expense: NewRecurringExpense): number {
    const sql = 'INSERT INTO recurringExpenses (name, amount, recurs, day, month, notifyDaysBefore) VALUES (?, ?, ?, ?, ?, ?)';
    return this.db.run(sql, [expense.name, expense.amount, expense.recurs, expense.day, expense.month, expense.notifyDaysBefore]);
  }

  updateRecurringExpense(expense: RecurringExpense): void {
    const sql = 'UPDATE recurringExpenses SET amount = ?, day = ?, month = ?, notifyDaysBefore = ? WHERE id = ?';
    this.db.run(sql, [expense.amount, expense.day, expense.month, expense.notifyDaysBefore, expense.id]);
  }

  deleteRecurringExpense(expense: RecurringExpense): void {
    const sql = 'DELETE FROM recurringExpenses WHERE id = ?';
    this.db.run(sql, [expense.id]);
  }
}