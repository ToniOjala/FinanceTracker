import sqliteDB from 'better-sqlite3';
import path from 'path';

export default class SqliteDataAccess {
  private databasePath: string;
  private db: sqliteDB.Database | null = null;

  constructor() {
    const DATABASE_PATH = (process.env.DEPLOY_ENV === 'test')
      ? path.join(__dirname, '..', 'src', '__tests__', 'test.db')
      : process.env.DATABASE_PATH;
      
    if (!DATABASE_PATH) throw new Error('Path for database was not defined');
    else this.databasePath = DATABASE_PATH;
  }

  private connect(): sqliteDB.Database {
    this.db = sqliteDB(this.databasePath, { verbose: console.log });
    return this.db;
  }

  private disconnect(): void {
    this.db?.close();
  }

  public run(sql: string, data?: unknown): number {
    this.connect();
    const id = this.db?.prepare(sql).run(data).lastInsertRowid;
    this.disconnect();
    return id as number;
  }

  public getAll<T>(sql: string) {
    this.connect();
    const data: T[] = this.db?.prepare(sql).all() || [];
    this.disconnect();
    return data;
  }

  public get<T>(sql: string, params?: unknown) {
    this.connect();
    const stmt = this.db?.prepare(sql);
    const data: T = (!params) ? stmt?.get() : stmt?.get(params);
    this.disconnect();
    return data;
  }
};
