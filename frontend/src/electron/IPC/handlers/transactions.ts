import { Database } from "better-sqlite3";
import { Transaction, KeyValuePair } from "../../../shared/types";

export function handleTransactionRequest(db: Database, requestType: string, data?: KeyValuePair, query?: KeyValuePair): Transaction | Transaction[] {
  let result: Transaction | Transaction[];
  
  switch (requestType) {
    case 'getMany': {
      if (query && query.month && query.year) {
        const year = Number(query.year);
        const month = Number(query.month);

        const startDate = `${year}-${month}-01`;
        let endDate = `${year}-${month+1}-01`;
        if (month === 12) endDate = `${year+1}-01-01`;
        
        const sql = `SELECT * FROM transactions WHERE date BETWEEN date('${startDate}') AND date('${endDate}')`;
        result = db.prepare(sql).all();
      } else {
        result = db.prepare('SELECT * FROM transactions').all();
      }
      return result;
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