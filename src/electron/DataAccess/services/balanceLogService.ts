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
    const sql = 'SELECT * FROM balanceLogs WHERE categoryId = ? ORDER BY date DESC LIMIT 20 OFFSET 20 * ?';
    return this.db.getMany<BalanceLog>(sql, [categoryId, page - 1]);
  }

  getCountOfBalanceLogs(categoryId: number): number {
    const sql = 'SELECT COUNT(id) as count FROM balanceLogs WHERE categoryId = ?';
    const data: { count: number } = this.db.get(sql, categoryId);
    return data.count;
  }

  saveBalanceLog(balanceLog: NewBalanceLog): number {
    const sql = 'INSERT INTO balanceLogs (categoryId, amount, date, type, reason) VALUES (?, ?, ?, ?, ?)';
    return this.db.run(sql, [balanceLog.categoryId, balanceLog.amount, balanceLog.date, balanceLog.type, balanceLog.reason]);
  }

  deleteBalanceLog(balanceLog: BalanceLog): void {
    this.db.run('DELETE FROM balanceLogs WHERE id = ?', balanceLog.id);
  }

  updateBalanceLog(balanceLog: BalanceLog): void {
    const sql = 'UPDATE balanceLogs SET amount = ?, date = ?';
    this.db.run(sql, [balanceLog.amount, balanceLog.date]);
  }
}