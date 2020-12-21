const { ipcRenderer } = window.require('electron');

export function send<T>(sql: string): Promise<T> {
  console.log(`Sending: ${sql}`);
  return new Promise(resolve => {
    ipcRenderer.once('asynchronous-reply', (_: unknown, arg: Promise<T>) => {
      console.log(`Received: ${arg}`);
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', sql);
  })
}