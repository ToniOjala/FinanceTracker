import { Budget, DbBudget, NewBudget } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class BudgetService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getLatestBudget(categoryId: number, date: string): Budget {
    const sql = `SELECT * FROM budgets WHERE categoryId = ? AND startDate <= date(?) ORDER BY startDate DESC`;
    const budget = this.db.get<Budget>(sql, [categoryId, date]);
    return budget;
  }

  saveBudget(budget: NewBudget) {
    const sql = 'INSERT INTO budgets (amount, startDate, categoryId) VALUES (?, ?, ?)';
    const id = this.db.run(sql, [budget.amount, budget.startDate, budget.categoryId]);
    return this.db.get<DbBudget>('SELECT * FROM budgets WHERE id = ?', id);
  }

  updateBudget(budget: Budget) {
    const sql = 'UPDATE budgets SET amount = ? WHERE id = ?';
    this.db.run(sql, [budget.amount, budget.id]);
    return budget;
  }
}