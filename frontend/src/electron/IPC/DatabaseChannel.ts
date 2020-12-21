import { IpcChannel } from './IpcChannel';
import { IpcMainEvent } from 'electron';
import sqliteDB, { Database } from 'better-sqlite3';
import { IpcRequest } from '../../shared/IpcRequest';

export class DatabaseChannel implements IpcChannel {
  private db: Database;
  
  constructor() {
    this.db = new sqliteDB('../../../../db.db', { verbose: console.log });
  }

  getName(): string { return 'database'; }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    
    let sql = '';
    if (request.params) {
      sql = request.params[0];
      const statement = this.db.prepare(sql);
      const result = statement.run();
      event.sender.send(request.responseChannel, { result: result });
    }
  }
}