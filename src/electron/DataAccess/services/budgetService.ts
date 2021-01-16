import { Budget, NewBudget } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class BudgetService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getBudget(id: number): Budget {
    const sql = 'SELECT * FROM budgets WHERE id = ?';
    return this.db.get<Budget>(sql, id);
  }

  getLatestBudget(categoryId: number, date: string): Budget {
    const sql = `SELECT * FROM budgets WHERE categoryId = ? AND startDate <= date(?) ORDER BY startDate DESC`;
    return this.db.get<Budget>(sql, [categoryId, date]);
  }

  saveBudget(budget: NewBudget): number {
    const sql = 'INSERT INTO budgets (amount, startDate, categoryId) VALUES (?, ?, ?)';
    return this.db.run(sql, [budget.amount, budget.startDate, budget.categoryId]);
  }

  updateBudget(budget: Budget): void {
    const sql = 'UPDATE budgets SET amount = ? WHERE id = ?';
    this.db.run(sql, [budget.amount, budget.id]);
  }
}