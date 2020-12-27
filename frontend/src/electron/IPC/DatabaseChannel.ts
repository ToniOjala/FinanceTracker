import { IpcChannel } from './IpcChannel';
import { IpcMainEvent } from 'electron';
import sqliteDB from 'better-sqlite3';
import { IpcRequest } from '../../shared/IpcRequest';

export class DatabaseChannel implements IpcChannel {
  getName(): string { return 'database'; }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;

    const db = new sqliteDB('C:/Users/Toni/Repos/Helsinki University/FinanceTracker/db.db', { verbose: console.log });

    let sql = '';
    if (request.params) {
      try {
        sql = request.params[0];
        const statement = db.prepare(sql);
        const result = statement.all();
        event.sender.send(request.responseChannel, { result: result });
      } catch (error) {
        console.error('Error while handling database event: ', error.message);
      }
    }

    db.close();
  }
}