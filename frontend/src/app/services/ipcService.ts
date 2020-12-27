import { IpcRenderer } from 'electron';
import { IpcRequest } from '../../shared/types';

export function send<T>(channel: string, params?: unknown[]): Promise<T> {
  const ipcRenderer = initializeIpcRenderer();

  const request: IpcRequest = {
    responseChannel: `${channel}_response_${new Date().getTime()}`,
    params: params
  }

  ipcRenderer.send(channel, request);

  return new Promise(resolve => {
    ipcRenderer.once(request.responseChannel || '', (event, response) => resolve(response.result));
  });
}

function initializeIpcRenderer(): IpcRenderer {
  if (!window || !window.process || !window.require) {
    throw new Error('Unable to require renderer process');
  }

  return window.require('electron').ipcRenderer;
}