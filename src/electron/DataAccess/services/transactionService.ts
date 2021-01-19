import { NewTransaction, Transaction } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class TransactionService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getTransaction(id: number): Transaction {
    const sql = 'SELECT * FROM transactions WHERE id = ?';
    return this.db.get(sql, id);
  }

  getTransactionsOfMonth(year: number, month: number): Transaction[] {
    const date = (month >= 10) ? `${year}-${month}-01` : `${year}-0${month}-01`;
    const sql = `SELECT * FROM transactions WHERE date BETWEEN date(?) AND date(?, '+1 month', '-1 day')`;
    return this.db.getMany<Transaction>(sql, [date, date]);
  }

  getTransactionsOfYear(year: number): Transaction[] {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const sql = `SELECT * FROM transactions WHERE date BETWEEN date(?) AND date(?)`;
    return this.db.getMany<Transaction>(sql, [startDate, endDate]);
  }

  getTransactionsOfMonthAndCategory(year: number, month: number, categoryId: number): Transaction[] {
    const date = (month < 10) ? `${year}-0${month}-01` : `${year}-${month}-01`;
    const sql = `SELECT * FROM transactions WHERE categoryId = ? AND date BETWEEN date(?) AND date(?, '+1 month', '-1 day')`;
    return this.db.getMany<Transaction>(sql, [categoryId, date, date]);
  }

  saveTransaction(transaction: NewTransaction): number {
    const sql = 'INSERT INTO transactions (amount, date, label, categoryId) VALUES (?, ?, ?)';
    return this.db.run(sql, [transaction.amount, transaction.date, transaction.label, transaction.categoryId]);
  }

  deleteTransaction(transaction: Transaction): void {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    this.db.run(sql, transaction.id);
  }

  updateTransaction(transaction: Transaction): void {
    const sql = 'UPDATE transactions SET amount = ?, date = ? WHERE id = ?';
    this.db.run(sql, [transaction.amount, transaction.date, transaction.id]);
  }
}