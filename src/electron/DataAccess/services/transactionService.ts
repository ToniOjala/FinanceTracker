import { NewTransaction, Transaction } from '../../../shared/types';
import CategoryService from './categoryService';
import SqliteDataAccess from '../SqliteDataAccess';

export default class TransactionService {
  private db;
  private categoryService;

  constructor() {
    this.db = new SqliteDataAccess();
    this.categoryService = new CategoryService();
  }

  getTransaction(id: number): Transaction {
    const sql = 'SELECT * FROM transactions WHERE id = ?';
    return this.db.get(sql, id);
  }

  getTransactionsOfMonth(year: number, month: number): Transaction[] {
    const date = (month >= 10) ? `${year}-${month}-01` : `${year}-0${month}-01`;
    const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${date}') AND date('${date}', '+1 month', '-1 day')`;
    return this.db.getAll<Transaction>(sql);
  }

  getTransactionsOfYear(year: number): Transaction[] {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${startDate}') AND date('${endDate}')`;
    return this.db.getAll<Transaction>(sql);
  }

  getTransactionsOfMonthAndCategory(year: number, month: number, categoryId: number): Transaction[] {
    const date = (month < 10) ? `${year}-0${month}-01` : `${year}-${month}-01`;
    const sql = `SELECT * FROM transactions WHERE categoryId = '${categoryId}' AND date BETWEEN date('${date}') AND date('${date}', '+1 month', '-1 day')`;
    return this.db.getAll<Transaction>(sql);
  }

  saveTransaction(transaction: NewTransaction): number {
    const sql = 'INSERT INTO transactions (amount, date, categoryId) VALUES (?, ?, ?)';
    return this.db.run(sql, [transaction.amount, transaction.date, transaction.categoryId]);
  }

  deleteTransaction(transaction: Transaction): void {
    this.db.run('DELETE FROM transactions WHERE id = ?', transaction.id);
    this.categoryService.addToBalanceOfCategory(transaction.categoryId, transaction.amount);
  }

  updateTransaction(transaction: Transaction): void {
    const oldTransaction = this.db.get<Transaction>('SELECT * FROM transactions WHERE id = ?', transaction.id);
    this.db.run('UPDATE transactions SET amount = ?, date = ? WHERE id = ?', [transaction.amount, transaction.date, transaction.id]);
    this.categoryService.addToBalanceOfCategory(transaction.categoryId, (transaction.amount - oldTransaction.amount))
  }
}