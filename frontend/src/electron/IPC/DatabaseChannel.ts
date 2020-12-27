import { IpcChannel } from './IpcChannel';
import { IpcMainEvent } from 'electron';
import sqliteDB from 'better-sqlite3';
import { DBRequestType, IpcRequest, NewModel } from '../../shared/types';

export class DatabaseChannel implements IpcChannel {
  getName(): string { return 'database'; }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;

    const db = new sqliteDB('C:/Users/Toni/Repos/Helsinki University/FinanceTracker/db.db', { verbose: console.log });

    if (request.params) {
      const requestType: DBRequestType = request.params[0] as DBRequestType;
      const sql = request.params[1] as string;
      const statement = db.prepare(sql);
      let result: unknown;

      console.log('requestType: ', requestType);
      console.log('sql: ', sql);

      try {
        switch (requestType) {
          case DBRequestType.GET_MANY:
            result = statement.all();
            break;
          case DBRequestType.GET_SINGLE: {
            const id = Number(request.params[2]);
            result = statement.get(id);
            break;
          }
          case DBRequestType.POST: {
            const object: NewModel = request.params[2] as NewModel;
            const { lastInsertRowid } = statement.run(object);
            result = { id: lastInsertRowid, ...object };
          }
        }
        console.log('result: ', result);
        event.sender.send(request.responseChannel, { result: result });
      } catch (error) {
        console.error('Error while handling database event: ', error.message);
      }
    }

    db.close();
  }
}