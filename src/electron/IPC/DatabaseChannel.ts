import { IpcChannel } from './IpcChannel';
import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/types';
import { handleDatabaseRequest } from './dbRequestHandlers';

export class DatabaseChannel implements IpcChannel {
  getName(): string { return 'database'; }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;

    if (request.params) {
      const table = request.params.table;
      const requestType = request.params.requestType;
      const data = request.params.data;
      const query = request.params.query;

      console.log('\nNew message to the database channel');
      console.log('table: ', table);
      console.log('requestType: ', requestType);
      console.log('data: ', data);
      console.log('query: ', query);

      const result = handleDatabaseRequest(table, requestType, data, query);
      event.sender.send(request.responseChannel, { result });
    }
  }
}