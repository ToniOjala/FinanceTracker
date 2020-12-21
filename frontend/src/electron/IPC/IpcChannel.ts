import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/IpcRequest';

export interface IpcChannel {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}