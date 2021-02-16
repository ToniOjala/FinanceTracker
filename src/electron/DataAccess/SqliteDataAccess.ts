import sqliteDB from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

export default class SqliteDataAccess {
  private databasePath: string;
  private db: sqliteDB.Database | null = null;

  constructor() {
    this.databasePath = path.resolve('./src/__tests__/test.db');
    if (process.env.NODE_ENV === 'production') this.databasePath = path.join(app.getAppPath(), '..', '..', 'database', 'db.db');
    else if (process.env.DEPLOY_ENV === 'development') this.databasePath = process.env.DATABASE_PATH || '';

    if (!this.databasePath) throw new Error('Path for database was not defined');
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

  public getMany<T>(sql: string, params?: unknown) {
    this.connect();
    const stmt = this.db?.prepare(sql);
    const data: T[] = ((!params) ? stmt?.all() : stmt?.all(params)) || [];
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
