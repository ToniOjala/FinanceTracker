import { BalanceLog, NewBalanceLog } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class BalanceLogService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getBalanceLog(id: number): BalanceLog {
    const sql = 'SELECT * FROM balanceLogs WHERE id = ?';
    return this.db.get<BalanceLog>(sql, id);
  }

  getBalanceLogs(categoryId: number, page: number): BalanceLog[] {
    const sql = 'SELECT * FROM balanceLogs WHERE categoryId = ? ORDER BY date DESC LIMIT 10 OFFSET 10 * ?';
    return this.db.getMany<BalanceLog>(sql, [categoryId, page - 1]);
  }

  getCountOfBalanceLogs(categoryId: number): number {
    const sql = 'SELECT COUNT(id) as count FROM balanceLogs WHERE categoryId = ?';
    const data: { count: number } = this.db.get(sql, categoryId);
    return data.count;
  }

  saveBalanceLog(balanceLog: NewBalanceLog): number {
    const sql = 'INSERT INTO balanceLogs (categoryId, transactionId, amount, date, label) VALUES (?, ?, ?, ?, ?)';
    return this.db.run(sql, [balanceLog.categoryId, balanceLog.transactionId, balanceLog.amount, balanceLog.date, balanceLog.label]);
  }

  deleteBalanceLogs(transactionId: number): void {
    this.db.run(`DELETE FROM balanceLogs WHERE transactionId = ?`, transactionId);
  }

  updateBalanceLog(transactionId: number, amount: number, date: string): void {
    const sql = 'UPDATE balanceLogs SET amount = ?, date = ? WHERE transactionId = ?';
    this.db.run(sql, [amount, date, transactionId]);
  }
}