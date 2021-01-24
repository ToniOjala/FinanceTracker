import sqliteDB from 'better-sqlite3';
import path from 'path';

let db: sqliteDB.Database | undefined;
const databasePath = path.join(__dirname, '..', 'test.db');

export function clearDatabase() {
  db = sqliteDB(databasePath, { verbose: console.log });
  db.prepare('DELETE FROM balanceLogs').run();
  db.prepare('DELETE FROM transactions').run();
  db.prepare('DELETE FROM budgets').run();
  db.prepare('DELETE FROM categories').run();
  db.close();
}