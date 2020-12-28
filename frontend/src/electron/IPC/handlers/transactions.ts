import { Database } from "better-sqlite3";
import { Transaction, KeyValuePair, Category } from "../../../shared/types";

export function handleTransactionRequest(db: Database, requestType: string, data?: KeyValuePair, query?: KeyValuePair): Transaction | Transaction[] | KeyValuePair {
  let result: Transaction | Transaction[] | KeyValuePair;
  
  switch (requestType) {
    case 'getMany': {
      if (query && query.month && query.year) {
        const year = Number(query.year);
        const month = Number(query.month);
        result = getTransactionsOfMonth(db, year, month);
      } else if (query && query.year) {
        const year = Number(query.year);
        result = getTransactionsOfYear(db, year);
      } else {
        result = db.prepare('SELECT * FROM transactions').all();
      }
      return result;
    }
    case 'yearly-data': {
      const yearViewData: KeyValuePair = {};

      if (query && query.year) {
        const year = Number(query.year)

        const categories: Category[] = db.prepare('SELECT * FROM categories').all();

        for (const category of categories) {
          const months = new Array<number>(12);
          for (let month = 0; month < 12; month++) {
            const monthlyTransactions = getTransactionsOfMonthAndCategory(db, year, month + 1, category.name);
            const sum = monthlyTransactions?.reduce((acc, tran) => acc + tran.amount, 0);
            months[month] = sum
          }

          yearViewData[category.name] = months;
        }
      }

      console.log('yearViewData: ', yearViewData); 
      return yearViewData;
    }
    case 'post': {
      const sql = 'INSERT INTO transactions (amount, date, category) VALUES (?, ?, ?)';
      const { lastInsertRowid } = db.prepare(sql).run(data?.amount, data?.date, data?.category);
      result = db.prepare('SELECT * FROM transactions WHERE id = ?').get(lastInsertRowid);

      return result;
    }
    default:
      return [];
  }
}

function getTransactionsOfMonth(db: Database, year: number, month: number) {
  const date = `${year}-${month}-01`;
  const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${date}') AND date('${date}', '+1 month', '-1 day')`;
  return db.prepare(sql).all();
}

function getTransactionsOfMonthAndCategory(db: Database, year: number, month: number, category: string) {
  const date = `${year}-${month}-01`;
  const sql = `SELECT * FROM transactions 
               WHERE date BETWEEN date('${date}') AND date('${date}', '+1 month', '-1 day')
               AND category = ${category}`;
  return db.prepare(sql).all();
}

function getTransactionsOfYear(db: Database, year: number) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${startDate}') AND date('${endDate}')`;
  return db.prepare(sql).all();
}