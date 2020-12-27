import { IpcRenderer } from 'electron';
import { IpcRequest } from '../../shared/types';

export function send<T>(channel: string, request: IpcRequest): Promise<T> {
  const ipcRenderer = initializeIpcRenderer();

  request.responseChannel = `${channel}_response_${new Date().getTime()}`,

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