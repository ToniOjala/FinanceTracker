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

  getBalanceLogs(categoryId: number): BalanceLog[] {
    const sql = 'SELECT * FROM balanceLogs WHERE categoryId = ?';
    return this.db.getMany<BalanceLog>(sql, categoryId);
  }

  saveBalanceLog(balanceLog: NewBalanceLog): number {
    const sql = 'INSERT INTO balanceLogs (amount, categoryId, date) VALUES (?, ?, ?)';
    return this.db.run(sql, [balanceLog.amount, balanceLog.categoryId, balanceLog.date]);
  }

  deleteBalanceLog(balanceLog: BalanceLog): void {
    this.db.run('DELETE FROM balanceLogs WHERE id = ?', balanceLog.id);
  }

  updateBalanceLog(balanceLog: BalanceLog): void {
    const sql = 'UPDATE balanceLogs SET amount = ?, date = ?';
    this.db.run(sql, [balanceLog.amount, balanceLog.date]);
  }
}