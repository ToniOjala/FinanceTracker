import sqliteDB from 'better-sqlite3';
import path from 'path';

export default class SqliteDataAccess {
  private db: sqliteDB.Database | null = null;

  private connect(): sqliteDB.Database {
    let databasePath = process.env.DATABASE_PATH;
    if (process.env.DEPLOY_ENV === 'test') databasePath = path.join(__dirname, '..', 'src', '__tests__', 'test.db');
    if (!databasePath) throw new Error('Path for database was not given');

    this.db = sqliteDB(databasePath, { verbose: console.log });
    return this.db;
  }

  private disConnect(): void {
    this.db?.close();
  }

  public run(sql: string, data?: unknown): number {
    this.connect();
    const id = this.db?.prepare(sql).run(data).lastInsertRowid;
    this.disConnect();
    return id as number;
  }

  public getAll<T>(sql: string) {
    this.connect();
    const data: T[] = this.db?.prepare(sql).all() || [];
    this.disConnect();
    return data;
  }

  public get<T>(sql: string, param?: number | string) {
    this.connect();
    const data: T = this.db?.prepare(sql).get(param);
    this.disConnect();
    return data;
  }
};
