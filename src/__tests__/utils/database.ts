import sqliteDB from 'better-sqlite3';
import path from 'path';

let db: sqliteDB.Database | undefined;
const databasePath = path.join(__dirname, '..', 'test.db');

export function clearTables(...tablesToClear: string[]) {
  if (tablesToClear.length <= 0) return;

  db = sqliteDB(databasePath, { verbose: console.log });
  tablesToClear.forEach((table: string) => {
    db?.prepare(`DELETE FROM ${table}`).run();
    db?.prepare('DELETE FROM sqlite_sequence WHERE name = ?').run(table);
  })  
  db.close();
}