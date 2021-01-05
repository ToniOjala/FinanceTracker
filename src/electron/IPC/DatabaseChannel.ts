import { IpcChannel } from './IpcChannel';
import { IpcMainEvent } from 'electron';
import sqliteDB from 'better-sqlite3';
import { DBTable, IpcRequest } from '../../shared/types';
import { handleBudgetRequest, handleCategoryRequest, handleTransactionRequest } from './handlers';
import path from 'path';

export class DatabaseChannel implements IpcChannel {
  getName(): string { return 'database'; }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;

    let databasePath = process.env.DATABASE_PATH;
    if (process.env.DEPLOY_ENV === 'test') databasePath = path.join(__dirname, '..', 'src', '__tests__', 'test.db');
    if (!databasePath) throw new Error('Path for database was not given');

    console.log('databasePath: ', databasePath);

    const db = new sqliteDB(databasePath, { verbose: console.log });

    if (request.params) {
      const table = request.params.table;
      const requestType = request.params.requestType;
      const data = request.params.data;
      const query = request.params.query;
      let result: unknown;

      console.log('\nNew message to the database channel');
      console.log('table: ', table);
      console.log('requestType: ', requestType);
      console.log('data: ', data);
      console.log('query: ', query);

      try {
        if (table === DBTable.CATEGORIES) result = handleCategoryRequest(db, requestType, data, query);
        if (table === DBTable.TRANSACTIONS) result = handleTransactionRequest(db, requestType, data, query);
        if (table === DBTable.BUDGETS) result = handleBudgetRequest(db, requestType, data, query);
        event.sender.send(request.responseChannel, { result: result });
      } catch (error) {
        console.error('Error while handling database event ', error.message);
      }
    }

    db.close();
  }
}