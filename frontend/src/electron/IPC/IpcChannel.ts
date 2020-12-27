import { IpcMainEvent } from 'electron';
import { IpcRequest } from '../../shared/types';

export interface IpcChannel {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}