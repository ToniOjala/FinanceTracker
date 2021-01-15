import { Category, KeyValuePair, NewTransaction, Transaction } from '../../../shared/types';
import CategoryService from './categoryService';
import SqliteDataAccess from '../SqliteDataAccess';

export default class TransactionService {
  private db;
  private categoryService;

  constructor() {
    this.db = new SqliteDataAccess();
    this.categoryService = new CategoryService();
  }

  getTransactionsOfMonth(year: number, month: number): Transaction[] {
    const date = (month >= 10) ? `${year}-${month}-01` : `${year}-0${month}-01`;
    const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${date}') AND date('${date}', '+1 month', '-1 day')`;
    const transactions = this.db.getAll<Transaction>(sql);
    return transactions;
  }

  getTransactionsOfYear(year: number): Transaction[] {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${startDate}') AND date('${endDate}')`;
    const transactions = this.db.getAll<Transaction>(sql);
    return transactions;
  }

  getTransactionsOfMonthAndCategory(year: number, month: number, categoryId: number) {
    const date = (month < 10) ? `${year}-0${month}-01` : `${year}-${month}-01`;
    const sql = `SELECT * FROM transactions WHERE categoryId = '${categoryId}' AND date BETWEEN date('${date}') AND date('${date}', '+1 month', '-1 day')`;
    const transactions = this.db.getAll<Transaction>(sql);
    return transactions;
  }

  getYearlyData(year: number) {
    const yearlyData: KeyValuePair = {};
    const categories = this.db.getAll<Category>('SELECT * FROM categories');
    for (const category of categories) {
      const months = new Array<number>(12);
      for (let month = 0; month < 12; month++) {
        const monthlyTransactions = this.getTransactionsOfMonthAndCategory(year, month + 1, category.id);
        months[month] = monthlyTransactions?.reduce((acc, tran) => acc + tran.amount, 0);
      }
      yearlyData[category.name] = months;
    }
    return yearlyData;
  }

  saveTransaction(transaction: NewTransaction) {
    const sql = 'INSERT INTO transactions (amount, date, categoryId) VALUES (?, ?, ?)';
    const id = this.db.run(sql, [transaction.amount, transaction.date, transaction.categoryId]);
    const savedTransaction = this.db.get<Transaction>('SELECT * FROM transactions WHERE id = ?', id);
    if (savedTransaction) this.categoryService.addToBalanceOfCategory(transaction.categoryId, -transaction.amount);
    return savedTransaction;
  }

  deleteTransaction(transaction: Transaction) {
    this.db.run('DELETE FROM transactions WHERE id = ?', transaction.id);
    this.categoryService.addToBalanceOfCategory(transaction.categoryId, transaction.amount);
    return true;
  }

  updateTransaction(transaction: Transaction) {
    const oldTransaction = this.db.get<Transaction>('SELECT * FROM transactions WHERE id = ?', transaction.id);
    this.db.run('UPDATE transactions SET amount = ?, date = ? WHERE id = ?', [transaction.amount, transaction.date, transaction.id]);
    this.categoryService.addToBalanceOfCategory(transaction.categoryId, (transaction.amount - oldTransaction.amount))
    return transaction;
  }
}