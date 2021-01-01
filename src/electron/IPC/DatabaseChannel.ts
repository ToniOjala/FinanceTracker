import { IpcChannel } from './IpcChannel';
import { IpcMainEvent } from 'electron';
import sqliteDB from 'better-sqlite3';
import { DBTable, IpcRequest } from '../../shared/types';
import { handleBudgetRequest, handleCategoryRequest, handleTransactionRequest } from './handlers';

export class DatabaseChannel implements IpcChannel {
  getName(): string { return 'database'; }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;

    const db = new sqliteDB('C:/Users/Toni/Repos/db.db', { verbose: console.log });

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