import { Database } from "better-sqlite3";
import { Category, KeyValuePair } from "../../../shared/types";

export function handleCategoryRequest(db: Database, requestType: string, data: KeyValuePair, query?: KeyValuePair ): Category | Category[] {
  let result: Category | Category[];
  
  switch (requestType) {
    case 'get': {
      result = db.prepare('SELECT * FROM categories WHERE id = ?').get(query?.id);
      return result;
    }
    case 'getMany': {
      result = db.prepare('SELECT * FROM categories').all();
      return result;
    }
    case 'post': {
      const sql = 'INSERT INTO categories (name, type, balance) VALUES (?, ?, ?)';
      const { lastInsertRowid } = db.prepare(sql).run(data?.name, data?.type, data?.balance);
      const result = db.prepare('SELECT * FROM categories WHERE id = ?').get(lastInsertRowid);
      return result;
    }
    default:
      return [];
  }
}