import { Database } from "better-sqlite3";
import { Transaction, KeyValuePair } from "../../../shared/types";

export function handleTransactionRequest(db: Database, requestType: string, data?: KeyValuePair): Transaction | Transaction[] {
  let result: Transaction | Transaction[];
  
  switch (requestType) {
    case 'getMany': {
      result = db.prepare('SELECT * FROM transactions').all();
      return result;
    }
    case 'post': {
      const sql = 'INSERT INTO transactions (amount, date, category) VALUES (?, ?, ?)';
      const { lastInsertRowid } = db.prepare(sql).run(data?.amount, data?.date, data?.category);
      const result = db.prepare('SELECT * FROM transactions WHERE id = ?').get(lastInsertRowid);

      return result;
    }
    default:
      return [];
  }
}