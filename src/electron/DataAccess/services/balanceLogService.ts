import { BalanceLog, NewBalanceLog } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class TransactionService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getBalanceLogs(categoryId: number): BalanceLog[] {
    const sql = 'SELECT * FROM balanceLogs WHERE categoryId = ?';
    const balanceLogs = this.db.get<BalanceLog[]>(sql, categoryId);
    return balanceLogs;
  }

  saveBalanceLog(balanceLog: NewBalanceLog): BalanceLog {
    const sql = 'INSERT INTO balanceLogs (amount, categoryId, date) VALUES (?, ?, ?)';
    const id = this.db.run(sql, [balanceLog.amount, balanceLog.categoryId, balanceLog.date]);
    return { id, ...balanceLog };
  }

  deleteBalanceLog(balanceLog: BalanceLog) {
    this.db.run('DELETE FROM balanceLogs WHERE id = ?', balanceLog.id);
    return true;
  }

  updateBalanceLog(balanceLog: BalanceLog) {
    const sql = 'UPDATE balanceLogs SET amount = ?, date = ?';
    this.db.run(sql, [balanceLog.amount, balanceLog.date]);
  }
}